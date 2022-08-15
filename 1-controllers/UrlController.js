const validUrl = require("valid-url");
const shortId = require("shortid");
const Url = require("../models/Url");
//@description     get all Urls  created by login user
//@route           get /api/url/
//@access          protected by token

exports.getUserProfile = async (req, res) => {
  const shortLinks = await Url.find({ urlUser: req.user._id });
  res.send({ message: "your Links", shortLinks });
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
    longUrl.trim().length ||
    androidPrimary.trim().length ||
    androidFallBack.trim().length ||
    iosPrimary.trim().length ||
    iosFallBack.trim().length
  ) {
    res.status(400).json({ message: "some data missed" });
    return;
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ message: "Invalid Url" });
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
    console.log(req.user._id);

    if (shortUrlResponse) {
      res.status(201).json({
        message: "urlShorten created successfully",
        shortUrlResponse: shortUrlResponse,
      });
    } else {
      res.status(400).json({ message: "failed to create shortUrl" });
    }
  } catch (error) {
    res.status(400).json({ message: "failed to create Category" + error });
  }
};

//@description     update  a url
//@route           put /api/url/:id
//@access           protected by token
exports.updateUrl = async (req, res) => {
  const urlId = req.params.id.trim();
  let {
    longUrl,
    androidPrimary,
    androidFallBack,
    iosPrimary,
    iosFallBack,
  } = req.body;
  if (
    longUrl.trim().length ||
    androidPrimary.trim().length ||
    androidFallBack.trim().length ||
    iosPrimary.trim().length ||
    iosFallBack.trim().length
  ) {
    res.status(400).json({ message: "some data missed" });
    return;
  }
  try {
      const url = await Url.findOne({ _id: urlId });
      if (url.urlUser.toString() === req.user._id.toString()) {
        url.ios= {
          primary: iosPrimary,
          fallback: iosFallBack,
        }
        url.android= {
          primary: androidPrimary,
          fallback: androidFallBack,
        }

        url.web=longUrl
        const updatedUrl = await url.save();


        if (updatedUrl) {
          res.status(201).json({
            message: "url updated successfully",
            url
          });
        } else {
          res.status(400).json({ message: "failed to updated url" });
        }
      } else {
        res.status(401).json({
          message: " you are not authorized to updated it ",
          movie: movie,
        });
      }
  
  } catch (error) {
    res.status(400).json({ message: "Bad Request" + error });
  }
};
