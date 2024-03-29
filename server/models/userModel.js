import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})


// static signup
userSchema.statics.signup = async function (email, password){

  // Validate input fields
  if(!email || !password){
    throw Error('All fields are required.')
  }

  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }
  if(!validator.isStrongPassword(password)){
    throw Error('Password is too weak')
  }

  const exists = await this.findOne({email})
  if(exists){
    throw Error('Email already taken.')
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({email, password:hash})
  return user
}


// static login
userSchema.statics.login = async function (email, password){
  if(!email || !password){
    throw Error('All fields are required')
  }
  const user = await this.findOne({email})
  if(!user){
    throw Error('Email is incorrect')
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    throw Error('Password is incorrect')
  }
  return user
}


export default mongoose.model('User', userSchema)