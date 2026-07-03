const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST - Naya message save karo
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong', error });
  }
});

// GET - Saare messages dekho (testing ke liye)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;