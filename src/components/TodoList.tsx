import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { useState } from "react";


const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  // states
  const [isOpen, setIsOpen] = useState(false);

  const onToggleEditModal = () => {
    setIsOpen(prev => !prev);
  }

  const {isLoading, data} = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`
      }
    }
  })
  
  if (isLoading) return <h3> Is Loading ... </h3>

  // Render
  const renderToDos = data.todos.map(todo => 
    <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
      <p className="w-full font-semibold"> {todo.title} </p>
      <div className="flex items-center justify-end w-full space-x-3">
        <Button size={'sm'} onClick={onToggleEditModal}>Edit</Button>
        <Button variant={'danger'} size={'sm'}>Remove</Button>
      </div>
    </div>
  )



  return (
    <div className="space-y-1 ">
      {data.todos.length ? renderToDos : <h3>No ToDos yet!!</h3>}
      <Modal isOpen={isOpen} closeModal={onToggleEditModal} title="Edit ToDo">
        <Input />
        <div className="flex items-center justify-around space-x-3 mt-5">
          <Button>Update</Button>
          <Button variant={'cancel'} onClick={onToggleEditModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
