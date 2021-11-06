import connectDB from '../../../../middlewares/database';
import checkJWT from '../../../../middlewares/checkJWT';
import Users from '../../../../models/users';

const handler = async (req, res) => {

  try{ 

    const { id } = req.query
    const { user, title, background, image } = req.body

    const updatedUser = await Users.findOneAndUpdate({_id: id}, { user, title, background, image }, {new: true, runValidators: true, context: 'query'}).select("user title background image")
    
    res.status(200).json({
      ok: true,
      message: "Perfil actualizado correctamente",
      updatedUser
    })
    
  }
  catch(error){

    console.log(error);

    res.status(400).json({
      ok: false,
      message: "Algo salio mal, intente nuevamente",
      error
    })
  }

}

export default checkJWT( connectDB(handler) ) ;