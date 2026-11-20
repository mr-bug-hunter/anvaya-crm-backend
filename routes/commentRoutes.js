const express = require("express")
const app = express.Router()
const Comment = require("../CRMSchema/commentModel")

app.post("/:id/comments", async (req, res)=>{
    try{
        const comment = new Comment({...req.body, lead: req.params.id})
        await comment.save()
        res.status(201).json({message: "Add a comment", comment})
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

app.get("/:id/comments", async (req, res)=>{
    try{
        const comment = await Comment.find({lead: req.params.id}).populate("author", "name")
        res.status(200).json({message: "Comment fetch Successfully", comment})
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

module.exports = app