import { useState } from "react";
import Button from "../components/ui/Button";
import useAuthQuery from "../hooks";
import type ITodo from "../interfaces";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

const TodoList = () => {
    // states
    const [isOpen, setIsOpen] = useState(false);

    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    // Handellers
    const onCloseEditModal = () => {
        setIsOpen(false);
    }

    const {isLoading, data} = useAuthQuery({
        queryKey: ["todos"],
        url: "/users/me?populate=todos",
        config: {
            headers: {Authorization: `Bearer ${userData.jwt}`}
        }
    }); 
    if (isLoading) return <h3>Loading ...</h3>
    
    return (
        <div className="space-y-1">
            {data.todos.length ? data.todos.map((todo: ITodo) => (
                <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                    <p className="w-full font-semibold">1- {todo.title}</p>
                    <div className="flex items-center justify-end w-full space-x-3">
                        <Button size={"sm"} onClick={() => setIsOpen(true)}>Edit</Button>
                        <Button variant={"danger"} size={"sm"}>Remove</Button>
                    </div>
                </div>
            )) : <h3> No Todos yet! </h3>}
            <Modal isOpen={isOpen} onClose={onCloseEditModal} title="Edit Todos!">
                <Input value={"edit todo"}/>
                <div className="flex items-center mt-4 space-x-3">
                    <Button fullWidth>Update</Button>
                    <Button fullWidth variant={"cancel"} onClick={onCloseEditModal}>Cancel</Button>
                </div>
            </Modal>
        </div>
    )
}

export default TodoList;