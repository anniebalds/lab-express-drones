const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model')


router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
  .then((dbResponse) => {
    res.render('drones/list.hbs', {
      css: ['alldrones.css'],
      drones: dbResponse
    });
  })
  .catch((err) => console.log(err))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form.hbs', {
    css: ['onedrone.css']
  })
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  try {
    await Drone.create(req.body);
    res.redirect('/drones');
  } catch (err) {
    res.render('drones/create-form.hbs');
    next(err)
  }
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone
  .findById(req.params.id)
  .then((drone) =>
  res.render('drones/update-form.hbs', {
    droneToEdit: drone,
    css: ['onedrone.css']
  })
  )
  .catch(next);
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    await Drone.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/drones');
  } catch (err) {
    res.render('drones/update-form.hbs')
    next(err);
  }
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const id = req.params;
  Drone
  .findByIdAndDelete(id)
  .then((success) => res.redirect('/drones'))
  .catch(next);
});

module.exports = router;
