import { Router } from "express";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, node_cache } from "../app";

const router = Router();

router.get("/", async (req, res) => {
    try {
        if (!node_cache.get("courses")) {
            const querySnapshot = await getDocs(collection(db, "courses"));
            const blogs = await querySnapshot.docs.map((doc) => {return {id: doc.id, data: doc.data()}});

            node_cache.set("blogs", blogs)
            return res.json({message: "Todos los blogs han sido listados.", status: 200, blogs});
        } else {
            return res.json({message: "Todos los blogs han sido listados.", status: 200, blogs: node_cache.get("blogs")});
        }
    } catch (error) {
        return res.json({message: "Error al listar los blogs.", status: 500, error});
    }
});

router.get("/:id", async (req, res) => {
    try {
        if (!node_cache.get("blogs")) {
            const {id} = req.params;
            const blog = await getDoc(doc(db, "blogs", id));

            if (!blog.exists()) return res.json({message: "El blog no existe.", status: 404});
            return res.json({message: "El blog ha sido listado.", status: 200, blog: blog.data()});
        } else {
            const {id} = req.params;
            const blog = (node_cache.get("blogs") as any).find((blog: any) => blog.id === id);
            if (!blog) return res.status(404).json({message: "El blog no existe.", status: 404});

            return res.json({message: "El blog ha sido listado.", status: 200, blog: blog});
        }
    } catch (error) {
        return res.status(500).json({message: "Error al listar el blog.", status: 500, error});
    }
});

router.post("/create", async (req, res) => {
    try {
        const {title, markdown, image, category, tags} = req.body;
        if (req.body.id) return res.json({message: "La id es automatica, por lo que no es necesaria."})
        if (!(title || markdown || image || category || tags)) return res.json({message: "Todos los campos son requeridos.", status: 400});

        const doc = await addDoc(collection(db, "blogs"), req.body);
        node_cache.del("blogs");

        return res.json({message: "El blog ha sido creado.", status: 200, id: doc.id});
    } catch (error) {
        return res.status(500).json({message: "Error al crear el blog.", status: 500, error});
    }
});

router.patch("/edit", async (req, res) => {
    try {
        const {id, title, markdown, image, category, tags} = req.body;
        if (!(id || title || markdown || image || category || tags)) return res.json({message: "Todos los campos son requeridos.", status: 400});
        
        await updateDoc(doc(db, "blogs", id), req.body);

        node_cache.del("blogs");
        return res.json({message: "El blog ha sido editado.", status: 200});
    } catch (error) {
        return res.status(500).json({message: "Error al editar el blog.", status: 500, error});
    }

})

router.delete("/delete", async (req, res) => {
    try {
        const {id} = req.body;
        if (!id) return res.json({message: "Todos los campos son requeridos.", status: 400});

        await deleteDoc(doc(db, "blogs", id));

        node_cache.del("blogs");
        return res.json({message: "El blog ha sido eliminado.", status: 200});
    } catch (error) {
        return res.status(500).json({message: "Error al eliminar el blog.", status: 500, error});
    }
});

module.exports = router;