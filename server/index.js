import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const db = new pg.Client({
    user: "postgres",
    password: "sql@1234",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

db.connect();

//create todo
app.post("/todos", async(req, res)=>{
    try {
        const {description} = req.body;
        const newtodo = await db.query("insert into todo (description) values($1)",[description]);console.log(req.body);   
        res.json(newtodo.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
})

//get all todos
app.get("/todos", async(req, res)=>{
    try {
        const alltodos = await db.query("select * from todo");
        res.json(alltodos.rows);
    } 
    catch (err) {
        console.log(err.message)
    }
})

//get a todo
app.get("/todos/:id", async(req, res)=>{
    
    try {
        const {id} = req.params;
        const todo = await db.query("select * from todo where id = ($1)", [id]);
        
        res.json(todo.rows);
    } 
    catch (err) {
        console.log(err.message);
    }
})

//update a todo
app.put("/todos/:id", async(req, res)=>{
    try {
       
        const {id} = req.params;
        const desc = req.body.description;
        console.log(id + " " + desc);
        const settodo = await db.query("update todo set description = ($1) where id = ($2)",[desc,id]);
        console.log(settodo.rows);
        res.json(settodo.rows);
    } catch (error) {
        console.log(error.message);
    }
    
})

//delete a todo
app.delete("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const deletetodo = await db.query("delete from todo where id = ($1)",[id]);
        console.log(deletetodo.rows);
        res.json(deletetodo.rows);
    } catch (error) {
        console.log(error.message);
    }
    
})

app.listen(5000, ()=>{
    console.log("server has started on 5000");
});