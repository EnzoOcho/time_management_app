import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* =======================
   CORS CONFIG
======================= */
// PRE-FLIGHT (OBLIGATORIO)
app.options("*", cors());

const allowedOrigins = [
  'https://time-management-app-zeta.vercel.app',
  'http://localhost:3000', // para desarrollo local
  'http://localhost:5173'  // si usas Vite
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



/* =======================
   MIDDLEWARES
======================= */

app.use(express.json());
app.use(cookieParser());

// middleware JWT
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.user = null;

  if (!token) return next();

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("JWT inválido:", error.message);
  }

  next();
});

/* =======================
   ROUTES
======================= */

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

/* =======================
   DB + SERVER
======================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
