import connectDB from '../../../middlewares/database';
import Users from '../../../models/users';
import Questions from '../../../models/questions';


const handler = async (req, res) => {

  try{ 
    
    const { id } = req.query
    const user = await Users.findOne({_id: id}).select("user title image background questions")
    .populate("questions", Questions)
  
    return res.json({
      ok: true,
      user
    })

  }catch(error){

    res.status(400).json({
      ok: false,
      message: "Algo salio mal, intente nuevamente",
    })
  }

}

export default connectDB(handler)