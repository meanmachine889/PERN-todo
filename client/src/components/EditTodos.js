import React,{Fragment, useState} from "react";

const EditTodos = ({todo}) =>{
    const [description, setDEscription] = useState(todo.description);

    const handleEdit = async e =>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.id}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body),
            })
            console.log(response);
            window.location = "/";
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <Fragment>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.id}`}>Edit</button>


            <div id={`id${todo.id}`} class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Modal Header</h4>
                        <button type="button" class="close" data-dismiss="modal" onClick={() => setDEscription(todo.description)}>&times;</button>
                    </div>
                    <div class="modal-body">
                        <input type="text" className="form-control" value={description} onChange={e => setDEscription(e.target.value)}/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => handleEdit(e)}>Edit</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default EditTodos;