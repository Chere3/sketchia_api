import { Router } from "express";

const router = Router();

router.all("/", (req, res) => {
    res.redirect("/home")
});

router.all("/home", (req, res) => {
    res.redirect("https://sketchia.com.mx")
});

router.all("/*", (req, res) => {
    res.send({status: 404, message: "La página que tratas de buscar no existe."});
});

router


module.exports = router;