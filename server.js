const express = require('express');
const mongoose  = require('mongoose');
const path = require('path'); 

//CONFIGURATION FILES
const app = require('./app');
const devEnv = require('./config/dev.json');

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, 'config.env') });


//DB CONNECTION
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
  	dbName: `viexports`,  //either we can specify db name here or we can put it in connection string here wil be checked first
                          //#mongodb+srv://tejpratap:tejtech@cluster0.qmxv4cn.mongodb.net/===>tejtech_prod<===?retryWrites=true&w=majority
                        //if we didn't specify any it will create a db with name of test
  })
  .then(() => {
    console.log("database connected successfully");
  }).catch(err =>{
    console.log("ERR CONNECTING DATABASE",err);
  });


const port = devEnv.PORT || 8200;
const host = `http://127.0.0.1:`
app.listen(port,()=>{
  console.log(`server is running on ${host}${port}`)
});
