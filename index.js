const express = require("express")
const app = express()

const {initialize} = require("./databaseConnect/db.connect")
initialize()

app.use(express.json())

const cors = require("cors")
const corsOptions={
    origin: "*",
    Credential: true,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

const leadRoutes = require("./routes/leadRoutes")
app.use("/leads", leadRoutes)

const agentRoutes = require("./routes/agentRoutes")
app.use("/agents", agentRoutes)

const commentRoutes = require("./routes/commentRoutes")
app.use("/leads", commentRoutes)

const tagRoutes = require("./routes/tagRoutes")
app.use("/tags", tagRoutes)

const reportRoutes = require("./routes/reportRoutes")
app.use("/report", reportRoutes)

app.get("/", (req, res) => {
  res.send("Anvaya CRM API is running!");
});

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})