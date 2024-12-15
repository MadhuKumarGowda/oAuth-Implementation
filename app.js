const express = require("express");
const app = express();

const config = require("./config")
const path = require("path")
const dateFormat = require("date-format");
const oAuthRouter = require("./oauth");
const morgan = require("morgan");

//app.use(express.json());
morgan.token("time", ()=>{
    dateFormat.asString(dateFormat.ISO8601_FORMAT,new Date())
})

app.use(morgan('[:time]: remote-addr : method : url : status :res[content-length] :response-time ms'))

app.use(express.static('static'));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/static/index.html"))
})

app.use("/oauth", oAuthRouter);

app.listen(config.PORT,()=>{
    console.log(`Listening on port ${config.PORT}`)
})

app.use((req,res)=>{
    console.error(`Requested resources ${req.method} ${req.url} not found`);
    res.status(404).send("Resource not found !")
})