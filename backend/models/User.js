import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["director", "teacher", "student"],
      default: "student",
    },

    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      default: null,
    },

    college: {
      type: String,
      default: "",
      trim: true,
    },

    course: {
      type: String,
      default: "",
      trim: true,
    },

    semester: {
      type: String,
      default: "",
      trim: true,
    },

    about: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },
    rollNumber: {
      type: String,
      default: "",
      trim: true,
    },

    className: {
      type: String,
      default: "",
      trim: true,
    },

    section: {
      type: String,
      default: "",
      trim: true,
    },

    parentName: {
      type: String,
      default: "",
      trim: true,
    },

    parentPhone: {
      type: String,
      default: "",
      trim: true,
    },
    qualification: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    studyStreak: {
      type: Number,
      default: 0,
    },

    studyHours: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

export default User;
