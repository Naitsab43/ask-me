import jwt from 'jsonwebtoken'
import cookie from "cookie"

const checkJWT = handler => (req, res) => {

  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No hay token en la petición"
    });
  }


  try {
        
    jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );


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

  return handler(req, res);

};

export default checkJWT;
