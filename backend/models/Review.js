const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    SpeechRecognitionAlternative: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
});

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });
  
  module.exports = mongoose.model('Review', reviewSchema);