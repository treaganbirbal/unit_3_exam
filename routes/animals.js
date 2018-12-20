const express = require('express');
const router = express.Router();
const {getAllAnimals, getSpecificAnimal, addNewAnimal, updateAnimal, killAnimal} = require('../db/animalsQuery.js');

router.get('/', getAllAnimals);
router.get('/:id', getSpecificAnimal);
router.post('/', addNewAnimal);
router.patch('/:id', updateAnimal);
router.delete('/:id', killAnimal)

module.exports = router;
