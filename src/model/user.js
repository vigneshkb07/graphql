import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role:{
      type: String,
      required: true
    },
    name:{
      type:String,
      required: true
    }
  });
  
  const userModel = mongoose.model('users', userSchema);
  export default userModel;