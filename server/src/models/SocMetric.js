import mongoose from 'mongoose';

const serverNodeSchema = new mongoose.Schema(
  {
    nodeId: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, default: 'HEALTHY' },
    cpuPercent: { type: Number, default: 40 },
    memoryPercent: { type: Number, default: 50 },
  },
  { _id: false }
);

const socMetricSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
    globalStatus: {
      type: String,
      enum: ['OPERATIONAL', 'WARNING', 'DEGRADED', 'CRITICAL'],
      default: 'OPERATIONAL',
    },
    apiLatencyMs: {
      type: Number,
      default: 20,
      min: 0,
    },
    activeBusesCount: {
      type: Number,
      default: 4,
      min: 0,
    },
    cpuUtilizationPercent: {
      type: Number,
      default: 45,
      min: 0,
      max: 100,
    },
    serverNodes: {
      type: [serverNodeSchema],
      default: [],
    },
    backpressureState: {
      type: String,
      enum: ['NORMAL', 'WARNING', 'CRITICAL'],
      default: 'NORMAL',
    },
  },
  {
    timestamps: false,
    collection: 'soc_metrics',
  }
);

// Indexes
socMetricSchema.index({ timestamp: -1 });

export const SocMetric = mongoose.model('SocMetric', socMetricSchema);
export default SocMetric;
