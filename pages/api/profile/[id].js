import connectDB from '../../../middlewares/database';
import checkJWT from '../../../middlewares/checkJWT';
import Users from '../../../models/users';
import Questions from '../../../models/questions';

const handler = async (req, res) => {

  try{ 
    
    const { id } = req.query

    const user = await Users.findOne({_id: id}).select("user title image questions").populate("questions", Questions)

  
    return res.json(user)

  }catch(error){

    console.log(error);

    res.status(400).json({
      ok: false,
      message: "Algo salio mal, intente nuevamente",
      error
    })
  }

}

export default checkJWT( connectDB(handler) ) ;