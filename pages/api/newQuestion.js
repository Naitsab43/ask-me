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

    const user = await Users.findByIdAndUpdate( body.idUser, {$push: {questions: question._id}}, {new: true, runValidators: true, context: 'query'}).populate("questions");

    return res.status(200).json({
      ok: true,
      message: "Pregunta enviada correctamente",
      questions: user.questions
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