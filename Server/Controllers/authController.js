import User from '../Models/userModel.js'
import { generateToken } from '../Utils/auth.js'
import Award from '../Models/Award.js'

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      throw new Error('All fields are required')

    const user = await User.create({ name,
       email, password })
    if (!user) throw new Error('User creation error')

    res.status(201).json({ message: 'User created successfully, login' })
  } catch (error) {
    console.log({error})
    res.status(400).json({ error: error.message })
  }
}

const updateUserStreakAndAwards = async user => {
  const now = new Date()
  console.log({now})
  const lastSignInDate = new Date(user.lastSignIn)
  const oneDay = 24 * 60 * 60 * 1000

  if (now.toDateString() !== lastSignInDate.toDateString()) {
    if (now - lastSignInDate <= oneDay) {
      user.streak += 1
    } else {
      user.streak = 1
    }
  }

  user.lastSignIn = now
  await user.save()

  await Award.assignToUser(user._id)
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) throw new Error('User not found')

    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new Error('Invalid credentials')

    await updateUserStreakAndAwards(user)

    const token = generateToken(user)
    user.password = undefined // Remove sensitive data
    res.status(200).json({ user, token })
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: error.message })
  }
}

const isAuth = async (req, res) => {
  try {
    const { userId } = req
    if (!userId) throw new Error('Unauthorized')

    const user = await User.findById(userId)
    if (!user) throw new Error('User not found')

    await updateUserStreakAndAwards(user)

    user.password = undefined
    user.secret = undefined

    res.json({ message: 'Authenticated', user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

const updateProgress = async (req, res) => {
  try {
    const { userId } = req
    const { id, type } = req.body
    if (!userId) throw new Error('Unauthorized')

    if (!id || !type) throw new Error('Unacceptable Request')

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')

    if (type === 'chapter' && !user.chaptersCompleted.includes(id)) {
      user.chaptersCompleted.push(id)
    } else if (type === 'book' && !user.booksCompleted.includes(id)) {
      user.booksCompleted.push(id)
    } else if (type === 'verse' && !user.versesCompleted.includes(id)) {
      user.versesCompleted.push(id)
    }

    await user.save()

    await Award.assignToUser(user._id)

    return res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(403).json({ error: err.message })
  }
}

const shareVerse = async (req, res) => {
  try {
    const { userId } = req
    const { receiver } = req.params;
    console.log({receiver})
    if (!userId) throw new Error('Unauthorized')

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')

    //TODO: Implement a way of sharing verses, either via notifications or email

    user.versesShared += 1

    await user.save()

    await Award.assignToUser(user._id)

    return res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(403).json({ error: err.message })
  }
}

export { register, login, isAuth, updateProgress, shareVerse }
