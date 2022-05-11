// user schema

const mongoose = require('mongoose');

const geocoder = require('../../utils/geocoder');
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, ' Name must be atleast 3 characters'],
  },
  userName: {
    type: String,
    required: true,
    minlength: [3, 'User Name must be atleast 3 characters'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  geolocation: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  tweet: {
    type: String,
    required: true,
    minlength: [5, 'A tweet Must have a minimum of 5 characters']
  },
  thumbnailImage: { 
    type: String, 
    required: true
   },
   date: {
    type: Date,
    default: Date.now
  },
},
 
);
// Geocode & create location
UserSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.geolocation = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});

// export model user with UserSchema
module.exports = mongoose.model('user', UserSchema);
