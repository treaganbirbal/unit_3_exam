const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost:5432/mariana_trench_research')

const getAllSightings = (req, res, next) => {
  db.any('SELECT * FROM sightings')
    .then(data => {
      res.status(200)
         .json({
           status:'Success',
           message: 'Received taggings by Researcher Sightings',
           data: data
         })
    })
    .catch(err => {
      return next(err)
    })
}

const getSpecificSpeciesSighting = (req, res, next) => {
  let speciesId = parseInt(req.params.id)
  db.any('SELECT * FROM sightings WHERE species_id=$1', speciesId)
    .then(data => {
      res.status(200)
         .json({
           status: 'Success',
           message: 'Received All Sightings of Specific Species',
           data: data
         })
    })
    .catch(err => {
      return next(err)
    })
}

const getAllSightingsForResearcher = (req, res, next) => {
  let researcherId = Number(req.params.id)
  db.any('SELECT * FROM sightings WHERE researcher_id =$1', researcherId)
  .then(data => {
    res.status(200)
       .json({
         status: 'Success',
         message: 'Received All Sightings for Specific Researcher',
         data: data
       })
  })
  .catch(err => {
    return next(err)
  })
}

const addNewSighting = (req, res, next) => {
  db.none('INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES(${researcher_id}, ${species_id}, ${habitat_id})', req.body)
    .then(() => {
      res.status(200)
          .json({
           status: 'Success',
           message: 'New Sighting Added'
         })
    })
    .catch(err => {
      return next(err)
    })
}

const deleteSighting = (req, res, next) => {
  let sightingId = parseInt(req.params.id)
  db.result('DELETE FROM sightings WHERE id=$1', sightingId)
    .then(result => {
      res.status(200)
         .json({
           status: 'success',
           message: 'Sighting has been Deleted',
           result: result
         })
    })
    .catch(err => {
      return next(err)
    })
}



module.exports = {
  getAllSightings,
  getSpecificSpeciesSighting,
  getAllSightingsForResearcher,
  addNewSighting,
  deleteSighting
}



// - GET `/sightings`: Get all sightings.
// - GET `/sightings/species/:id`: Get all sightings of a specific species.
// - GET `/sightings/researchers/:id`: Get all sightings for a specific researcher.
// - GET `/sightings/habitats/:id`: Get all sightings for a specific habitat.
// - POST `/sightings`: Add new sighting.
// - DELETE `/sightings/:id`: Delete single sighting.
