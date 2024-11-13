const express = require('express');
const router = express.Router();
const { createJournalCtrl } = require('../controller/journalController')

router.post('/', createJournalCtrl)

module.exports = router;