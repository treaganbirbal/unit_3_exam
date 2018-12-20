const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost:5432/mariana_trench_research')

const getAllAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals')
    .then(data => {
      res.status(200)
         .json({
           status:'Success',
           message: 'Received ALL Animals',
           data: data
         })
    })
    .catch(err => {
      return next(err)
    })
}

const getSpecificAnimal = (req, res, next) => {
  let animalId = Number(req.params.id)
  db.one('SELECT * FROM animals WHERE id=$1', animalId)
    .then(data => {
      res.status(200)
        .json({
          status:'Success',
          message: 'Received ONE TYPE OF Animal',
          data: data
        })
    })
    .catch(err => {
      return next(err)
    })
}

const addNewAnimal = (req, res, next) => {
  db.none('INSERT INTO animals(species_id, nickname) VALUES(${species_id}, ${nickname})', req.body)
    .then(() => {
      res.status(200)
         .json({
        status: "success",
        message: 'New Animal Added!'
      })
    })
    .catch(err => {
      return next(err)
    })
}

const updateAnimal = (req, res, next) => {
  db.none('UPDATE animals SET species_id=${species_id}, nickname=${nickname} WHERE ID=${id}',{
    id: req.params.id,
    species_id: parseInt(req.body.species_id),
    nickname: req.body.nickname
  })
   .then(() => {
    res.status(200)
      .json({
        status: "success",
        message: 'Animal has been updated!'
      })
  })
  .catch(err => {
    return next(err)
  })
}

const killAnimal = (req, res, next) => {
  let animalId = Number(req.params.id)
  db.result('DELETE FROM animals WHERE id=$1', animalId)
  .then(result => {
      res.status(200)
        .json({
          status:'success',
          message: 'ANIMAL as been KILLED!',
          result : result
        })
    })
    .catch(err => {
      return next(err)
    })
}




module.exports = {
  getAllAnimals,
  getSpecificAnimal,
  addNewAnimal,
  updateAnimal,
  killAnimal
}
// GET `/animals`: Get all animals.
// - GET `/animals/:id`: Get single animal.
// - POST `/animals`: Add new animal.
// - PATCH `/animals/:id`: Update single animal.
// - DELETE `/animals/:id`: Delete single animal.
