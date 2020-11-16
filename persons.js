const express = require('express');
const parser=require('body-parser');
const mysql=require('mysql');
const app=express();

// parse application/json data
app.use(parser.json());
 
//create database connection
const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shubh5@kohad',
    database: 'world'
});
 
con.connect((err) =>{
    if(err) 
        throw err;
    console.log('Mysql Connected......');
});

//get all persons
app.get('/bajaj/persons',(request,response)=>{
    let sql='select * from persons';
    con.query(sql,(err,result)=>{
        if(err)
            throw err;
            else{
                console.log(result);
                response.send(result);
            }
    });
});

//get specified person by id
app.get('/bajaj/persons/:id',(request,response)=>{
    let sql='select * from persons where id='+request.params.id;
 
    let query=con.query(sql,(err,result)=>{
        if(err)
            throw err;
            else{
                console.log(result);
                response.send(result);
            }
    });
});

// ADD NEW person
app.post('/bajaj/persons',(request,response)=>{
    let data={id:request.body.id, name:request.body.name, address:request.body.address, mobile:request.body.mobile, 
            email:request.body.email, age:request.body.age, dateofbirth:request.body.dateofbirth};
    let sql='insert into persons SET ?';
    let query=con.query(sql,data,(err,result)=>{
        if(err)
            throw err;
        else if(result.affectedRows>0)
            {
           response.send('Person Details inserted successfully...');
           console.log('Person details inserted successfully...');
            }
    });
});

//edit account details
app.put('/bajaj/persons/:id',(request,response)=>{
let sql='update persons set name=\''+request.body.name+'\',address=\''+request.body.address+'\',mobile=\''+request.body.mobile+'\', email=\''+request.body.email+'\', age=\''+request.body.age+'\', dateofbirth=\''+request.body.dateofbirth+'\' where id='+request.params.id;
 
    let query=con.query(sql,(err,result)=>{
        if(err)
            throw err;
        else if(result.affectedRows>0)
            response.send('Record Updated Successfully....');
 
    });
 
});


//DELETE person record by id
app.delete('/bajaj/persons/:id',(request,response)=>{
    let sql="delete from persons where id="+request.params.id;
    letquery=con.query(sql,(err,result)=>{
        if(err)
            throw err;
        response.send('Record Got Deleted Successfully....');
    });
 
});

app.listen(3000,()=>{
    console.log('Server Started on port 3000......');
});
