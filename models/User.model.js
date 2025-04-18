const { Schema, model } = require("mongoose");

const CourseProgressSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  courseTitle: { type: String },
  completedLessons: [
    {
      lessonIndex: Number,
      isLessonCompleted: { type: Boolean, default: false },
      sublessons: [
        {
          sublessonIndex: Number,
          isCompleted: { type: Boolean, default: true } 
        }
      ],
      percentage: { type: Number, default: 0 }
    }
  ],
  completedLessonCount: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false }
}, { _id: false });


const userSchema = new Schema({
  firstName:   { type: String},
  lastName:    { type: String},
  username:    { type: String, required: true, unique: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String },
  socialId:    {type: String,required: [false, 'Social media ID required'],unique: true,sparse: true  }, // For Google sign-in
  enrolledCourses: [{
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    enrolledAt: { type: Date, default: Date.now }
  }],
  courseProgress:  {type: [CourseProgressSchema], default: [] },
  dob:         { type: Date },
  gender:      { type: String, enum: ["Male", "Female", "Others"] },
  isApproved:  { type: Boolean, default: false }, // Admin approval required
  role:        { type: String, enum: ["Mentor", "Student"], default: "Student" },
  token:       { type: String }
}, { timestamps: true });

module.exports = model("User", userSchema);
