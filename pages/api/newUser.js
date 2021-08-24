import bcrypt from 'bcrypt'
import Users from '../../models/users';
import connectDB from '../../middlewares/database';

// Crea una cuenta
const handler = async (req, res) => {

  const body = req.body;
  
  // Comprueba que ningun campo este vacio
  if(body.user.length < 1 ){

    return res.json({
      ok: false,
      message: "El usuario debe tener más de un caracter"
    })

  };

  if(body.title < 1){

    return res.json({
      ok: false,
      message: "El titulo debe tener más de un caracter"
    })

  }
  
  // Comprueba que la contraseña tenga más de 6 caracteres
  if(body.password.length<=6){

    return res.json({
      ok: false,
      message: "La contraseña debe ser mayor o igual a 6"
    })
  } 

  try{
    // Busca si el nombre ya existe
    const userFind = await Users.findOne({user: body.user})
    // Si encuentra un usuario retorna un msg
    if(userFind){
      console.log("Ya existe")
      return res.status(400).json({
        ok: false,
        message: "El usuario ya existe",
      })
    }

    // Encripto la contraseña por medio de un hash de una sola via
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(body.password, salt);
    
    // crea un Schema de un usuario
    let user = new Users({
      user: body.user,
      password: encryptPassword,
      image: null,
      title: body.title,
      idQA: new Date().getTime(),
      questions: []
    });

    // guarda un usuario
    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Cuenta creada correctamente"
    })

  }
  catch(error){
    res.status(400).json({
      ok: false,
      message: "Algo salio mal, intente nuevamente",
      error
    })
  }
  
};


export default connectDB(handler);
