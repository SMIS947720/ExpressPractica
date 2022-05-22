var express = require('express');
var router = express.Router();
const data = require('../userData');
const methods = require('../methods');
const dato = require('../Datos');


//rutas

const registerR = "../views/pages/register";
const loginR = "../views/pages/login";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Programacion ' });
});

router.get ('/home', function(req, res, next){
  res.render ('home',{title1: "Bienvenido"});
})

router.get('/register', (req, res) => {
  res.render(registerR);
});
router.get('/login', (req, res) => {
  res.render(loginR);
});

router.post('/register', (req, res) => {
  const {fulln, email, password, cp } = req.body;
  
  if (password === cp){
    if (data.data.find(dat => dat.email === email)) {
      res.render(registerR,{
        message: "El usuario ya esta registrado",
        messageClass: "alert-danger"
      });

    }

    const hashedPassword = methods.getHashedPassWord(password);

    // actualizamos el array con el nuevo registro
 
    data.data.push({
      fulln,
      email,
      password: hashedPassword
    });
    dato.info(fulln, email, hashedPassword)
    res.render(loginR,{
      message: "El registro se ha completado",
      messageClass: "alert-success"
    });

  }else{
    res.render(registerR,{
      message: "El password no coincide",
      messageClass: "alert-danger"
    });
    
  }

});

router.post ('/login', (req, res) => {
  const {email, password } = req.body;
  const hashedPassword = methods.getHashedPassWord(password);

  const dataUser = data.data.find(u => {
    return u.email === email && hashedPassword === u.password;
  });

  if (dataUser){
    const authToken = methods.generateAuthToken();

    methods.authTokens[authToken] = dataUser;
    res.cookie('AuthToken', authToken);
    res.redirect("/home");

  }else{
    res.render(loginR, {
      message: "Usuario y password invalidos",
      messageClass: "alert-danger"
    });
  }
});

module.exports = router;
