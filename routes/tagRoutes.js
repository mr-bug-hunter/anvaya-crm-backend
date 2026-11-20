const express = require("express")
const app = express.Router()
const Tag = require("../CRMSchema/tagModel")

app.post("/", async (req, res)=>{
    try{
    const tag = new Tag(req.body)
    await tag.save()
    res.status(201).json(tag)
    } catch(error){
        res.status(400).json(error.message)
    }    
})

app.get("/", async (req, res)=>{
    try{
        const tag = await Tag.find()
        res.status(200).json({message: "Tag found successfully", tag})
    }catch(error){
        res.status(500).json(error.message)
    }
})

module.exports = app