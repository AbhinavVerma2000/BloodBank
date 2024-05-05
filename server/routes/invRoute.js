const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Inventory = require("../models/Inventorymodal");
const Users = require("../models/Users");

const router = require("express").Router();
router.post("/add", auth, async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) throw new Error("Invalid Email");
    if (req.body.inventorytype == "in" && user.type != "donor")
      throw new Error("This email is not recongnized as a Donor");
    if (req.body.inventorytype == "out" && user.type != "hospital")
      throw new Error("This email is not recongnized as a Hospital");
    if (req.body.inventorytype == "out") {
      const reqbldgrp = req.body.bloodgrp;
      const reqquantity = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      const totalInreqgrp = await Inventory.aggregate([
        {
          $match: {
            organization,
            inventorytype: "in",
            bloodgrp: reqbldgrp,
          },
        },
        {
          $group: {
            _id: "$bloodgrp",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInreqgrp[0].total || 0;
      const totalOutreqgrp = await Inventory.aggregate([
        {
          $match: {
            organization,
            inventorytype: "out",
            bloodgrp: reqbldgrp,
          },
        },
        {
          $group: {
            _id: "$bloodgrp",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutreqgrp[0]?.total || 0;
      const availableqtyreqgrp = totalIn - totalOut;
      if (availableqtyreqgrp < reqquantity) {
        throw new Error(
          `Only ${availableqtyreqgrp} units of ${reqbldgrp} is available`
        );
      }
      req.body.hospital = user._id;
    } else {
      req.body.donor = user._id;
    }
    const inventory = new Inventory(req.body);
    await inventory.save();
    return res.send({
      success: true,
      message: "Inventory Added Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});
router.get("/get", auth, async (req, res) => {
  try {
    const inventory = await Inventory.find({ organization: req.body.userId })
      .sort({ createdAt: -1 })
      .populate("donor")
      .populate("hospital");
    return res.send({
      success: true,
      data: inventory,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});
router.get("/filter", auth, async (req, res) => {
  try {
    const inventory = await Inventory.find(req.body.filter)
      .sort({ createdAt: -1 })
      .populate("donor")
      .populate("hospital")
      .populate("organization");
    return res.send({
      success: true,
      data: inventory,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
