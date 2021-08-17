import jwt from 'jsonwebtoken'

const checkJWT = handler => async (req, res) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No hay token en la petición'
    });
  }


  try {
        
    const { uid } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    req.uid = uid;


  } 
  catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }

  return handler(req, res);

};