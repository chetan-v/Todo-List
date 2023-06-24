const express= require("express");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname+"/date.js"); //import local created function
const alert = require('alert'); 

const app = express();

let workItems =[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemListSchema = new mongoose.Schema({
  name:String
});
const Item = mongoose.model("Item",itemListSchema);


const item1  = new Item({
  name:"Welcome to your Todolist!"
})

const item2  = new Item({
  name:"Hit the + button to add a new item."
})

const item3  = new Item({
  name:"<-- Hit this to delete an item."
})



app.get("/",function(req,res){
 const day = date();
 
 Item.find().then(item=>{
    if(item.length===0)
    {
Item.insertMany([item1,item2,item3]).then(f=>{
   console.log(f);}).catch(f=>{
  console.log(err)});
res.render("list",{kindOfDay:day,Item:item});    
}
    else
    res.render("list",{kindOfDay:day,Item:item});
  })


 
});
app.post("/",function(req,res){// it take the value from html form that has action "/"
  const itemName  = req.body.newItem;
  if(itemName===""){
   alert("Item is empty");
  }
  else{
    const item= new Item({
      name:itemName
    });
    item.save();
  }
  res.redirect("/");

});
app.post("/delete",function(req,res){
const checkedItemId = req.body.checkbox;
Item.findByIdAndDelete(checkedItemId).then(result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  res.redirect("/");
})


// app.get("/work",function(req,res){
//   res.render("list",{Item:workItems,kindOfDay:"work List"});
// })

app.listen(3000,function(){
    console.log("its start");
});