import bcrypt from 'bcrypt'
import Users from '../../models/users';
import connectDB from '../../middlewares/database';

const handler = async (req, res) => {

  const body = req.body;
  
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
  
  if(body.password.length<=6){

    return res.json({
      ok: false,
      message: "La contraseña debe ser mayor o igual a 6"
    })
  } 

  try{

    const userFind = await Users.findOne({user: body.user})

    if(userFind){

      return res.status(400).json({
        ok: false,
        message: "El usuario ya existe",
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(body.password, salt);
    

    let user = new Users({
      user: body.user,
      password: encryptPassword,
      background: "default",
      image: body.image,
      title: body.title,
      questions: []
    });


    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Cuenta creada correctamente"
    })

  }
  catch(error){
    res.status(500).json({
      ok: false,
      message: "Algo salio mal, intente nuevamente",
      error
    })
  }
  
};


export default connectDB(handler);
