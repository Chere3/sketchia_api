import { Provider } from "@supabase/supabase-js";
import { Router } from "express";
import { supabase } from "../app";
const router = Router();

router.post("/register", async (req, res) => {
    const {email, password} = req.body;

    if (!(email || password)) return res.status(400).send({message: "No has mandado la información suficiente para continuar. Es necesario mandar la contraseña y el email del usuario a registrar.", status: 400});
    if ((password as string).length < 6) return res.status(400).send({message: "La contraseña que has mandado es inccorecta.", status: 400});
    if (!((email as string).includes("@") && (email as string).includes("."))) return res.status(400).send({message: "El correo que has mandado es incorrecto. Este debe de incluir un arroba al igual que un dominio final.", status: 400})

    const {data , error} = await supabase.auth.signUp({
        email: req.body.email,
        password: req.body.password
    });

    if (error) throw error;
    return res.send({message: "Usuario registrado correctamente.", status: 200, data});
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if (!(email || password)) return res.status(400).send({message: "No has mandando los datos necesarios para iniciar sesión. Es necesario el uso de una contraseña y correo.", status: 400});
    if ((password as string).length < 6) return res.status(400).send({message: "La contraseña o email que se han mandado son incorrectos."});
    if (!((email as string).includes("@") && (email as string).includes("."))) return res.status(400).send({message: "El email o contraseña mandados son incorrectos."});

    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error?.message.includes("Invalid login credentials")) return res.status(401).send({message: "La contraseña o email son incorrectos.", status: 401});
    if (error) throw error;

    return res.send({message: "Logueado satisfactoriamente.", status: 200, data});
});

module.exports = router;