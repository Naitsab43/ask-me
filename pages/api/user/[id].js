import connectDB from '../../../middlewares/database';
import Users from '../../../models/users';
import checkJWT from '../../../middlewares/checkJWT';

const handler = async (req, res) => {
  
  try{ 
    
    const { id } = req.query
    const user = await Users.findOne({_id: id}).select("user title idQA image questions")

  
    return res.json(user)

  }catch(error){

    res.status(400).json({
      ok: false,
      message: "Algo salio mal, intente nuevamente",
      error
    })
  }

}

export default checkJWT( connectDB(handler) ) ;