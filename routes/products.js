// Require dependencies
const   express = require("express"),
        router = express.Router(),
        product_controller = require("../controllers/products");

// NEW ROUTE
router.get("/new", product_controller.new);

router.post("/new", product_controller.new_post);

// Export Router
module.exports = router;