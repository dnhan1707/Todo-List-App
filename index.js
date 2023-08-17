import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

const all_tasks = [];
const additiona_tasks= [];


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("body.ejs", { list_of_task: all_tasks });
});

app.post("/add", (req, res) => {
    const taskText = req.body.new_task;
    all_tasks.push({ task: taskText, completed: false });
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const id = req.body.id;  // this is value="<%= i %>
    all_tasks[id].completed = true;
    res.redirect("/");
});


// Additional Todo List
app.get("/additional", (req, res) => {
    res.render("additional.ejs", { list_of_task: additiona_tasks});
});

app.post("/add_additional", (req, res) => {
    const taskText = req.body.new_addition_task;
    additiona_tasks.push({ task: taskText, completed: false });
    res.redirect("/additional");
});

app.post("/delete_additional", (req, res) => {
    const id = req.body.id;
    additiona_tasks[id].completed = true;
    res.redirect("/additional");
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
