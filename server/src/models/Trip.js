import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    tripId: {
      type: String,
      required: [true, 'Trip ID is required'],
      unique: true,
      trim: true,
    },
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: [true, 'Bus reference is required'],
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
      required: [true, 'Route reference is required'],
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Driver user reference is required'],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ['READY', 'ACTIVE', 'COMPLETED'],
        message: '{VALUE} is not a valid trip status',
      },
      default: 'READY',
      index: true,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    progressPercent: {
      type: Number,
      min: [0, 'Progress percentage cannot be less than 0'],
      max: [100, 'Progress percentage cannot exceed 100'],
      default: 0,
    },
    summaryReport: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'trips',
  }
);

// Compound Indexes for fast driver & bus lookup
tripSchema.index({ driverId: 1, status: 1 });
tripSchema.index({ busId: 1, status: 1 });

export const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
