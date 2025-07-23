import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";


const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

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
        <Button size={'sm'}>Edit</Button>
        <Button variant={'danger'} size={'sm'}>Remove</Button>
      </div>
    </div>
  )


  return (
    <div className="space-y-1 ">
      {data.todos.length ? renderToDos : <h3>No ToDos yet!!</h3>}
    </div>
  );
};

export default TodoList;
