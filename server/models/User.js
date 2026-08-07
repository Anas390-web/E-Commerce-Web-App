import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, 'Please provide username'],
      minlength: [3, 'Please write atleast 3 letters'],
      maxlength: 50,
      unique: true
   },
   email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'Please provide the valid email'
      ],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: [3, 'Please write atleast 3 letters'],
      maxlength: 50
   }
})

// PRE-SAVE PASSWORD HASHING:
UserSchema.pre('save', async function () {
   // DON'T HASH IF PASSWORD IS SAME OR NOT MODIFIED:
   if(!this.isModified('password')) {
      return;
   }
   const salt = await bcrypt.genSalt(10)
   const hashPassword = await bcrypt.hash(this.password, salt)
   this.password = hashPassword;
})

// ATTACHING JWT CREATION FUNCTION TO USER INSTANCE:
UserSchema.methods.createJwt = function () {
   return jwt.sign(
      {userId: this._id, username: this.username},
      process.env.JWT_SECRET_KEY,
      {expiresIn: process.env.JWT_EXPIRY_TIME}
   )
}

// ATTACHING COMPARE PASSWORD FUNCTION TO USER INSTANCE:
UserSchema.methods.comparePassword = async function(userPassword) {
   const isMatched = await bcrypt.compare(userPassword, this.password);
   return isMatched;
}

const User = mongoose.model('User', UserSchema);
export default User;