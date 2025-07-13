const Booking = require('../models/Booking')
const Listing = require('../models/Listing')

const createBooking = async (req, res) => {
    try {
        const {listing, startDate, endDate, totalPrice} = req.body
        const renter = req.user.id

        if (!listing || !startDate || !endDate || !totalPrice) {
            return res.status(400).json({error: 'Missing required fields'})
        }

        const booking = new Booking({
            listing,
            renter,
            startDate,
            endDate,
            totalPrice
        })

        const savedBooking = await booking.save()
        res.status(201).json(savedBooking)
    } catch (error) {
        return res.status(500).json({error: 'Failed to create booking'})
    }
}
