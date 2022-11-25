import { Router } from "express";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, node_cache } from "../app";

const router = Router();


router.get("/", async (req, res) => {
    try {

    if (!node_cache.get("courses")) {

    const querySnapshot = await getDocs(collection(db, "courses"));
    let courses = querySnapshot.docs.map((doc) => {return {id: doc.id, data: doc.data()}});


    if (req.query.limit) courses = courses.slice(0, req.query.limit as any);
    node_cache.set("courses", courses);
    return res.json({message: "Todos los cursos han sido listados.", status: 200, courses});
    } else {
    if (req.query.limit) return res.json({message: "Todos los cursos han sido listados.", status: 200, courses: (node_cache.get("courses") as any).slice(0, req.query.limit as any)});
    return res.json({message: "Todos los cursos han sido listados.", status: 200, courses: node_cache.get("courses")});
    }
    } catch (error) {
        return res.json({message: "Error al listar los cursos.", status: 500, error});
    }
});

router.get("/:id", async (req, res) => {
    try {
        if (!node_cache.get("courses")) {
        const {id} = req.params;
        const course = doc(db, "courses", id);
        const courseData = await getDoc(course);

        if (!courseData.exists()) return res.json({message: "El curso no existe.", status: 404});
        return res.json({message: "El curso ha sido listado.", status: 200, course: courseData.data()});
        } else {
        const {id} = req.params;
        const course = (node_cache.get("courses") as any).find((course: any) => course.id === id);
        if (!course) return res.json({message: "El curso no existe.", status: 404});

        return res.json({message: "El curso ha sido listado.", status: 200, course: course});
        }
    } catch (error) {
        return res.json({message: "Error al listar el curso.", status: 500, error});
    }
});

router.post("/add", async (req, res) => {
    try {
        const {name, description, image, category, tags, lessons} = req.body;
        if (!(name || description || image || category || tags || lessons)) return res.json({message: "Todos los campos son requeridos.", status: 400});
        const doc = await addDoc(collection(db, "courses"), req.body);

        node_cache.del("courses");
        return res.json({message: "El curso ha sido creado.", status: 200, id: doc.id});
    } catch (e) {
        return res.json({message: "Error al crear el curso.", status: 500, error: e});
    }
});

router.patch("/edit", async (req, res) => {
    try {
        const {id, name, description, image, category, tags, lessons} = req.body;
        if (!id) return res.json({message: "Todos los campos son requeridos.", status: 400});

        const course = doc(db, "courses", id);
        await updateDoc(course, req.body);

        node_cache.del("courses");
        return res.json({message: "El curso ha sido editado.", status: 200});
    } catch (e) {
        return res.json({message: "Error al editar el curso.", status: 500, error: e});
    }
});

router.delete("/delete", (req, res) => {
    try {
        const course = doc(db, "courses", req.body.id);
        deleteDoc(course);

        node_cache.del("courses");

        return res.json({message: "El curso ha sido eliminado.", status: 200});
    } catch (e) {
        return res.json({message: "Error al eliminar el curso.", status: 500, error: e});
    }
});

module.exports = router;