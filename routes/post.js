const express = require('express');
const { db } = require('../model/User');
const User = require('../model/User');
const router = express.Router();
const { newUserValidation } = require('../validation');

//Get all post
router.get('/all', async (req, res) => {
    const posts = await User.find();
    res.send(posts)
})

//Create new post
router.post('/create', async (req, res) => {
    const { error } = newUserValidation(req.body);
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }

    if (!req.body.age) {
        return res.status(400).json({ error: "Age is undefined" })
    }
    if (!req.body.job) {
        return res.status(400).json({ error: "Job is undefined" })

    }
    let newID = undefined;
    try {
        newID = (await db.collection('counters').findOne()).seq + 1
    }
    catch (error) {
        if (!newID) newID == 1
    }
    const user = new User({
        Name: req.body.name,
        Age: req.body.age,
        Job: req.body.job,
        ID: newID,

    })
    try {
        await user.save();
        res.status(200).send(user);
    }
    catch (error) {
        res.status(404).json(error.message);
    }
})

router.get('/create/:id', async (req, res) => {

    const user = await User.findOne({ ID: req.params.id })
    if (user) {
        res.send(user)
    } else {
        return res.status(404).json({ error: "User does not exist!" })
    }
})

router.patch('/create/:id', async (req, res) => {
    try {
        const patchUser = await User.findOne({ ID: req.params.id })
        if (!patchUser) {
            return res.status(400).json({ error: 'ID not found' });
        }
        if (req.body.name) {
            patchUser.Name = req.body.name;
        }
        if (req.body.age) {
            patchUser.Age = req.body.age;
        }
        if (req.body.job) {
            patchUser.Job = req.body.job;
        }
        await patchUser.save();
        res.send(patchUser);
    }
    catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
})

router.delete('/create/:id', async (req, res) => {
    const user = await User.findOne({ ID: req.params.id })
    if (user) {
        await User.deleteOne({ ID: req.params.id })
        return res.status(202).json({ status: 'User had been delete' })
    } else {
        return res.status(404).json({ error: "User does not exist!" })
    }
})
module.exports = router
