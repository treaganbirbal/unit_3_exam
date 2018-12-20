const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost:5432/mariana_trench_research')

const getAllTaggings = (req, res, next) => {
  db.any('SELECT * FROM taggings')
    .then(data => {
      res.status(200)
         .json({
           status:'Success',
           message: 'Received All Taggings',
           data: data
         })
    })
    .catch(err => {
      return next(err)
    })
}

const getOneTagging = (req, res, next) => {
  let taggingId = Number(req.params.id)
  db.one('SELECT * FROM taggings WHERE id=$1', taggingId)
    .then(data => {
    res.status(200)
       .json({
         status:'Success',
         message: 'Received A Single Tagging',
         data: data
       })
  })
  .catch(err => {
    return next(err)
  })
}

const taggingsByResearcher = (req, res, next) => {
  let taggingsBy = parseInt(req.params.id)
  db.any('SELECT * FROM taggings WHERE animal_id = $1', taggingsBy)
  .then(data => {
  res.status(200)
     .json({
       status:'Success',
       message: 'Received taggings by Specific Researcher',
       data: data
     })
 })
.catch(err => {
  return next(err)
 })
}

const addNewTagging = (req, res, next) => {
  db.none('INSERT INTO taggings(animal_id, researcher_id) VALUES(${animal_id}, ${researcher_id})', req.body)
    .then(() => {
      res.status(200)
         .json({
           status:'Success',
           message: 'New Tagging Added'
         })
    })
    .catch(err => {
      return next(err)
     })
}

module.exports = {
  getAllTaggings,
  getOneTagging,
  taggingsByResearcher,
  addNewTagging
}


// - GET `/taggings`: Get all taggings.
// - GET `/taggings/:id`: Get single tagging.
// - GET `/taggings/researchers/:id`: Get all taggings performed by a specific researcher.
// - GET `/taggings/animals/:id`: Get all taggings performed on a specific animal.
// - POST `/taggings`: Add new tagging.
