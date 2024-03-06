const express = require('express');
const app = express();
const path = require('path');
const PORT = 3434;
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');
const cookieParser = require('cookie-parser');

// parses JSON from incoming request
// which we can then access with req.body
app.use(express.json());

// decodes the forms
app.use(express.urlencoded({ extended : true }));

// cookie parser method to parse the cookie json object
app.use(cookieParser());

// handle request for static files from index.html
app.use(express.static(path.resolve(__dirname, '../assets')));


// initial rout for the app poiting to the index.html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});



// router to post messages method
app.post('/post', 
  messageController.postMessage, 
  authController.setCookie,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  });

//router to get every message 
app.get('/get', 
  messageController.getMessages, 
  (req, res) => {
    return res.status(200).json(res.locals.messages);
  });  

// refactor the path to /:id
app.delete('/:id', 
  messageController.deleteMessage, 
  (req, res) => {
    return res.status(200).json(res.locals.deleted);
  });


// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err.message);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;