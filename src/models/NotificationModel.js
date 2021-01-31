const moongose = require('../config/database');
const NotificationModel = require('../schemas/NotificationSchema');

const Notification = moongose.model('Notification', NotificationModel);

module.exports = Notification;
