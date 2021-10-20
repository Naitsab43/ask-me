import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let usersSchema = new Schema({

  user: {
    type: String,
    required: [true, "El nombre del usuario es obligatorio"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  image: {
    type: String,
  },
  background: {
    type: String
  },
  title: {
    type: String,
    required: [true, "El nombre del QA es obligatorio"]
  },
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: "Questions"
  }]

});


module.exports = mongoose.models.Users || mongoose.model("Users", usersSchema);