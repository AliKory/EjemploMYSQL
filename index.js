
//Llamar al sevidor
var express=require("express");
//Funcion que nos ayuda a las rutas
var path=require("path");
var usuariosRutas=require("./rutas/usuarios");
//Llamar sessiones
var session=require("express-session");
//Contraseña
require("dotenv").config();

//Mandar llamar nuestro motor de vitas
var app=express();
app.set("view engine","ejs");
app.set("/web", express.static(path.join(__dirname,"web")));
//Recibir formularios
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SECRETO_SESION,
    resave:true,
    saveUninitialized:true
}));

app.use("/",usuariosRutas);

//Asignar el puerto
var port=process.env.PORT || 3000;

app.listen(port, ()=>{
   console.log("Servidor en http://localhost:"+port);
});