var express = require("express");
var router = express.Router();
const Place = require("../models/places");

router.post("/places", (req, res) => {
  Place.findOne({
    name: req.body.name,
  }).then((data) => {
    if (!data) {
      const newPlace = new Place({
        nickname: req.body.nickname,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
      newPlace.save().then((newDoc) => {
        res.json({ result: true, place: newDoc });
      });
    } else {
      res.json({ result: false, error: "Place already exist" });
    }
  });
});

router.get("/places/:nickname", (req, res) => {
  //   const nickname =
  //     req.params.nickname.charAt(0).toUpperCase() + req.params.nickname.slice(1);
  Place.find({ nickname: req.params.nickname }).then((data) => {
    console.log(data);
    if (data) {
      res.json({ result: true, places: data });
    } else {
      res.json({ result: false, error: "No places for this user" });
    }
  });
});

router.delete("/places", (req, res) => {
  Place.deleteOne({ nickname: req.body.nickname, name: req.body.name }).then(
    (data) => {
      if (data.deletedCount > 0) {
        res.json({ result: true });
      } else {
        res.json({ result: false });
      }
    }
  );
});

module.exports = router;
