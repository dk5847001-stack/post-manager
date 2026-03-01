const express = require("express");
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const figlet = require("figlet");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let post = [
    {
        id: uuidv4(),
        username: "Dilkhush",
        content: "write something..."
    }
]

app.get("/", (req, res) => {
res.render("index.ejs")
});
app.get("/post", (req, res)=>{
    res.render("post.ejs")
});
app.post("/post/new", (req, res)=>{
    let id = uuidv4();
    let {username, content} = req.body;
    post.push({id, username, content})
    res.render("new.ejs", {post});
});
app.get("/post/new/:id", (req, res)=>{
    let {id} = req.params;
    let posts = post.find((p)=> id === p.id);
    res.render("show.ejs", {posts});
})
// app.get("/post/new/:id/edit", (req, res)=>{
//     let {id} = req.params;
//     let posts = post.
// })

app.listen(port,()=>{ 
    console.log(`The app is listening on port ${port}`);
    console.log( uuidv4());
});