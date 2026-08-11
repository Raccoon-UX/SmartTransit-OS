import mongoose from 'mongoose';

const aiInsightSchema = new mongoose.Schema(
  {
    modelType: {
      type: String,
      enum: {
        values: ['ETA', 'DEMAND', 'OCCUPANCY', 'ANOMALY'],
        message: '{VALUE} is not a valid AI model type',
      },
      required: [true, 'Model type is required'],
    },
    entityType: {
      type: String,
      enum: ['BUS', 'ROUTE', 'TRIP', 'SYSTEM'],
      required: [true, 'Entity type is required'],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Target entity ObjectId is required'],
    },
    predictionScore: {
      type: Number,
      default: 0,
    },
    confidencePercent: {
      type: Number,
      min: 0,
      max: 100,
      default: 90,
    },
    recommendationText: {
      type: String,
      required: [true, 'Recommendation text is required'],
      trim: true,
    },
    factors: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'ai_insights',
  }
);

// Indexes
aiInsightSchema.index({ entityType: 1, entityId: 1 });
aiInsightSchema.index({ modelType: 1, createdAt: -1 });

export const AiInsight = mongoose.model('AiInsight', aiInsightSchema);
export default AiInsight;
