import { Router } from "express";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../app";
const router = Router();

router.post("/register", async (req, res) => {
   const {email, password} = req.body;

   if (!(email || password)) return res.status(400).json({message: "No se ha proporcionado un email o contraseña", status: 400});
   if (password.length < 6) return res.status(400).json({message: "La contraseña debe tener al menos 6 caracteres", status: 400});
   if (!email.includes("@")) return res.status(400).json({message: "El email no es válido", status: 400});

   try {
   const data = await createUserWithEmailAndPassword(auth, email, password);
   return data;
   } catch (e: any) {
    if (String(e?.message).includes("auth/email-already-in-use")) return res.status(400).json({message: "El email ya está en uso", status: 400});
    if (String(e?.message).includes("auth/invalid-email")) return res.status(400).json({message: "El email no es válido", status: 400});
   }

   return res.status(500).json({message: "Ha ocurrido un error inesperado", status: 500});
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if (!(email || password)) return res.status(400).json({message: "No se ha proporcionado un email o contraseña", status: 400});
    if (password.length < 6) return res.status(400).json({message: "La contraseña debe tener al menos 6 caracteres", status: 400});
    if (!email.includes("@")) return res.status(400).json({message: "El email no es válido", status: 400});

    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data;
    } catch (e: any) {
        if (String(e?.message).includes("auth/wrong-password")) return res.status(400).json({message: "La contraseña es incorrecta", status: 400});
        if (String(e?.message).includes("auth/user-not-found")) return res.status(400).json({message: "El usuario no existe", status: 400});
    }

    return res.status(500).json({message: "Ha ocurrido un error inesperado", status: 500});
});

module.exports = router;