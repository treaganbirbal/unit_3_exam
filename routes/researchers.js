const express = require('express')
const router = express.Router();
const {getAllResearchers, getSpecificResearcher, addNewResearcher, updateResearcher, deleteResearcher} = require('../db/researchersQuery.js');

router.get('/', getAllResearchers);
router.get('/:id', getSpecificResearcher);
router.post('/', addNewResearcher);
router.patch('/:id', updateResearcher)
router.delete('/:id', deleteResearcher)

module.exports = router;
