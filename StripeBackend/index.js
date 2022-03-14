const cors=require("cors");
const express=require("express");
const stripe=require("stripe")("sk_test_51KX5NrSBKxRqF9mpZlnYJYVqWLwB6VMr1AkfYr5XTzmPObATBNjl7c67vSEeQWigFQtQEt7yy1mWdaL2gqRPoxSp00L9jSN6R1")
 //const uuid=require("uuid")

const app=express() ;
//middleware
app.use(express.json())
app.use(cors());



//routes

app.get("/",(req,res)=>{
    res.send("it works")
})

app.post("/payment",(req,res)=>{
const {product,token}=req.body;
console.log("product",product);
console.log("price",product.price);
//const idempontencyKey=uuid()
return stripe.customers.create({
    email:token.email,
    source:token.id 
}).then((customer)=>{
stripe.charges.create({
    amount:product.price*100,
    currency:'usd',
    customer:customer.id,
    receipt_email:token.email,
    description:product.name
})
})
.then((result)=>{
    res.status(200).json(result)
})
.catch((error)=>{
    console.log(error);
})
})






////listen

app.listen(8282,()=>{
    console.log("started at 8282");
})