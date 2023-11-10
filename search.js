const express = require('express')
const data = require('./data')
const app = new express()

app.get('/',(req,res)=>{
    res.status(200).send("<h1>Home Page</h1><a href='/api/products'>Products</a>")
})

app.get('/api/products',(req,res)=>{

    const newProducts = data.products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image}
    })
    res.json(newProducts)
})

app.get('/api/products/:productID',(req,res)=>{
    // console.log(req)
    // console.log(req.params)
    const productID = req.params.productID;
    const singleProduct = data.products.find((product)=> product.id===Number(productID))

    if(!singleProduct)
    {
        return res.status(404).send("Product not found")
    }
    
    res.json(singleProduct)
})

app.get('/api/v1/query',(req,res)=>{
    // console.log(req.query)
    const {search,limit} = req.query;
    let sortedProducts = [...data.products]
    if(search){
        sortedProducts=sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts=sortedProducts.slice(0,Number(limit))
    }
    if(sortedProducts.length <1)
    {
        return res.status(200).send("No Product Found")
    }
    return res.status(200).send(sortedProducts)
})


app.use('*',(req,res)=>{
    res.status(404).send("Error 404:Not Found")
})

app.listen(5001,()=>{
    console.log("Server is running on 5001")
})