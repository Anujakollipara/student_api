//npm init -y,npm install,node .\server.js
const express=require('express');
const studentRoutes=require('./Routes/studentRoutes');
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.static('public'));
app.use(express.json());
app.use('/students',studentRoutes);
app.get('/',(req,res)=>{
    res.send('Welcome to the Student management System');
});
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

