// import schedule from 'node-schedule'
// import Notification from '../Models/Notification.js'
// import User from '../Models/userModel.js'

// const checkOverdueTasks = schedule.scheduleJob('* * * * *', async () => {
//   try {
//     const now = new Date()

//     // Find userIds of tasks that are overdue
//     const overdueTasks = await Task.find(
//       { dueDate: { $lt: now }, status: 'pending' },
//       { userId: 1 }
//     )

//     // Extract unique user IDs from overdue tasks
//     const userIds = [
//       ...new Set(overdueTasks.map(task => task.userId.toString()))
//     ]

//     // Update tasks to 'overdue' status
//     await Task.updateMany(
//       { dueDate: { $lt: now }, status: 'pending' },
//       { status: 'overdue' }
//     )

//     // Reset taskCompletionStreak for affected users
//     await User.updateMany(
//       { _id: { $in: userIds } },
//       { taskCompletionStreak: 0 }
//     )
//   } catch (error) {
//     console.error('Error checking overdue tasks:', error)
//   }
// })

// const getDate = date => {
//   const newDate = new Date(date)
//   return newDate.toLocaleDateString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true
//   })
// }

// const dueDateNotification = schedule.scheduleJob('0 * * * *', async () => {
//   try {
//     const now = new Date()
//     const upcomingPeriod = 24 * 60 * 60 * 1000
//     const thresholdTime = new Date(now.getTime() + upcomingPeriod)

//     const tasks = await Task.find({
//       dueDate: { $gte: now, $lte: thresholdTime },
//       status: 'pending'
//     })

//     for (const task of tasks) {
//       const existingNotification = await Notification.findOne({
//         userId: task.userId,
//         taskId: task._id,
//         type: 'Due Date Reminder'
//       })

//       if (!existingNotification) {
//         const notification = new Notification({
//           userId: task.userId,
//           taskId: task._id,
//           title: 'Task Due Reminder',
//           message: `Your task "${task.title}" is due on ${getDate(
//             task.dueDate
//           )}`,
//           type: 'Due Date Reminder',
//           scheduledFor: task.dueDate
//         })

//         await notification.save()
//         console.log(`Notification sent for task "${task.title}"`)
//       }
//     }
//   } catch (err) {
//     console.error('Error sending due task notifications:', err)
//   }
// })

// export default { checkOverdueTasks, dueDateNotification }
