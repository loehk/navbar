import mongoose, { Schema } from 'mongoose';

const ratingsSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      max: 5,
      min: 1,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Rating || mongoose.model('Rating', ratingsSchema);
