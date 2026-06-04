const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let students = [
    {
        id: 1,
        name: "Raju",
        course: "Full Stack",
        email: "raju@gmail.com"
    },
    {
        id: 2,
        name: "Lakshmi",
        course: "Data Science",
        email: "lakshmi@gmail.com"
    }
];

/* HOME */

app.get("/", (req, res) => {

    res.json({
        message: "Student Management API Running"
    });

});

/* GET ALL STUDENTS */

app.get("/students", (req, res) => {

    res.json(students);

});

/* GET STUDENT BY ID */

app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({
            message: "Student Not Found"
        });

    }

    res.json(student);

});

/* CREATE STUDENT */

app.post("/students", (req, res) => {

    const { name, course, email } = req.body;

    if (!name || !course || !email) {

        return res.status(400).json({
            message: "All Fields Are Required"
        });

    }

    const student = {

        id: students.length + 1,
        name,
        course,
        email

    };

    students.push(student);

    res.status(201).json({

        message: "Student Added",
        student

    });

});

/* UPDATE STUDENT */

app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { name, course, email } = req.body;

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({
            message: "Student Not Found"
        });

    }

    if (name) student.name = name;

    if (course) student.course = course;

    if (email) student.email = email;

    res.json({

        message: "Student Updated",
        student

    });

});

/* DELETE STUDENT */

app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(
        student => student.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Student Not Found"
        });

    }

    const deletedStudent = students[index];

    students.splice(index, 1);

    res.json({

        message: "Student Deleted",
        deletedStudent

    });

});

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});