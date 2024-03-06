const Message = require('./models/MessageModel');

const messageController = {

  postMessage: async (req, res, next) => {
    //req.params is the part from the body we need to get in order to sotre as the item
    const { message, password} = req.body;
    console.log(req.body);
    // console.log("message",message);
    // console.log('req.body', req.body);
        
    try {
          
      const newMessage = await Message.create({
        // message : message,
        message : message,
        password: password
      });
      // send message back`
      res.locals.message = newMessage;
      return next();
    } catch(err){
      console.log(err);
      return next({
        log: `Error in messageController.postMessage: ${err}`,
        status: 500,
        message: {err: 'error occured while posting message'}
      });
    }
  },

  getMessages: async (req, res, next) => {
    // const { item } = req.body;

    try{
      const messages = await Message.find({});
      
      // findOne always returns an array, need to check id the array doesnt have length in order to see if there are no matches in the data base
      if (!messages.length) {
        return next({
          status: 404,
          message: {err: 'No messages currentlly exist in db'}
        });
      }else {
        res.locals.messages = messages;
        return next();
      }
    } catch(err){
      return next({
        log: `Error in messageController.getMessage: ${err}`,
        status: 500,
        message: {err: 'error occured while getting message'}
      });
    }
  },


  deleteMessage: async (req, res, next) => {
    const { id } = req.params;
    // req.params used for highly unique, specific identifiers
    try {
      const deleted = await Message.findByIdAndDelete({
        _id: id,
      });
      if(deleted === null){
        res.locals.deleted = 'Message not found';
        return next();
      }else{
        res.locals.deleted = 'Message deleted successfully';
        return next();
      }
    } catch(err) {
      console.log(err.message);
      return next({
        log: err.message,
        status: 500,
        message: {err: 'error occured while deletting item'}
      });
    }
  }


};


module.exports = messageController;