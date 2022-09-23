import mongoose, { Schema } from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    // id from google api
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
    address: {
      type: String,
      required: true,
    },
    opening_hours: {
      normal_days: {
        monday: {
          start: { type: Date },
          end: { type: Date },
        },
        tuesday: {
          start: { type: Date },
          end: { type: Date },
        },
        wednesday: {
          start: { type: Date },
          end: { type: Date },
        },
        thursday: {
          start: { type: Date },
          end: { type: Date },
        },
        friday: {
          start: { type: Date },
          end: { type: Date },
        },
        saturday: {
          start: { type: Date },
          end: { type: Date },
        },
        sunday: {
          start: { type: Date },
          end: { type: Date },
        },
      },
      holidays: {},
    },
    happy_hours: {
      normal_days: {
        monday: {
          start: { type: Date },
          end: { type: Date },
        },
        tuesday: {
          start: { type: Date },
          end: { type: Date },
        },
        wednesday: {
          start: { type: Date },
          end: { type: Date },
        },
        thursday: {
          start: { type: Date },
          end: { type: Date },
        },
        friday: {
          start: { type: Date },
          end: { type: Date },
        },
        saturday: {
          start: { type: Date },
          end: { type: Date },
        },
        sunday: {
          start: { type: Date },
          end: { type: Date },
        },
      },
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
