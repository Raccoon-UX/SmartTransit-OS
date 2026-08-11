import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    role: {
      type: String,
      default: 'ANONYMOUS',
      trim: true,
    },
    action: {
      type: String,
      enum: [
        'LOGIN',
        'LOGOUT',
        'DISPATCH_FLEET',
        'UPDATE_BUS',
        'RESOLVE_INCIDENT',
        'TRIGGER_SOS',
        'CREATE_ALERT',
        'UPDATE_ROUTE',
      ],
      required: [true, 'Audit action is required'],
    },
    targetResource: {
      type: String,
      trim: true,
      default: null,
    },
    targetResourceId: {
      type: String,
      trim: true,
      default: null,
    },
    ipAddress: {
      type: String,
      trim: true,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      // Security enforcement: sanitize before saving to prevent password/token leakage
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    collection: 'audit_logs',
  }
);

// Pre-save safety sanitizer: strip any accidental secret fields from metadata
auditLogSchema.pre('save', function (next) {
  if (this.metadata && typeof this.metadata === 'object') {
    const sanitized = { ...this.metadata };
    delete sanitized.password;
    delete sanitized.passwordHash;
    delete sanitized.token;
    delete sanitized.refreshToken;
    delete sanitized.secret;
    this.metadata = sanitized;
  }
  next();
});

// Indexes
auditLogSchema.index({ actorId: 1, action: 1, timestamp: -1 });
auditLogSchema.index({ timestamp: -1 });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
