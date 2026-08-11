import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    alertId: {
      type: String,
      required: [true, 'Alert ID is required'],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Alert title is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Alert message is required'],
      trim: true,
    },
    severity: {
      type: String,
      enum: ['INFO', 'WARNING', 'CRITICAL'],
      default: 'INFO',
    },
    category: {
      type: String,
      default: 'TRANSIT_ADVISORY',
      trim: true,
    },
    affectedRouteCode: {
      type: String,
      trim: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'alerts',
  }
);

// Compound & Active sorting index
alertSchema.index({ isActive: 1, createdAt: -1 });

export const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
