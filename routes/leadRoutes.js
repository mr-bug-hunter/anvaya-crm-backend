const express = require("express")
const app = express.Router();
const Leads = require("../CRMSchema/leads")

app.post("/", async (req, res)=>{
    try{
        const newLead = new Leads(req.body)
        await newLead.save()
        res.status(201).json(newLead)
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

app.get("/", async (req, res)=>{
    try{
        let filter = {}
        if(req.query.status) filter.status = req.query.status;
        if(req.query.source) filter.source = req.query.source
        if(req.query.salesAgent) filter.salesAgent = req.query.salesAgent;
        if(req.query.tags) filter.tags = { $regex: req.query.tags, $options: "i" } // regex: this will search related to key word and the "i" is ignore lower & upper cases
        const leads = await Leads.find(filter).populate("salesAgent", "name email");
        res.status(200).json(leads)
    }catch(error){
        res.status(500).json({ error: error.message})
    }
})

app.get("/:id", async (req, res)=> {
    try{
        const lead = await Leads.findById(req.params.id).populate("salesAgent", "name email");
        if(!lead){
            return res.status(404).json({ error: "Lead not found"})
        }
        res.status(200).json(lead)
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

app.patch("/:id", async (req, res)=>{
    try{
        const updatedLead = await Leads.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({message: "Leads Updated", updatedLead})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

app.delete("/:id", async (req, res)=>{
    try{
        const deleteLead = await Leads.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Lead Deleted", deleteLead})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


module.exports = app