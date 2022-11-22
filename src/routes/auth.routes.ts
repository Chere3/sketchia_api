import { Router } from "express";
import { supabase } from "../app";
const router = Router();

router.post("/register", async (req, res) => {
    const {data , error} = await supabase.auth.signUp({
        email: req.body.email,
        password: req.body.password
    });
    
    return res.send(data)
})

router.get("/login", (req, res) => {
    res.send("Login");
})

router.get("/profile", (req, res) => {
    res.send("Profile");
})

module.exports = router;