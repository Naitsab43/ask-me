import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let questionsSchema = new Schema({

  question: {
    type: String,
    required: true
  },
  idQuestion: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users'
  }

});


module.exports = mongoose.models.Questions || mongoose.model("Questions", questionsSchema);