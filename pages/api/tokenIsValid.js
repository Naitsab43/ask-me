import jwt from 'jsonwebtoken'
import cookie from "cookie"

const handler = async (req, res) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No se envio un token"
    });
  }


  try {
        
    jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    return res.status(200).json({
      ok: true,
      message: 'Token valido'
    });


  } 
  catch (error) {

    res.setHeader("Set-Cookie", cookie.serialize("token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
      sameSite: "lax",
      path: "/"
    }))

    return res.status(401).json({
      ok: false,
      message: 'Token no válido'
    });
  }

};

export default handler;