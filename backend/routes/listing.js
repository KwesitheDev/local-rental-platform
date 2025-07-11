const listingRouter = require("express").Router()
const { deleteListing,
    updateListing,
    getListing,
    getAllListings,
    createListing } = require("../controllers/listingController")
const {requireAuth} = require("../middleware/auth")


router.get("/", getAllListings);
router.get("/:id", getListing);
router.post("/", requireAuth, createListing);
router.put("/:id", requireAuth, updateListing);
router.delete("/:id", requireAuth, deleteListing);

module.exports = router;