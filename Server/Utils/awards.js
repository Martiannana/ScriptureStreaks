/**
 * Evaluate whether a user meets the award's trigger condition.
 * @param {Object} user - The user document.
 * @param {Object} task - The task document (optional).
 * @returns {Boolean} - True if the condition is met, false otherwise.
 */
export const evaluateTriggerCondition = (trigger, user) => {
    switch (trigger.type) {
      case 'chapter_completion':
        return user.chaptersCompleted.length === trigger.condition.chaptersCompleted;
      case 'login_streak':
        return user.streak === trigger.condition.streak;
      case 'verse_memorization':
        return user.versesCompleted.length === trigger.condition.versesCompleted;
      case 'book_completion':
        return user.booksCompleted.length === trigger.condition.booksCompleted;
      case 'share_verse':
        return user.versesShared === trigger.condition.versesShared;
      default:
        throw new Error('Unknown trigger type');
    }
  };