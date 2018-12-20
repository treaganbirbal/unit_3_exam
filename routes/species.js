const express = require('express');
const router = express.Router();
const {getAllSpecies, getSpecificSpecies, addNewSpecies} = require('../db/speciesQuery.js');

router.get('/', getAllSpecies);
router.get('/:id', getSpecificSpecies);
router.post('/', addNewSpecies)

module.exports = router;
