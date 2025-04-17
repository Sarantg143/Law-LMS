const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName:   { type: String},
  lastName:    { type: String},
  username:    { type: String, required: true, unique: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String },
  socialId:    {type: String,required: [false, 'Social media ID required'],unique: true,sparse: true  }, // For Google sign-in
  courseProgress: [{ type: Schema.Types.ObjectId, ref: "CourseProgress" }],
  dob:         { type: Date },
  gender:      { type: String, enum: ["Male", "Female", "Others"] },
  isApproved:  { type: Boolean, default: false }, // Admin approval required
  role:        { type: String, enum: ["Mentor", "Student"], default: "Student" },
  token:       { type: String }
}, { timestamps: true });

module.exports = model("User", userSchema);
