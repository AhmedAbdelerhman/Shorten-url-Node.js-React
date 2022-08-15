const validUrl = require("valid-url");
const shortId = require("shortid");
const Url = require("../models/Url");
//@description     get all Urls  created by login user
//@route           get /api/url/
//@access          protected by token

exports.getUserUrls = async (req, res) => {
  try {
    const shortLinks = await Url.find({ urlUser: req.user._id });
    res.status(201).json({
      message: "your Links",
      shortLinks,
    });
  } catch (error) {
    return res.status(500).json({ message: "Some error has occurred" + error });
  }
};

// @route     GET /:code
// @desc      Redirect to long/original URL

exports.getLongUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ slug: req.params.code });

    if (url) {
      res.status(201).json({
        message: "urlShorten fetched successfully",
        originUrl: url,
      });
    } else {
      return res.status(404).json({ message: " url Not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Some error has occurred" + error });
  }
};

//@description     Create New url
//@route           POST /api/url/
//@access          Protected by token

exports.createUrl = async (req, res) => {
  let {
    longUrl,
    slugKey,
    androidPrimary,
    androidFallBack,
    iosPrimary,
    iosFallBack,
  } = req.body;


  if (
    !validUrl.isUri(longUrl) ||
    !validUrl.isUri(androidPrimary) ||
    !validUrl.isUri(androidFallBack) ||
    !validUrl.isUri(iosPrimary) ||
    !validUrl.isUri(iosFallBack)
  ) {
    return res
      .status(400)
      .json({ message: "please insert all links a valid Urls" });
  }

  let slug = await Url.findOne({ slug: slugKey });

  if (slug) {
    return res.status(400).json({ message: "please select a anther  key" });
  }
  try {
    if (!slugKey.trim().length) {
      slugKey = shortId.generate();
    }
    const shortUrlResponse = await Url.create({
      slug: slugKey,
      ios: {
        primary: iosPrimary,
        fallback: iosFallBack,
      },
      android: {
        primary: androidPrimary,
        fallback: androidFallBack,
      },
      web: longUrl,
      urlUser: req.user._id,
    });

    if (shortUrlResponse) {
      res.status(201).json({
        message: "urlShorten created successfully",
        shortUrlResponse: shortUrlResponse,
      });
    } else {
      res.status(400).json({ message: "failed to create shortUrl" });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to create shortUrl" + error });
  }
};

//@description     update  a url
//@route           put /api/url/:id
//@access           protected by token
exports.updateUrl = async (req, res) => {
  const slugId = req.params.slug.trim();
  let { longUrl, androidPrimary, androidFallBack, iosPrimary, iosFallBack } =
    req.body;
    if (
      !validUrl.isUri(longUrl) ||
      !validUrl.isUri(androidPrimary) ||
      !validUrl.isUri(androidFallBack) ||
      !validUrl.isUri(iosPrimary) ||
      !validUrl.isUri(iosFallBack)
    ) {
      return res
        .status(400)
        .json({ message: "please insert all links a valid Urls" });
    }

  try {
    const url = await Url.findOne({ slug: slugId });
    if (url.urlUser.toString() === req.user._id.toString()) {
      url.ios = {
        primary: iosPrimary,
        fallback: iosFallBack,
      };
      url.android = {
        primary: androidPrimary,
        fallback: androidFallBack,
      };

      url.web = longUrl;
      const updatedUrl = await url.save();

      if (updatedUrl) {
        res.status(201).json({
          message: "url updated successfully",
          url,
        });
      } else {
        res.status(400).json({ message: "failed to updated url" });
      }
    } else {
      res.status(401).json({
        message: " you are not authorized to updated it ",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "failed " + error });
  }
};
