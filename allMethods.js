const express = require('express')
const app = new express();
let {people}= require('./data.js')

//static assets
app.use(express.static('./methods-public'))

//parse form data
app.use(express.urlencoded({extended:false}))

//parse json data
app.use(express.json())

app.get('/api/people',(req,res)=>{
    res.status(200).json({success:true,data:people})
})

app.post('/login',(req,res)=>{
    let {name} = req.body;
    if(name){
       return  res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send("Please provide name")
 })
 
 app.post('/api/people', (req,res)=>{
    let {name} = req.body;
    if(!name){
        return res.status(400).json({success:false,msg:'Please provide name value'})
    }
    res.status(201).json({success:true,person:name})
 })

 app.post('/api/postman',(req,res)=>{
    let {personName} = req.body;
    if(personName){
        people=[...people,{id:(people[people.length -1].id)+1,name:personName}];
        return res.status(201).json({success:true,data:[...people,{id:(people[people.length -1].id)+1,name:personName}]})
    }
    res.status(400).json({success:false,msg:"No PersonName was given"})
 })

 app.put('/api/people/:id',(req,res)=>{
    const putID = req.params.id;
    const {putName} = req.body;
    people.map((i,index)=>{
        if(i.id===Number(putID)){
           people[index].name=putName;
           return res.status(202).json({success:true,data:people})
        }
    })
    res.status(404).json({success:false,msg:"ID does not exist"})
 })

 app.delete('/api/people/:id',(req,res)=>{
    const putID = req.params.id;
    let newPeople=[];
    if(!putID){
        return res.status(404).json({success:false,msg:"Please Enter ID"})
    } 
    people.map((i,index)=>{
        if(i.id===Number(putID));
        else{
            newPeople=[...newPeople,{id:i.id,name:i.name}]
        }
    })
    if(people==newPeople)
        res.status(404).json({success:false,msg:"ID does not exist"})
    people=newPeople;
    res.status(203).json({success:true,data:people})
   
 })

 
app.listen(5001,()=>{
    console.log('Server started on 5001')
})