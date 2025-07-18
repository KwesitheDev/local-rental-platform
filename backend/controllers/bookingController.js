import Booking from '../models/Booking'
import Listing from '../models/Listing'

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
            totalPrice,
            status: 'pending'
        })

        const savedBooking = await booking.save()
        res.status(201).json(savedBooking)
    } catch (error) {
        return res.status(500).json({error: 'Failed to create booking'})
    }
}


const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id
        const booking = await Booking.findById(bookingId)

        if (!booking) return res.status(404).json({error: 'Booking not found'})
        if (!booking.renter.equals(req.user.id))return res.status(403).json({error: 'Unauthorized Action'})  
        booking.status='cancelled'   
        await booking.save()

        res.json({message: 'Booking cancelled', booking})
    }catch(error){
        res.status(500).json({error: 'Failed to cancel booking'})
    }
}

const getUserBookings = async (req, res) => {
    try {
    const bookings = await Booking.find({ renter: req.user.id }).populate('listing');
        res.json(bookings)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' })
    }
}

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params
        const booking = await Booking.findById(id).populate('listing renter')

        if (!booking) return res.status(404).json({ error: 'Booking not found' })
        res.json(booking)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch booking' })
    }
}


const updateBookingStatus = async (req,res) =>{
    try {
        const {id} = req.params
        const { status } = req.body
        
        if (!['pending', 'confirmed', 'rejected', 'cancelled'].includes(status)) {
            return res.status(400).json({
                error: 'Invalid status value'
            })
        }

        const updated = await Booking.findByIdAndUpdate(id, {status}, {new: true})
        res.json(updated)
    } catch (error) {
        res.status(500).json({
            error:'Failed to update booking status'
        })
    }
}

export default {
    getBookingById,
    createBooking,
    getUserBookings,
    updateBookingStatus,
    cancelBooking
}