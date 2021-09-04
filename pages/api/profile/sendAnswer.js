import connectDB from '../../../middlewares/database';
import checkJWT from '../../../middlewares/checkJWT';
import Questions from '../../../models/questions';

const handler = async (req, res) => {

  try{ 
    
    const answer = req.body.answer;
    const idQuestion = req.body.idQuestion;

    const updatedQuestion = await Questions.findOneAndUpdate({_id: idQuestion}, { answer }, {new: true, runValidators: true, context: 'query'})
    
    res.status(200).json({
      ok: true,
      message: "Pregunta respondida correctamente",
      updatedQuestion
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