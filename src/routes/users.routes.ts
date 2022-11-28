import { Router } from "express";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../app";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "aditionalUserData"));
        let users = querySnapshot.docs.map((doc) => {return {id: doc.id, data: doc.data()}});
    
        return res.json({message: "Todos los usuarios han sido listados.", status: 200, users});
    } catch (error) {
        return res.json({message: "Error al listar los usuarios.", status: 500, error});
    }
});


router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const user = doc(db, "aditionalUserData", id);
        const docRef = await getDoc(user);

        if (!docRef.exists()) return res.status(404).json({message: "El usuario no existe.", status: 404});

        const data = docRef.data();
        return res.json({message: "El usuario ha sido listado.", status: 200, user: data});
    } catch (error) {
        return res.status(500).json({message: "Error al listar el usuario.", status: 500, error});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const user = doc(db, "aditionalUserData", id);
        const docRef = await deleteDoc(user);

        return res.json({message: "El usuario ha sido eliminado.", status: 200});
    } catch (error) {
        return res.status(500).json({message: "Error al eliminar el usuario.", status: 500, error});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {courses} = req.body;

        const user = doc(db, "aditionalUserData", id);
        const docRef = await updateDoc(user, {courses});

        return res.json({message: "El usuario ha sido actualizado.", status: 200});
    } catch (error) {
        return res.status(500).json({message: "Error al actualizar el usuario.", status: 500, error});
    }
});

router.post("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {courses} = req.body;
        
        const user = doc(db, "aditionalUserData", id);
        const docRef = await setDoc(user, {courses});

        return res.json({message: "El usuario ha sido creado.", status: 200});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error al crear el usuario.", status: 500, error});
    }
});


module.exports = router;