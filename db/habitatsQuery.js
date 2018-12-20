const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost:5432/mariana_trench_research')

const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats')
    .then(data => {
      res.status(200)
         .json({
           status: 'success',
           message: 'Received All HABITATS',
           data: data
         })
    })
    .catch(err => {
      return next(err)
    })
}

const getOneHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id)
  db.one('SELECT * FROM habitats WHERE ID=$1', habitatId)
  .then(data => {
    res.status(200)
       .json({
         status: 'success',
         message: 'Received ONE HABITAT',
         data: data
       })
  })
  .catch(err => {
    return next(err)
  })
}

const addNewHabitat = (req, res, next) => {
  db.none('INSERT INTO habitats(category) VALUES(${category})', req.body)
    .then(() => {
      res.status(200)
         .json({
           tatus: 'success',
           message: 'Created ONE New HABITAT',
         })
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = {
  getAllHabitats,
  getOneHabitat,
  addNewHabitat
}
// - GET `/habitats`: Get all habitats.
// - GET `/habitats/:id`: Get single habitat.
// - POST `/habitats`: Add new habitat.
