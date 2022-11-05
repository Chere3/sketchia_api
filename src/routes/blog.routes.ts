import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Blog");
});

router.post("/create", (req, res) => {
    res.send("Create");
});

router.patch("/edit", (req, res) => {
    res.send("Edit");
})

router.delete("/delete", (req, res) => {
    res.send("Delete");
});

router.get("/:id", (req, res) => {
    res.send("Get");
})

module.exports = router;