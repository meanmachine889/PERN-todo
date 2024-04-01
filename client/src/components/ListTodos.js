import React,{Fragment, useEffect, useState} from "react";
import EditTodos from './EditTodos.js';

function ListTodos(){

    const [todos, setTodos] = useState([]);

    //delete function
    async function deleteTodo(i){
        try {
            const deletetodo = await fetch(`http://localhost:5000/todos/${i}`,{
                method:"DELETE"
            });
            
            console.log(deletetodo.json());
            setTodos(todos.filter(todo => todo.id !== i));

        } 
        catch (error) {
            console.error("error.message");
        }
    }

    const getTodos = async() =>{
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } 
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        getTodos();
    }, []);

    return(
        <Fragment>
            <table border="1" className="table mt-5 text-center" style={{ backgroundColor: '#222', color: 'white', borderRadius: '10px' }}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => ( 
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td><EditTodos todo={todo}/></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;