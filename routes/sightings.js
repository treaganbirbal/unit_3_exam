const express = require('express');
const router = express.Router();
const {getAllSightings, getSpecificSpeciesSighting, getAllSightingsForResearcher, addNewSighting, deleteSighting} = require('../db/sightingsQuery.js');

router.get('/', getAllSightings);
router.get('/species/:id', getSpecificSpeciesSighting);
router.get('/researchers/:id', getAllSightingsForResearcher);
router.post('/', addNewSighting);
router.delete('/:id', deleteSighting)
module.exports = router;
