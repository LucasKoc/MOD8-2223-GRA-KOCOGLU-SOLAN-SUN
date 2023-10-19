import express from 'express'
import user from '../../persistence/users-repository.js'
import validator from "../../validators/user-validator.js";



const router = express.Router()
//returns all users
router.get('/users', async (req, res   ) => {
    res.status(200).json(await user.findUsers())
})

//returns a specific user
router.get('/users/:userId', async (req, res,next) => {
    const userID = Number.parseInt(req.params.userId)
    const err = validator.validateUser(userID)
    if (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
    const find = await user.findUser(req.params.userId)
    if (find) {
        res.status(200).json(await user.findUser(req.params.userId))
    }
    else{
        res.status(404).json({message: 'user does not exist.'});
    }
})

//creates a new user
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
})

// deletes a specific user
router.delete('/users/:userId', async (req, res,next) => {

    const userID = Number.parseInt(req.params.userId)
    const err = validator.validateDeleteUser(userID)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }

    const del = await user.deleteUser(req.params.userId);
    if (del) {
        res.status(202).json({message: 'User has been successfully deleted.'});
    } else {
        res.status(404).json({error: 'User does not exist or could not be deleted.'});
    }

})

//modifies a specific user
router.patch('/users/:userId', async (req, res,next) => {
    const userID = Number.parseInt(req.params.userId)
    const personalKey = req.body.key
    const name = req.body.name
    const err = validator.validateModifyUser(userID,name,personalKey)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const change = await user.modifyUser(req.params.userId, req.body);
    if (!change) {
        res.status(202).json({message: 'User has been successfully modified.'});
    } else {
        res.status(404).json({error: 'User could not be modified.'});
    }

    // res.status(202).json(await user.modifyUser(req.params.userId, req.body))
})

//returns a specific user by key
router.get('/users/key/:key', async (req, res,next) => {
    const key = req.params.key
    const err = validator.validateKey(key)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const find = await user.findUserByKey(req.params.key)
    if (find) {
        res.status(200).json(await user.findUserByKey(req.params.key));
    }
    else
    {
        res.status(404).json({error: 'key does not exist.'});
    }
    // res.status(200).json(await user.findUserByKey(req.params.key))
})

//ban a specific user from making reservation
router.put('/users/:userId/ban/:bantime', async (req, res,next) => {

    const userID = Number.parseInt(req.params.userId)
    const banT = Number.parseInt(req.params.bantime)
    const errBanTime = validator.validateBanTime(banT)
    if (errBanTime) {
        res.status(400).json({error: errBanTime});
        return next(errBanTime)
    }
    const userIdError = await validator.validateBannedID(userID);
    if (userIdError) {
        res.status(400).json({ error: userIdError.message });
        return next(userIdError);
    }

    const banTime = new Date().getTime() + req.params.bantime * 60 * 1000 * 60 *24



    res.status(200).json(await user.banUser(banTime, req.params.userId))
})

//get the ban time of a specific user
router.get('/users/:userId/ban', async (req, res,next) => {
    const userID = Number.parseInt(req.params.userId)
    const err = validator.validateUser(userID)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const find = await user.isUserBanned(req.params.userId)
    if(find)
    {
        res.status(200).json(await user.isUserBanned(req.params.userId))
    }
    else
    {
        res.status(404).json({error: 'user ban does not exist.'});
    }

})

// Deprecated
router.get('/users/verify', async (req, res) => {
    res.status(200).json(await user.verifyUser(req.body))
})

//Create a new session for a user
router.post('/users/login', async (req, res,next) => {
    const roomNumber = req.body.room
    const code = req.body.keyp
    const name = req.body.name

    const err = await validator.validateUserLogin(roomNumber, code, name);

    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const log = (await user.login(req.body, req))
    if (log) {
        res.status(200).json(log)
    } else {
        res.status(404).json({error: "Login operation can't be established maybe you don't already have a account."});    // res.status(200).json(await user.login(req.body, req))
    }

})

// Delete a session for a user
router.post('/users/:userId/logout', async (req, res,next) => {
    const userID = Number.parseInt(req.params.userId)
    const err = validator.validateUserLogout(userID)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const log = (await user.logout(req.params.userId, req))
    if (log) {
        res.status(201).json({message: 'You are logout.'})
    }
    else
    {
        res.status(404).json({error: "Logout operation can't be established maybe because you are not login."});
    }

})

//verify if a user as an active session
router.get('/users/:userId/connected', async (req, res,next) => {
    const userID = Number.parseInt(req.params.userId)
    const err = validator.validateUserConnection(userID)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const find = await user.getConnectedUser(req.params.userId)
    if(find)
    {
        res.status(200).json(await user.getConnectedUser(req.params.userId))
    }
    else
    {
        res.status(404).json({error: 'user does not exist.'});
    }

})

export default router