import express from "express";
import mongoose from "mongoose";
import Cards from "./models/dbCards.js";
import Cors from "cors";

//App COnfig
const app = express();
const port = process.env.PORT || 8001;
const connetion_url =
  "mongodb://127.0.0.1:27017/tinderclonedb?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Configuration
mongoose.connect(connetion_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the backend of tinder clone mern");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, (req, res) => {
  console.log(`Listening on localhost: ${port}`);
});
