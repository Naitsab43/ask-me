import jwt from 'jsonwebtoken'


export const generateJWT = (uid, title, user, idQA) => {

  return new Promise( (resolve, reject) => {

    const payload = { uid, title, user, idQA };

    jwt.sign( payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '1h'
    }, (error, token ) => {

      if (error){
        console.log(error);
        reject('No se pudo generar el token');
      }
      
      resolve( token );

    })


  })


}