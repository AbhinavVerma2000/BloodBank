const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Inventory = require('../models/Inventorymodal')
const mongoose = require('mongoose')
router.get('/getuserinfo', auth, async(req,res)=>{
    try {
        const user = await Users.findOne({_id: req.body.userId})
        return res.send({
            success: true,
            message:"User fetched Successfully",
            data: user
        })
    } catch (error) {
        return res.send({success: false,
        message: error.message})
    }
})
router.post('/register',async(req, res)=>{
    try {
        const useris = await Users.findOne({email: req.body.email})
        if (useris) {
            return res.send({success: false,
                message: error.message})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedpass = await bcryptjs.hash(req.body.password, salt)
        req.body.password = hashedpass
        const user = new Users(req.body)
        await user.save()
        return res.send({
            success: true,
            message: 'User registered Successfully'
        })
    } catch (error) {
        return res.send({success: false,
        message: error.message})
    }
})
router.get('/getalldonors',auth, async(req, res)=>{
    try {
        const uniquedonorid = await Inventory.distinct("donor",{
            organization: new mongoose.Types.ObjectId(req.body.userId)
        })
        const donors = await Users.find({_id:{$in: uniquedonorid}})
        return res.send({
            success: true,
            message: "Donors fetched successfully",
            data: donors
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})
router.post('/login',async(req, res)=>{
    try {
        const useris = await Users.findOne({email: req.body.email})
        if (!useris) {
            return res.send({success: false,
                message: 'User not found'})
        }
        if (useris.type!==req.body.type) {
            return res.send({
                success: false,
                message: `User is not registered as ${req.body.type}`
            })
        }
        const validpass = await bcryptjs.compare(req.body.password, useris.password)
        if (!validpass) {
            return res.send({
                success: false,
            message: 'Invalid Password'
            })
        }
        const token = jwt.sign({
            userId: useris._id
        }, process.env.SECRET_KEY, {expiresIn: '1d'})
        return res.send({
            success: true,
            message: 'User Logged in Successfully',
            data: token
        })
    } catch (error) {
        return res.send({success: false,
        message: error.message})
    }
})
router.get('/getallhospitals',auth, async(req, res)=>{
    try {
        const uniquehosid = await Inventory.distinct("hospital",{
            organization: new mongoose.Types.ObjectId(req.body.userId)
        })
        const hospitals = await Users.find({_id:{$in: uniquehosid}})
        return res.send({
            success: true,
            message: "Donors fetched successfully",
            data: hospitals
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})
router.get('/getallorgdonor',auth, async(req, res)=>{
    try {
        const uniqueorgid = await Inventory.distinct("organization",{
            donor: new mongoose.Types.ObjectId(req.body.userId)
        })
        const hospitals = await Users.find({_id:{$in: uniqueorgid}})
        return res.send({
            success: true,
            message: "Donors fetched successfully",
            data: hospitals
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})
router.get('/getallorghospital',auth, async(req, res)=>{
    try {
        const uniqueorgid = await Inventory.distinct("organization",{
            hospital: new mongoose.Types.ObjectId(req.body.userId)
        })
        const hospitals = await Users.find({_id:{$in: uniqueorgid}})
        return res.send({
            success: true,
            message: "Donors fetched successfully",
            data: hospitals
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports=router;