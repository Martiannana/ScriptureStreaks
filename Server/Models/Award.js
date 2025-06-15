import { Schema, model } from 'mongoose';
import User from './userModel.js';
import { evaluateTriggerCondition } from '../Utils/awards.js';

const AwardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    trigger: {
      type: {
        type: String,
        required: true,
        enum: [
          'chapter_completion',
          'book_completion',
          'verse_memorization',
          'login_streak',
          'share_verse'
        ],
      },
      condition: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    badge: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Assign awards to a user based on all available awards.
 * @param {String} userId - The user ID.
 * @param {String|null} taskId - The task ID (optional).
 * @returns {Promise<Array>} - List of assigned Award IDs.
 */
AwardSchema.statics.assignToUser = async function (userId) {
  console.log("Checking")
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const awards = await this.find(); 
  const assignedAwards = [];

  for (const award of awards) {
    if (user.awards.includes(award._id)) continue;

    const meetsCondition = evaluateTriggerCondition(award.trigger, user);
    if (meetsCondition) {
      console.log("Met condition")
      user.awards.push(award._id);
      assignedAwards.push(award._id);
    }
  }

  await user.save();
  return assignedAwards;
};


export default model('Award', AwardSchema);
