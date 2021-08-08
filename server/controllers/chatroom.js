const Message = require("../models/Message");

exports.getChatroom = async (req, res) => {
  const messages = await Message.find({})
    .sort({ time: "ascending" })
    .exec((err, docs) => {
      if (err) {
        res.json({ historyMessages: [] });
      }
      res.json({ historyMessages: docs });
    });
};
