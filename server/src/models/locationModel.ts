import mongoose, { Schema } from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    place_id: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    website: {
      type: String,
    },
    moderators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Moderator',
      },
    ],
    happy_hours: {
        periods: [
          {
            start: {
              day: Number,
              hours: Number,
              minutes: Number,
              time: 'string',
        },
            end: {
              day: Number,
              hours: Number,
              minutes: Number,
              time: 'string',
        },
      },
        ],
    },
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Rating',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Location || mongoose.model('Location', locationSchema);
