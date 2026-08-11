import mongoose from 'mongoose';

const stopCoordinatesSchema = new mongoose.Schema(
  {
    latitude: { type: Number },
    longitude: { type: Number },
    x: { type: Number }, // Simulation grid coordinate x
    y: { type: Number }, // Simulation grid coordinate y
  },
  { _id: false }
);

const stopSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Stop code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Stop name is required'],
      trim: true,
    },
    coordinates: {
      type: stopCoordinatesSchema,
      required: true,
    },
    zone: {
      type: String,
      default: 'Zone A',
      trim: true,
    },
    amenities: {
      type: [String],
      default: ['Shelter', 'CCTV Surveillance', 'Digital ETA Display'],
    },
    connectedRoutes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'stops',
  }
);

export const Stop = mongoose.model('Stop', stopSchema);
export default Stop;
