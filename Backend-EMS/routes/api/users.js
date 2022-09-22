const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const verifyRoles = require("../../middleware/verifyRoles");
router
  .route("/")
  .get(usersController.getAllUsers)
  .post(verifyRoles(["Admin"]), usersController.createNewUser)
  .delete(verifyRoles(["Admin"]), usersController.deleteUser)
  .put(verifyRoles(["Admin"]), usersController.updateUser);

// .post(verifyRoles(ROLES_LIST.Admin), usersController.createNewUser)
// .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route("/:id").get(verifyRoles(["Admin"]), usersController.getUser);

module.exports = router;
