import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import dotenv from "dotenv"; //.env
import cors from "cors"

const PORT = process.env.PORT || 5000

import authRoutes from "./routes/routes.js"

dotenv.config();

const app = express()

app.use(cors({
  origin: ["http://localhost:5173",
    "https://elfrontend.com"
  ],
  credentials: true
}));

app.use(express.json())

app.use(cookieParser())

//midleware para verificar el token en cada peticion
app.use((req, res, next) => {
  const token = req.cookies.access_token;

  req.user = null;

  if (!token) return next();

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Usuario autenticado:", req.user);
  } catch (error) {
    console.log("JWT inválido:", error.message);
  }

  next();
});


//rutas
app.use("/auth", authRoutes)


app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + `${PORT}`);
});
