import { Router } from "express";
const router = Router();

router.get("/register", (req, res) => {
    res.send("Register");
})

router.get("/login", (req, res) => {
    res.send("Login");
})

router.get("/profile", (req, res) => {
    res.send("Profile");
})

module.exports = router;