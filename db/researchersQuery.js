const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost:5432/mariana_trench_research')

const getAllResearchers = (req, res, next) => {
  db.any('SELECT * FROM researchers')
  .then(data => {
    res.status(200)
       .json({
         status: 'success',
         message: 'Received All Researchers',
         data: data
       })
  })
  .catch(err => {
    return next(err)
  })
}

const getSpecificResearcher = (req, res, next) => {
  let researcherId = Number(req.params.id)
  db.one('SELECT * FROM researchers WHERE id=$1', researcherId)
    .then(data => {
      res.status(200)
         .json({
           status: 'success',
           message: 'Received ONE Researcher',
           data: data
         })
    })
    .catch(err => {
      return next(err)
    })
}

const addNewResearcher = (req, res, next) => {
  db.none('INSERT INTO researchers(name, job_title) VALUES(${name}, ${job_title})', req.body)
    .then(() => {
      res.status(200)
         .json({
           status: 'success',
           message: 'New Researcher Added'
         })
    })
    .catch(err => {
      return next(err)
    })
}

const updateResearcher = (req, res, next) => {
  db.none('UPDATE researchers SET name=${name}, job_title=${job_title} WHERE id=${id}', {
    id: req.params.id,
    name: req.body.name,
    job_title: req.body.job_title
    })
    .then(() => {
      res.status(200)
          .json({
            status: 'success',
            message: 'Updates A Researcher'
          })
    })
    .catch(err => {
      return next(err)
    })
}

const deleteResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id)
  db.result('DELETE FROM researchers WHERE id=$1', researcherId)
    .then(result => {
      res.status(200)
         .json({
           status: 'success',
           message: 'Deleted ONE Researcher',
           result:result
         })
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = {
  getAllResearchers,
  getSpecificResearcher,
  addNewResearcher,
  updateResearcher,
  deleteResearcher
}
