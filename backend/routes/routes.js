import express from "express";
import Users from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { auth } from "../middleweare/auth.js";

const routes = express.Router()



routes.post("/register", async (req, res) => {
    console.log(req.body)

    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        // Verificar si ya existe el email
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Hashear contraseña
        const hash = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            nombre,
            email,
            password: hash,
            data: []
        });

        res.json({ message: "Usuario creado", user: newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor", error });
    }
})

routes.post("/login", async (req, res) => {
    console.log(req.body)

    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Faltan datos" })
        }

        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        const passwordOK = await bcrypt.compare(password, user.password)
        if (!passwordOK) {
            return res.status(400).json({ message: "La contraseña es incorrecta" })
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, nombre: user.nombre, data: user.data },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // dura 1 día
        );


        res.cookie("access_token", token, {
            httpOnly: true, // la cookie solo se puede acceder desde el servidor
            secure: true,// la cookie solo se puede acceder en https
            sameSite: "none", //"strict"la cookie solo se puede acceder en el mismo dominio
            maxAge: 1000 * 60 * 60 * 24//el tiempo de vida de la cookie (1h)
        })
        res.json({ success: true }) ///a cambiar
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor", error });
    }
})

routes.patch("/me", auth, async (req, res) => {
  try {
    const { data } = req.body;
    console.log("data backend",data)
    if (!Array.isArray(data)) {
      return res.status(400).json({
        message: "El campo data debe ser un array"
      });
    }

    const userUpdated = await Users.findByIdAndUpdate(
      req.user.id,
      { data }, // 🔹 se actualiza SOLO data
      {
        new: true,
        runValidators: true
      }
    );

    if (!userUpdated) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    res.json(userUpdated);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar"
    });
  }
});

//crear un get para obtener los datos del server
//- modificar la cookie
routes.get("/getDatos", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos" });
  }
});

routes.post("/logout", (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    })

    res.status(200).json({ message: "Logout exitoso" })
})



export default routes