const dns = require("dns")
dns.setServers(["8.8.8.8", "8.8.4.4"])

const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

const initialize = async ()=>{
    await mongoose
    .connect(mongoUri)
    .then(()=>{
        console.log("Database Connected to successfully.")
    }).catch((error)=>
        console.log({error: "Error in Connecting to Database", error}))
}

module.exports = {initialize}