import { Router } from "express";
import { supabase, supabaseAdmin } from "../app";

const router = Router();

router.get("/", async (req, res) => {
    const {data, error} = await supabaseAdmin.auth.admin.listUsers();

    if (error) throw error;
    return res.send({message: "Usuarios obtenidos correctamente.", status: 200, data});
});


router.get("/:id", async (req, res) => {
    const {id} = req.params;

    if (!id) return res.status(400).send({message: "No has mandado el ID del usuario, su nombre de usuario o su email", status: 400});
    const {data, error} = await supabaseAdmin.auth.admin.getUserById(id);

    if (error) throw error;

    return res.send({message: "Usuario encontrado correctamente.", status: 200, data});
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    if (!id) return res.status(400).send({message: "No has mandado el ID del usuario, su nombre de usuario o su email", status: 400});
    const {data, error} = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) throw error;

    return res.send({message: "Usuario eliminado correctamente.", status: 200, data});
});


module.exports = router;