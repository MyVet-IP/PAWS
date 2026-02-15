// servidor create 
const express = require("express");
const cors = require("cors"); 

const authRoutes = require("./routes/authRoutes"); // 

const app = express();

// middlewares
app.use(cors()); 
app.use(express.json());

// rutas
app.use("/api", authRoutes);

// test route 
app.get("/", (req, res) => {
    res.send("API mela 🚀");   
});

// dynamic port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor 1A en http://localhost:${PORT}`);
});
