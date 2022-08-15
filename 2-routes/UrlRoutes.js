const express = require("express");

const UrlRouter = require("../1-controllers/UrlController");

const isAuth = require("../isAuth/isAuth");

const router = express.Router();

router.get("/", isAuth, UrlRouter.getUserProfile);

router.post("/", isAuth, UrlRouter.createUrl);
router.put("/:id", isAuth, UrlRouter.updateUrl);

module.exports = router;
