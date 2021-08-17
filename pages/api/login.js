import bcrypt from 'bcrypt'
import Users from '../../models/users';
import connectDB from '../../middlewares/database';
import { generateJWT } from '../../helpers/api/generateJwt';


const handler = async (req, res) => {

  let body = req.body;
  
  try{

    const user = await Users.findOne({user: body.user});

    if(!user){
      return res.status(400).json({
        ok: false,
        message: "El usuario o contraseña son incorrectos"
      })
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    if(!isMatch){
      return res.status(400).json({
        ok: false,
        message: "El usuario o contraseña son incorrectos"
      })
    }

    const token = await generateJWT( user._id );

    return res.status(200).json({
      ok: true,
      message: "Se ha iniciado sesión correctamente",
      token
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
