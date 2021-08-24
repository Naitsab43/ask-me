import connectDB from '../../middlewares/database';
import Questions from '../../models/questions';
import Users from '../../models/users';
import checkJWT from '../../middlewares/checkJWT';


const handler = async (req, res) => {

  const body = req.body;

  const question = new Questions({
    question: body.question,
    idQuestion: new Date().getTime(),
    answer: null,
    user: body.idUser
  })


  question.save((error) => {

    if(error){

      return res.status(400).json({
        ok: false,
        message: "Algo salio mal, intente nuevamente",
        error
      })

    }

  });


  Users.findByIdAndUpdate( body.idUser, {$push: {questions: question._id}}, {new: true, runValidators: true, context: 'query'}, (error) => {

    if(error){

      return res.status(400).json({
        ok: false,
        message: "Algo salio mal, intente nuevamente",
        error
      })
  
    }

  }).lean();

  return res.status(200).json({
    ok: true,
    message: "Pregunta enviada correctamente"
  })

}

export default checkJWT( connectDB(handler) ) ;