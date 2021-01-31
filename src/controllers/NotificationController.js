const { populate } = require('../models/NotificationModel');
const Notification = require('../models/NotificationModel');

module.exports = {
  async read(req, res){
    try {
      const {_id} = req.user;

      const notifications = await Notification.find({recipient: _id})
        .populate({
          path: 'requester',
          select: 'requester full_name',
          populate: {
            path: 'profile_photo',
            select: 'url'
          }
        })
        .select('type')

      return res.send(notifications);
    } catch (error) {
      return res.send(error);
    }
  }
}
