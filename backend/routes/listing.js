const listingRouter = require("express").Router()
const { deleteListing,
    updateListing,
    getListing,
    getAllListings,
    createListing } = require("../controllers/listingController")
const {requireAuth} = require("../middleware/auth")


listingRouter.get("/", getAllListings);
listingRouter.get("/:id", getListing);
listingRouter.post("/", requireAuth, createListing);
listingRouter.put("/:id", requireAuth, updateListing);
listingRouter.delete("/:id", requireAuth, deleteListing);

module.exports = listingRouter;