import connectDB from '../../middlewares/database';
import Questions from '../../models/questions';
import Users from '../../models/users';


const handler = async (req, res) => {

  try {

    const body = req.body;

    const question = new Questions({
      question: body.question,
      idQuestion: new Date().getTime(),
      answer: null,
      user: body.idUser
    })

    await question.save()

    await Users.findByIdAndUpdate( body.idUser, {$push: {questions: question._id}}, {new: true, runValidators: true, context: 'query'}).lean();

    return res.status(200).json({
      ok: true,
      message: "Pregunta enviada correctamente"
    })

  }
  catch(error){
    res.status(500).json({
      ok: false,
      message: "Algo salio mal, intente nuevamente",
      error
    })
  }

}

export default connectDB(handler)