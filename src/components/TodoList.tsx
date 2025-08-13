import { useState } from "react";
import Button from "../components/ui/Button";
import useAuthQuery from "../hooks";
import type ITodo from "../interfaces";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/TextArea";

const TodoList = () => {
    const defaultTodos = {
        id: 0,
        title: "",
        description: ""
    }
    // states
    const [isOpen, setIsOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<ITodo>(defaultTodos);

    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    // Handellers
    const onOpenEditModal = (todo: ITodo) => {
        setTodoToEdit(todo);
        setIsOpen(true)
    }
    const onCloseEditModal = () => {
        setTodoToEdit(defaultTodos);
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
                        <Button size={"sm"} onClick={() => onOpenEditModal(todo)}>Edit</Button>
                        <Button variant={"danger"} size={"sm"}>Remove</Button>
                    </div>
                </div>
            )) : <h3> No Todos yet! </h3>}
            <Modal isOpen={isOpen} onClose={onCloseEditModal} title="Edit Todos!">
                <div className="space-y-3"> 
                    <Input value={todoToEdit.title}/>
                    <Textarea value={todoToEdit.description}/>
                    <div className="flex items-center space-x-3">
                        <Button fullWidth>Update</Button>
                        <Button fullWidth variant={"cancel"} onClick={onCloseEditModal}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TodoList;