import express from 'express'
import user from '../../persistence/users-repository.js'
import validator from "../../validators/user-validator.js";
import room from "../../persistence/room-repository.js";


const router = express.Router()

router.get('/users', async (req, res   ) => {
    res.status(200).json(await user.findUsers())
})
router.get('/users/:userId', async (req, res,next) => {
    const userID = Number.parseInt(req.params.userId)
    const err = validator.validateUser(userID)
    if (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
    const find = await user.findUser(req.params.userId)
    console.log(find)
    if (find) {
        res.status(200).json(await user.findUser(req.params.userId))
    }
    else{
        res.status(404).json({message: 'user does not exist.'});
    }
})
router.post('/users', async(req,res,next)=>{
    const userId = req.body.room
    const code = req.body.keyp
    const name = req.body.name

    const err = await validator.validateUserIdentity(userId,code,name);

    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }

    const create =(await user.addUser(req.body))
    if (create) {
        res.status(201).json({message: 'Reservation is created.'})
    } else {
        res.status(404).json({error: 'Reservation could not be created.'});

    }
    // res.status(201).json(await user.addUser(req.body))
})
router.delete('/users/:id', async (req, res) => { res.status(200).json(await user.deleteUser(req.params.id)) })
router.patch('/users/:id', async (req, res) => {res.status(202).json(await user.modifyUser(req.params.id, req.body)) })
router.get('/users/key/:key', async (req, res) => {res.status(200).json(await user.findUserByKey(req.params.key)) })

router.get('/users/verify', async (req, res) => {res.status(200).json(await user.verifyUser(req.body)) })
router.post('/users/login', async (req, res) => {
    res.status(200).json(await user.login(req.body, req))
})
router.post('/users/:id/logout', async (req, res) => {
    res.status(200).json(await user.logout(req.params.id, req))
})
router.get('/users/:id/connected', async (req, res) => {res.status(200).json(await user.getConnectedUser(req.params.id)) })

export default router