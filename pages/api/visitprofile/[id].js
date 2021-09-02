import connectDB from '../../../middlewares/database';
import Users from '../../../models/users';


const handler = async (req, res) => {

  try{ 
    
    const { id } = req.query
    const user = await Users.findOne({_id: id}).select("user title image questions").populate("Questions")
  
    return res.json(user)

  }catch(error){

    console.log(error);

    res.status(400).json({
      ok: false,
      message: "Algo salio mal, intente nuevamente",
    })
  }

}

export default connectDB(handler)