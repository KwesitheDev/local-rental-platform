import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    title:{ type: String, required: true },
    description: { type: String, },
    type:{ type: String,enum: ['housing', 'equipment', 'vehicle'] , required: true },
    pricePerDay: { type: Number, required: true },
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
    category: { type: String },
    location: { type: String },
    images: { type: [String] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['available', 'booked', 'unlisted'], default: 'available' }

},{
    timestamps: true
})

listingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Listing', listingSchema)