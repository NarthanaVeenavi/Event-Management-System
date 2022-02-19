const router = require('express').Router()
const eventCtrl = require('../controllers/eventCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

//event routes
router.route('/events')
    .get(eventCtrl.getEvents)
    .post(auth, authAdmin, eventCtrl.createEvent)


router.route('/events/:id')
    .delete(auth, authAdmin, eventCtrl.deleteEvent)
    .put(auth, authAdmin, eventCtrl.updateEvent)

module.exports = router