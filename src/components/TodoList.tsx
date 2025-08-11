import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import axiosInstance from "../config/axios.instance";

const TodoList = () => {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        try {
            axiosInstance.get("/users/me?populate=todos", {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`
                }
            }).then(res => setTodos(res.data.todos))
            .catch(err => console.log(err));
        } catch (error) {
            console.log(error)
        }
    }, [userData.jwt]);

    return (
        <div className="space-y-1">
            {todos.map(todo => (
                <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                    <p className="w-full font-semibold">{todo.id} - {todo.title}</p>
                    <div className="flex items-center justify-end w-full space-x-3">
                        <Button size={"sm"}>Edit</Button>
                        <Button variant={"danger"} size={"sm"}>Remove</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TodoList;