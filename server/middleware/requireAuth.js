import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const requireAuth = async (req, res, next) => {
  // checking if user is authenticated
  const {authorization} = req.headers

  if(!authorization) {
    return res.status(401).json({error: 'Authorization token is required.'})
  }
  const token = authorization.split(' ')[1]

  try {
    // Verify the JWT token and attach user details to the request
    const {_id} = jwt.verify(token, process.env.SECRET)
    
    req.user = await User.findOne({_id}).select('_id')
    next()
  } catch (error){
    console.log(error)
    res.status(401).json({error: 'Request not confirmed.'})
  }
}

export default requireAuth