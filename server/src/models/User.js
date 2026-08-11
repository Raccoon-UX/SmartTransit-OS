import mongoose from 'mongoose';

const driverProfileSchema = new mongoose.Schema(
  {
    licenseNumber: { type: String, trim: true },
    badgeId: { type: String, trim: true },
    assignedBusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  },
  { _id: false }
);

const commuterProfileSchema = new mongoose.Schema(
  {
    favorites: [{ type: String, trim: true }],
    passId: { type: String, trim: true },
    preferences: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false, // Never select passwordHash by default
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ['PASSENGER', 'DRIVER', 'ADMIN', 'SOC'],
        message: '{VALUE} is not a valid SmartTransit OS role',
      },
      default: 'PASSENGER',
      index: true,
    },
    driverProfile: {
      type: driverProfileSchema,
      default: () => ({}),
    },
    commuterProfile: {
      type: commuterProfileSchema,
      default: () => ({}),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

export const User = mongoose.model('User', userSchema);
export default User;
