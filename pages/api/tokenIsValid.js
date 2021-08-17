import jwt from 'jsonwebtoken'

const handler = async (req, res) => {

  const token = req.headers.authorization;

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
      msg: 'Token valido'
    });


  } 
  catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }

};

export default handler;