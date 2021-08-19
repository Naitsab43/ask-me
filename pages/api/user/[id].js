import connectDB from '../../../middlewares/database';
import Users from '../../../models/users';
import checkJWT from '../../../middlewares/checkJWT';

const handler = async (req, res) => {

  const { id } = req.query

  const user = await Users.findOne({_id: id}).select("user title idQA image questions")

  return res.json(user)

}

export default checkJWT( connectDB(handler) ) ;