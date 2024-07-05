const express  = require("express");
const router = express.Router();
const contactFunctions = require("../Controllers/contactController");
const imageUpload = require("../Middlewares/uploadImage");

router.route("/")
    .get(contactFunctions.displayRecords);

router.route("/add")
    .get(contactFunctions.displayForm)
    .post(imageUpload , contactFunctions.addContact);

router.route("/edit/:id")
    .get(contactFunctions.editContact);

router.route("/update/:id")
    .post(imageUpload , contactFunctions.updateContact);

router.route("/delete/:id")
    .get(contactFunctions.deleteContact);


module.exports = router;
