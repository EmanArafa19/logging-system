import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  apiKey: { 
    type: String, 
    required: true, 
    unique: true 
  }
}, { timestamps: true });

export default mongoose.model('Developer', developerSchema);