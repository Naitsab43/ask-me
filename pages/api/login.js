import bcrypt from 'bcrypt'
import Users from '../../models/users';
import connectDB from '../../middlewares/database';
import { generateJWT } from '../../helpers/api/generateJwt';
import cookie from "cookie"


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

    const { _id, title, user: userName, idQA } = user;

    const token = await generateJWT(_id, title, userName, idQA);

    res.setHeader("Set-Cookie", cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400, // 24 Horas
      sameSite: "lax",
      path: "/"
    }))

    return res.status(200).json({
      ok: true,
      message: "Se ha iniciado sesión correctamente",
      uid: user._id
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
