const express = require("express")
const app = express.Router()
const Lead = require("../CRMSchema/leads")

app.get("/pipeline", async (req, res)=>{
    try{
        const leads = await Lead.find()
        
        const pipelineData = leads.reduce((acc, lead)=>{
            acc[lead.status] = (acc[lead.status] || 0) +1
            return acc
        }, {})
        res.status(200).json(pipelineData)
    } catch(error){
        res.status(500).json({error: error.message})
    }
})

app.get("/closed-by-agent", async (req, res)=>{
    try{
        const closedLeads = await Lead.find({ status: "Closed"}).populate("salesAgent", "name")

        const agentData = closedLeads.reduce((acc, lead)=>{
            if(lead.salesAgent){
                const agentName = lead.salesAgent.name;
                acc[agentName] = (acc[agentName] || 0) + 1
            }
            return acc
        }, {})
        res.status(200).json(agentData)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

app.get("/last-week", async (req, res)=>{
    try{
        const lastWeek = new Date()
        lastWeek.setDate(lastWeek.getDate() - 7)

        const recentClosed = await Lead.find({
            status: "Closed",
            updatedAt: {$gte: lastWeek}
        }).populate("salesAgent", "name")
        res.status(200).json(recentClosed)
    }catch(error){
        res.status(500).json({ error: error.message})
    }
})

module.exports = app