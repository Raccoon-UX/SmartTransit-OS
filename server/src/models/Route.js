import mongoose from 'mongoose';

const routeStopSchema = new mongoose.Schema(
  {
    stopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stop',
      default: null,
    },
    stopCode: {
      type: String,
      trim: true,
    },
    stopName: {
      type: String,
      required: [true, 'Stop name is required in sequence'],
      trim: true,
    },
    sequence: {
      type: Number,
      required: [true, 'Stop sequence index is required'],
      min: 1,
    },
    estimatedOffsetMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const routeSchema = new mongoose.Schema(
  {
    routeCode: {
      type: String,
      required: [true, 'Route code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    routeName: {
      type: String,
      required: [true, 'Route name is required'],
      trim: true,
    },
    origin: {
      type: String,
      required: [true, 'Origin terminal is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination terminal is required'],
      trim: true,
    },
    color: {
      type: String,
      default: '#0c87eb',
      trim: true,
    },
    stopsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    fareRange: {
      type: String,
      default: '₹15 – ₹45',
      trim: true,
    },
    frequency: {
      type: String,
      default: 'Every 8 mins',
      trim: true,
    },
    operatingHours: {
      type: String,
      default: '05:30 AM – 11:45 PM',
      trim: true,
    },
    stops: {
      type: [routeStopSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'routes',
  }
);

export const Route = mongoose.model('Route', routeSchema);
export default Route;
