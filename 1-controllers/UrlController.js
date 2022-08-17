const validUrl = require("valid-url");
const shortId = require("shortid");
const Url = require("../models/Url");
//@description     get all Urls  created by login user
//@route           get /shortlinks
//@access          protected by token

exports.getUserUrls = async (req, res) => {
  try {
    const shortLinks = await Url.find({ urlUser: req.user._id });
    res.status(200).json({
      message: "your Links",
      shortLinks,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed",message: "Some error has occurred" + error });
  }
};

// @route     GET /:slug
// @desc      Redirect to long/original URL

exports.getLongUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ slug: req.params.slug });

    if (url) {
      res.status(201).json({
        message: "original fetched successfully",
        originUrl: url,
      });
    } else {
      return res.status(404).json({ status: "failed",message: " url Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some error has occurred" + error });
  }
};

//@description     Create New url
//@route           POST /shortlinks
//@access          Protected by token

exports.createUrl = async (req, res) => {
  let {
    longUrl,
    slug,
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
      .json({status: "failed", message: "please insert all links a valid Urls" });
  }

  let slugKey = await Url.findOne({ slug: slug });

  if (slugKey) {
    return res.status(400).json({ status: "failed",message: "please select a anther  slug" });
  }
  try {
    if (!(slug?.trim().length)) {
      slug = shortId.generate();
    }
    const shortUrlResponse = await Url.create({
      slug: slug,
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
        status: "successful",
        slug: "s5G1f3",
        message: "created successfully",
        slug: shortUrlResponse.slug,
      });
    } else {
      res.status(400).json({  status: "failed",
      message: "not found"});
    }
  } catch (error) {
    res.status(500).json({ status: "failed",message: "failed to create shortUrl" + error });
  }
};

//@description     update  a url
//@route           put /shortlinks/:id
//@access           protected by token
exports.updateUrl = async (req, res) => {
  const slugId = req.params.slug?.trim();
  let {
    longUrl,
    androidPrimary,
    androidFallBack,
    iosPrimary,
    iosFallBack,
    slug,
  } = req.body;
  if (slug) {
    return res.status(400).json({status: "failed", message: "can't update slug" });
  }
  if (
    !validUrl.isUri(longUrl) ||
    !validUrl.isUri(androidPrimary) ||
    !validUrl.isUri(androidFallBack) ||
    !validUrl.isUri(iosPrimary) ||
    !validUrl.isUri(iosFallBack)
  ) {
    return res
      .status(400)
      .json({status: "failed", message: "please insert all links a valid Urls" });
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
          status: "successful",
          message: "updated successfully",
        });
      } else {
        res.status(400).json({ status: "failed",message: "failed to updated url" });
      }
    } else {
      res.status(401).json({
        status: "failed",message: " you are not authorized to updated it ",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "failed " + error });
  }
};
