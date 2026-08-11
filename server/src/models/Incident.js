import mongoose from 'mongoose';

const incidentTimelineEventSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['OPEN', 'INVESTIGATING', 'RESOLVED'],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { _id: false }
);

const incidentSchema = new mongoose.Schema(
  {
    incidentCode: {
      type: String,
      required: [true, 'Incident code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: [true, 'Incident title is required'],
      trim: true,
    },
    severity: {
      type: String,
      enum: {
        values: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        message: '{VALUE} is not a valid severity level',
      },
      default: 'MEDIUM',
      index: true,
    },
    type: {
      type: String,
      default: 'MECHANICAL',
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Incident location is required'],
      trim: true,
    },
    busNumber: {
      type: String,
      trim: true,
      default: null,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ['OPEN', 'INVESTIGATING', 'RESOLVED'],
        message: '{VALUE} is not a valid incident status',
      },
      default: 'OPEN',
      index: true,
    },
    timeline: {
      type: [incidentTimelineEventSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'incidents',
  }
);

// Compound & Recency Indexes
incidentSchema.index({ status: 1, severity: 1 });
incidentSchema.index({ createdAt: -1 });

export const Incident = mongoose.model('Incident', incidentSchema);
export default Incident;
