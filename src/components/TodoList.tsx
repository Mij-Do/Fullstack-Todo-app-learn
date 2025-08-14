import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../components/ui/Button";
import useAuthQuery from "../hooks";
import type ITodo from "../interfaces";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/TextArea";
import axiosInstance from "../config/axios.instance";
import toast from "react-hot-toast";
import { updateInputValidation } from "../validation";
import InputErrorMsg from "./ui/InputErrorMsg";

const TodoList = () => {
    const defaultTodos = {
        id: 0,
        documentId: "",
        title: "",
        description: ""
    }
    // states
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<ITodo>(defaultTodos);
    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });

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

    const onOpenDeleteModal = (todo: ITodo) => {
        setTodoToEdit(todo);
        setIsOpenDeleteModal(true);
    };
    const onCloseDeleteModal = () => {
        setTodoToEdit(defaultTodos);
        setIsOpenDeleteModal(false)
    };


    // update todos
    const onSubmitHandeller = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const errors = updateInputValidation({
            title: todoToEdit.title,
            description: todoToEdit.description,
        });
        const hasMsgError = Object.values(errors).some(value => value === '') 
                            && Object.values(errors).every(value => value === '');
        if (!hasMsgError) {
            setErrors(errors);
            return;
        }
        setIsUpdating(true);

        try {
            const {status} = await axiosInstance.put(`/todos/${todoToEdit.documentId}`, 
                {data: {title: todoToEdit.title, description: todoToEdit.description}},
                {
                    headers: {
                        Authorization: `Bearer ${userData.jwt}`
                    }
                }
            )
            if (status === 200) {
                onCloseEditModal();
                toast.success(
                    "Your todo is Updated!.",
                    {
                        position: "bottom-center",
                        duration: 1500,
                        style: {
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                        },
                    }
                )
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsUpdating(false);
        }
    }

    // remove todos
    const onRemove = async () => {
        try {
            const {status} = await axiosInstance.delete(`/todos/${todoToEdit.documentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userData.jwt}`
                    }
                }
            )
        if (status === 200 || 204) {
                onCloseDeleteModal();
                toast.success(
                    "Your todo is Removed!.",
                    {
                        position: "bottom-center",
                        duration: 1500,
                        style: {
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                        },
                    }
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeHandeller = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = evt.target;

        setTodoToEdit({
            ...todoToEdit,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    }

    const {isLoading, data} = useAuthQuery({
        queryKey: ["todos", todoToEdit.documentId],
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
                    <p className="w-full font-semibold">{todo.id}- {todo.title}</p>
                    <div className="flex items-center justify-end w-full space-x-3">
                        <Button size={"sm"} onClick={() => onOpenEditModal(todo)}>Edit</Button>
                        <Button variant={"danger"} size={"sm"} onClick={() => onOpenDeleteModal(todo)}>Remove</Button>
                    </div>
                </div>
            )) : <h3> No Todos yet! </h3>}

            {/* Update Modal */}
            <Modal isOpen={isOpen} onClose={onCloseEditModal} title="Edit Todos!">
                <form className="space-y-3" onSubmit={onSubmitHandeller}> 
                    <Input name="title" value={todoToEdit.title} onChange={onChangeHandeller}/>
                    {errors.title && <InputErrorMsg msg={errors.title}/>}
                    <Textarea name="description" value={todoToEdit.description} onChange={onChangeHandeller}/>
                    {errors.description && <InputErrorMsg msg={errors.description}/>}
                    <div className="flex items-center space-x-3">
                        <Button fullWidth isLoading={isUpdating}>Update</Button>
                        <Button fullWidth variant={"cancel"} onClick={onCloseEditModal}>Cancel</Button>
                    </div>
                </form>
            </Modal>
            {/* Delete Modal */}
            <Modal 
                isOpen={isOpenDeleteModal} 
                onClose={onCloseDeleteModal} 
                title="Delete Todos!"
                description="A simple modal that appears to confirm the removal of a todo item, showing the task details with two buttons: one to confirm deletion and one to cancel."
                >
                <div className="space-y-3"> 
                    <div className="flex items-center space-x-3">
                        <Button fullWidth variant={"danger"} isLoading={isUpdating} onClick={onRemove}>Yes, Remove</Button>
                        <Button fullWidth variant={"cancel"} onClick={onCloseDeleteModal}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TodoList;