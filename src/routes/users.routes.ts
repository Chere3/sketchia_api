import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.get("/:id", (req, res) => {
    res.send("Hello World!");
});

router.post("/add", (req, res) => {
    res.send("Hello World!");
});

router.patch("/edit", (req, res) => {
    res.send("Hello World!");
});

router.delete("/delete", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;