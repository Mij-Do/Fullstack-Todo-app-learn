import { useState, type ChangeEvent } from "react";
import Paginator from "../components/ui/Paginator";
import useAuthQuery from "../hooks";

const TodosPage = () => {
    // states
    const [page, setPage] = useState<number>(1);
    const [pageSize, setpageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>('DESC');
    // handellers
    const onClickPrev = () => {
        setPage(prev => prev - 1);
    }
    const onClickNext = () => {
        setPage(prev => prev + 1);
    }

    const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
        setpageSize(+e.target.value);
    }
    const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    }

    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    
    const {isLoading, data, isFetching} = useAuthQuery({
        queryKey: [`todos-page-${page}`,`${pageSize}`, `${sortBy}`],
        url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
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
            <div className="flex justify-center items-center space-x-5 mb-10">
                <select className="p-4 border-2 border-indigo-800 rounded-md outline-0" value={pageSize} onChange={onChangePageSize}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="80">80</option>
                    <option value="100">100</option>
                </select>
                <select className="p-4 border-2 border-indigo-800 rounded-md outline-0" value={sortBy} onChange={onChangeSortBy}>
                    <option value="DESC">Oldest</option>
                    <option value="ASC">Newest</option>
                </select>
            </div>
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