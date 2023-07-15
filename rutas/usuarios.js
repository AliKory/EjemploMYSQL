var ruta=require("express").Router();
var {Usuario}=require("../conexion");

ruta.get("/", (req,res)=>{
     Usuario.findAll({where:{status:1}})
     .then((usuarios)=>{
          //console.log(usuarios);
          res.render("mostrar",{usuarios});
     })
     .catch((err)=>{
          console.log("Error........."+err);
     })
     
});

ruta.get("/nuevoUsuario", (req,res)=>{
     res.render("nuevoUsuario");
});

ruta.post("/nuevoUsuario", (req,res)=>{
     Usuario.create(req.body)
     .then(()=>{
          res.redirect("/");
     })
     .catch((err)=>{
          console.log("Error al insertar el registro"+err);
          res.redirect("/");

     })
});

ruta.get("/modificarUsuario/:id",(req,res)=>{
   Usuario.findByPk(req.params.id)
   .then((usuario)=>{
     res.render("modificarUsuario", {usuario});
   })
   .catch((err)=>{
       console.log("Error............"+err);
       res.redirect("/")
   })
});

ruta.post("/modificarUsuario",(req,res)=>{
     console.log(req.body);c
      Usuario.update(req.body,{where:{id:req.body.id}})
      .then(()=>{})
      .catch((err)=>{
          console.log("Error ..........." +err);
          res.redirect("/");
      })
});

ruta.get("/borradoFisicoUsuario/:id", (req,res)=>{
     Usuario.destroy({where:{id:req.params.id}})
     .then(()=>{
          res.redirect("/");
     })
     .catch((err)=>{
          console.log("Error ..........." +err);
          res.redirect("/");
     })
});


ruta.get("/borradoLogicoUsuario/:id",(req,res)=>{
       Usuario.update({status:0},{where:{id:req.params.id}})
       .then(()=>{
          res.redirect("/");
       })
       .catch((err)=>{
          console.log("Error ..........." +err);
          res.redirect("/");
       })
});

module.exports=ruta;

