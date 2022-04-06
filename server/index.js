const express = require('express')
const mysql=require('mysql2')
const cors=require('cors')

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'imad@24',
    database:'mydb'
});

db.connect((err)=>{
    if(err) console.log(err);
    console.log('database connected')
})


const app = express()
app.use(cors())
app.use(express.json())
app.listen(3001,()=>{
    console.log('you server is running ...')
})


/*---------------------post req-------------------------*/
app.post('/add',(req,res)=>{
    const name =req.body.name
    const age =req.body.age
    const job= req.body.job
    const salary =req.body.salary

    db.query('INSERT INTO users (name,age,job,salary) VALUES(?,?,?,?)',
    [name,age,job,salary],(err,result)=>{
        if(err) {console.log(err)}
        else{res.send('user added')}
    }
    
    )
})
/*------------------get-------------------*/
app.get('/users',(req,res)=>{
    db.query('SELECT * FROM users',(err,result)=>{
        if(err){
            console.log(err)
        }else{res.send(result)}
    })
})

app.delete('/delete/:id',(req,res)=>{
    const id =req.params.id

    console.log('the id is :'+ id)
    db.query('DELETE FROM users WHERE id =?',id,(err)=>{
        if(err) console.log(err)
        else {
            res.send('user deleted')
        }
    })
})