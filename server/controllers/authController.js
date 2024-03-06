// get the pasword input in order to set a cookie with that value
// const passwordInput = document.getElementById('pass');

const verifyPass = {
    pass:''
  };
    
  const authController = {};
    
  authController.setCookie = (req, res, next) => {
    // getting the pass from the req body in order to set the cookie with that value
    const {pass} = req.body;
    // first input name/key second value
    res.cookie('pass', pass);
    return next();
  };
  
  
  module.exports = authController;