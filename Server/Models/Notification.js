import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  taskId: {
    type: Schema.Types.ObjectId,
    ref: "Task", 
    required: false,
  },
  title: {
    type: String,
    required: true, 
  },
  message: {
    type: String,
    required: true, 
  },
  type: {
    type: String,
    enum: [
      "Due Date Reminder",
      "Progress Check-in",
      "Missed Deadline Alert",
      "Motivational Nudge",
      "Daily Overview",
      "Completion Reward",
    ],
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false, 
  },
  sentAt: {
    type: Date,
    default: Date.now, // Timestamp of when the notification was sent
  },
  scheduledFor: {
    type: Date, // Timestamp for scheduled notifications (e.g., due date reminders)
    required: false,
  },
});

export default model("Notification", NotificationSchema);
