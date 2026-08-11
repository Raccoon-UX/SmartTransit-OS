import mongoose from 'mongoose';

const coordinatesSchema = new mongoose.Schema(
  {
    latitude: { type: Number },
    longitude: { type: Number },
    x: { type: Number }, // Normalized UI simulation coordinate x (0 - 100)
    y: { type: Number }, // Normalized UI simulation coordinate y (0 - 100)
  },
  { _id: false }
);

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: [true, 'Bus number is required'],
      unique: true,
      trim: true,
    },
    serial: {
      type: String,
      required: [true, 'Vehicle serial number is required'],
      trim: true,
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
      default: null,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ['ON_TIME', 'DELAYED', 'ACTIVE', 'OFFLINE'],
        message: '{VALUE} is not a valid bus status',
      },
      default: 'ACTIVE',
      index: true,
    },
    occupancyPercent: {
      type: Number,
      min: [0, 'Occupancy percentage cannot be less than 0'],
      max: [100, 'Occupancy percentage cannot exceed 100'],
      default: 0,
    },
    occupancyStatus: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'FULL'],
      default: 'LOW',
    },
    coordinates: {
      type: coordinatesSchema,
      default: () => ({ x: 50, y: 50 }),
    },
    speed: {
      type: String,
      default: '0 km/h',
      trim: true,
    },
    heading: {
      type: String,
      default: 'North',
      trim: true,
    },
    lastPing: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'buses',
  }
);

// Compound Indexes for query optimization
busSchema.index({ routeId: 1, status: 1 });

export const Bus = mongoose.model('Bus', busSchema);
export default Bus;
