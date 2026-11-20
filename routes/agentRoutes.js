const express = require("express")
const app = express.Router()
const SalesAgent = require("../CRMSchema/salesAgent")

app.post("/", async (req, res)=>{
    try{
        const agent = new SalesAgent(req.body)
        await agent.save()
        res.status(201).json(agent)
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

app.get("/", async (req, res)=>{
    try{
        const agents = await SalesAgent.find()
        res.status(200).json(agents)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

app.delete("/:id", async (req, res)=>{
    try{
        const deletedAgent = await SalesAgent.findByIdAndDelete(req.params.id)
        if(!deletedAgent){
            return res.status(404).json({error: "Error in deleting"})
        }
        res.status(200).json({message: "Agent deleted Successfully!."})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = app