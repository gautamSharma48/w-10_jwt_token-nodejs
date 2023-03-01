const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const router = require("./routes");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

//db 
const connectDb=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("connected with db")).catch(err=>console.log(err))
}

app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, () => {
    connectDb();
    console.log(`server connected with ${PORT}`) 
});
