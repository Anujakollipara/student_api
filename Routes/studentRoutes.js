const express = require('express');
const fs = require('fs');
const path = require('path');

const logRequest = require('../Modules/logger');

const router = express.Router();
const datapath = path.join(__dirname, '../Data/students.json');

function readStudents(){
    return JSON.parse(fs.readFileSync(datapath, 'utf8'));
}

function writeStudents(students){
    fs.writeFileSync(datapath, JSON.stringify(students,null,2))
}

router.use((req,res,next)=>{
    logRequest(req.method,req.url);
    next();
});

router.get('/',(req,res)=>{

    const students=readStudents();
    res.json(students);
});

router.get('/:id',(req,res)=>{
    const students=readStudents();
    const student=students.find(s=>s.id===parseInt(req.params.id));
    if(student) res.json(student);
    else res.status(404).send({message:"Student not found"});
});

router.post('/',(req,res)=>{
    const students=readStudents();
    const newStudent={
        id:students.length?students[students.length-1].id+1:1,
        name:req.body.name,
        course:req.body.course,
        year:req.body.year
    };
    students.push(newStudent);
    writeStudents(students);
    res.status(201).json(newStudent);
});

router.put('/:id', (req, res) => {
    const students = readStudents();
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));

    if (studentIndex !== -1) {
        students[studentIndex] = { ...students[studentIndex], ...req.body }; 
        writeStudents(students);
        res.json(students[studentIndex]);
    } else {
        res.status(404).send({ message: "Student not found" });
    }
});

router.delete('/:id',(req,res)=>{
    let students=readStudents();
    const id=parseInt(req.params.id);
    const exist=students.find(s=>s.id===id);
    if(!exist){
        return res.status(404).send({message:"Student not found"});
    }
    students=students.filter(s=>s.id!==id);
    writeStudents(students);
    res.json({message:`student with id=${id} deleted successfully`});
});

module.exports=router;