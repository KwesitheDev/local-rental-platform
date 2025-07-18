import User from '../models/User.js'

// Get current user's profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}

//search user
const getUser = async (req, res) => {
  try {
    const name = req.params.name
    const user = await User.findOne({ name })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    )
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' })
  }
}

// Delete account
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
}

export default { getProfile, updateProfile, deleteUser , getUser}



