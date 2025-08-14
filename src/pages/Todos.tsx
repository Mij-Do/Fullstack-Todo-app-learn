import { useState } from "react";
import Paginator from "../components/ui/Paginator";
import useAuthQuery from "../hooks";

const TodosPage = () => {
    // states
    const [page, setPage] = useState<number>(1);
    
    // handellers
    const onClickPrev = () => {
        setPage(prev => prev - 1);
    }
    const onClickNext = () => {
        setPage(prev => prev + 1);
    }

    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    
    const {isLoading, data, isFetching} = useAuthQuery({
        queryKey: [`todos-page-${page}`,],
        url: `/todos?pagination[pageSize]=10&pagination[page]=${page}`,
        config: {
            headers: {Authorization: `Bearer ${userData.jwt}`}
        }
    }); 

    if (isLoading) return <div className="space-y-2 w-full">
                            <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></div>
                            <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></div>
                            <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></div>
                            <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></div>
                            <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></div>
                            <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></div>
                        </div>
    return (
        <div>
            {data.data.length ? data.data.map(({id, title}: {id: number; title: string;}) => (
                        <div key={id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                            <h3 className="w-full font-semibold">{id}- {title}</h3>
                        </div>
                    )) : <h3> No Todos yet! </h3>}
            <Paginator page={page} pageCount={data.meta.pagination.pageCount} onClickPrev={onClickPrev} onClickNext={onClickNext} isLoading={isLoading || isFetching} total={data.meta.pagination.total}/>
        </div>
    )
}

export default TodosPage;