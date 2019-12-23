const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://sid30jan:microsoft8*@cluster0-rxld2.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB Connected!"))
  .catch(e => console.log(e));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/poll", require("./routes/poll"));

app.listen(3005, () => {
  console.log(`Server up and running on port 3005`);
});
