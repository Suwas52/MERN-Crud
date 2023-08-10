const express = require("express");

const mongoose = require("mongoose");

const User = require("../Models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });

    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(201).json(showAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await User.findById({ _id: id });
    res.status(201).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const { name, email, age } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // const showAll = await User.find();
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await User.findByIdAndDelete({ _id: id });
    // const showAll = await User.find();
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", (req, res) => {
  res.send("Api is running in the 8000");
});

//get

module.exports = router;
