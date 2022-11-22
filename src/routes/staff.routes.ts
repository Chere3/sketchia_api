import { Router } from 'express';


const router = Router()

router.get('/', (req, res) => {
    res.send("Staff")
})

router.post('/profile/create', (req, res) => {
    res.send("Create")
})

router.patch('/profile/edit', (req, res) => {
    res.send("Edit")
})

router.delete('/profile/delete', (req, res) => {
    res.send("Delete")
})

router.get('/profile/:id', (req, res) => {
    res.send("Get")
})

router.post('/profile/staff/create', (req, res) => {
    res.send("Create")
})

router.patch('/profile/staff/edit', (req, res) => {
    res.send("Edit")
})

router.delete('/profile/staff/delete', (req, res) => {
    res.send("Delete")
})

router.get('/profile/staff/:id', (req, res) => {
    res.send("Get")
})


module.exports = router