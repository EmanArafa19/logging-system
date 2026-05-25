import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: (v: string) => !v.includes(' '),
      message: 'Application name cannot contain spaces'
    }
  },
  developerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Developer', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);