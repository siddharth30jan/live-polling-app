const route = require("express").Router();
const Votes = require("../models/votes");
var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "921855",
  key: "4b5c76ddf52f6399d215",
  secret: "9ca001e03a60871548cf",
  cluster: "ap2",
  encrypted: true
});

route.get("/", (req, res) => {
  Votes.find({})
    .then(data => {
      pusher.trigger("os", "polling", {
        data: data
      });
      res.json({ mes: "Succesfully triggered!" });
    })
    .catch(e => res.send(e));
});

route.post("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const newVote = {
    os: req.body.os,
    count: 1
  };

  //Saving it to db
  new Votes(newVote)
    .save()
    .then(data => res.send(`Succesfully added to databse`))
    .catch(e => res.send(`Theres an error - ${e}`));
});

module.exports = route;
