const express = require("express");

const UrlRouter = require("../1-controllers/UrlController");

const isAuth = require("../isAuth/isAuth");

const router = express.Router();
router.get("/", isAuth, UrlRouter.getUserUrls);
router.get("/:slug",  UrlRouter.getLongUrl);


router.post("/", isAuth, UrlRouter.createUrl);
router.put("/:slug", isAuth, UrlRouter.updateUrl);

module.exports = router;
