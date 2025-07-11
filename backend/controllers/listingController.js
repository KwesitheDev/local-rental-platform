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
//Update a listing
//Delete a listing