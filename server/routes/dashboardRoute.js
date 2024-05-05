const router = require("express").Router();
const auth = require("../middleware/auth");
const Inventory = require("../models/Inventorymodal");
const mongoose = require("mongoose");

router.get("/bloodgrpdata", auth, async (req, res) => {
  try {
    const allbldgrp = ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"];
    const bldgrpdata = [];
    await Promise.all(
      allbldgrp.map(async (bldgrp) => {
        const totalin = await Inventory.aggregate([
          {
            $match: {
              bloodgrp: bldgrp,
              inventorytype: "in",
              organization: new mongoose.Types.ObjectId(req.body.userId),
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$quantity",
              },
            },
          },
        ]);
        const totalout = await Inventory.aggregate([
          {
            $match: {
              bloodgrp: bldgrp,
              inventorytype: "out",
              organization: new mongoose.Types.ObjectId(req.body.userId),
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$quantity",
              },
            },
          },
        ]);
        const available = (totalin[0]?.total||0) - (totalout[0]?.total||0)
        bldgrpdata.push({
            bloodgrp:bldgrp,
            totalIn: totalin[0]?.total||0,
            totalOut: totalout[0]?.total||0,
            available
        })
      })
    );
    res.send({
      success: true,
      message: "Blood Group Data",
      data: bldgrpdata
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
