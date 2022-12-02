const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message get test' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message get by id' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message post' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message delete' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message put' })
})



module.exports = router
