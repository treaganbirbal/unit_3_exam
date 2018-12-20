const express = require('express');
const router = express.Router();
const {getAllTaggings, getOneTagging, taggingsByResearcher, addNewTagging} = require('../db/taggingsQuery.js');

router.get('/', getAllTaggings);
router.get('/:id', getOneTagging);
router.get('/researchers/:id', taggingsByResearcher)
router.post('/', addNewTagging)

module.exports = router;
