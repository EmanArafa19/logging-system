import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  message: { 
    type: String, 
    required: true 
  },
  level: { 
    type: String, 
    enum: ['INFO', 'WARN', 'ERROR'], 
    required: true 
  },
  count: { 
    type: Number, 
    default: 1 
  },
  applicationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application', 
    required: true 
  }
}, { timestamps: true });

logSchema.index({ message: 1, level: 1, applicationId: 1 }, { unique: true });

export default mongoose.model('Log', logSchema);