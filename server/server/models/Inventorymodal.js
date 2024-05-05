const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
    inventorytype:{
        type: String,
        required: true,
        enum: ['in', 'out']
    },
    bloodgrp:{
        type: String,
        required: true,
        enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"]
    },
    quantity:{
        type: Number,
        required:true,
    },
    email:{
        type: String,
        required: true,
    },
    organization:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: function(){
            return this.inventorytype==='out'
        }
    },
    donor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: function(){
            return this.inventorytype==='in'
        }
    }
},{timestamps: true})
const Inventory = mongoose.model('inventories',inventorySchema)
module.exports = Inventory