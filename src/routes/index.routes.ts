import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/home")
});

router.get("/home", (req, res) => {
    res.redirect("https://sketchia.com.mx")
});

router.get("/*", (req, res) => {
    res.send({status: 404, message: "La página que tratas de buscar no existe."});
});

router


module.exports = router;