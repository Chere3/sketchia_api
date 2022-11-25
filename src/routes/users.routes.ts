import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {

});


router.get("/:id", async (req, res) => {
    const {id} = req.params;

});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    
});

router.post("/:id", async (req, res) => {
    
});


module.exports = router;