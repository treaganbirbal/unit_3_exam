const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost:5432/mariana_trench_research');

const getAllSpecies = (req, res, next) => {
  db.any('SELECT * FROM species')
    .then(data => {
      res.status(200)
        .json({
          status:'Success',
          message: 'Received All Species',
          data: data
        })
    })
    .catch(err => {
      return next(err)
    })
}

const getSpecificSpecies = (req, res, next) => {
  let speciesId = parseInt(req.params.id)
  db.one('SELECT * FROM species WHERE id=$1', speciesId)
    .then(data => {
      res.status(200)
          .json({
            status:'Success',
            message: 'Received Single Species',
            data: data
          })
    })
    .catch(err => {
      return next(err)
    })
}

const addNewSpecies = (req, res, next) => {
  db.none('INSERT INTO species(name, is_mammal) VALUES(${name}, ${is_mammal})', req.body)
    .then(() => {
      res.status(200)
          .json({
            status:'Success',
            message: 'Received Single Species'
          })
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = {
  getAllSpecies,
  getSpecificSpecies,
  addNewSpecies

}
