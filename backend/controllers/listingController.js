const Listing = require("../models/listing")

//create listing
const createListing = async (req, res) => {
    try {
        const newListing = new Listing(req.body)
        newListing.owner = req.user.id
        const savedListing = await newListing.save()
        res.status(201).json(savedListing)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create listing' })
    }
}

//Get all listing (with optional filters )
const getAllListings = async (req, res) => {
    try {
        const filters = req.query || {}
        const listings = await Listing.find(filters).populate('owner location category')
        res.json(listings)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch listings' })
    }
}

//get a single listing
const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('owner location category')
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' })
        }
        res.json(listing)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch listing' })
    }
}

//Update a listing

const updateListing = async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedListing) {
            return res.status(404).json({ error: 'Listing not found' })
        }
        res.json(updatedListing)
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation error' })
        } else {
            res.status(500).json({ error: 'Failed to update listing' })
        }
    }
}

//Delete a listing
const deleteListing = async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id)
        if (!deletedListing) {
            return res.status(404).json({error: 'Listing not found'})
            
        }
        res.json({message: 'Listing deleted successfully'})
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete listing'})
    }
}