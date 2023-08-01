import express from "express";
import ponyData from "../data/ponies.json";
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";

const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;

const historyList: string[] = [];

app.get("/", (req, res) => {
  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
  historyList.push("/");
});

app.get("/creation-time", (req, res) => {
  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
  historyList.push("/creation-time");
});

app.get("/current-time", (req, res) => {
  const dateOfRequestHandling = new Date();

  res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
  historyList.push("/current-time");
});

app.get("/hits", (req, res) => {
  serverHitCount += 1;
  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
  historyList.push("/hits");
});

app.get("/hits-stealth", (req, res) => {
  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
  historyList.push("/hits-stealth");
});

app.get("/ponies", (req, res) => {
  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
  historyList.push("/ponies");
});

app.get("/season-one", (req, res) => {
  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
  });
  historyList.push("/season-one");
});

app.get("/season-one/random", (req, res) => {
  const randomEpisode = pickRandom(seasonOneEpisodes);
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
  historyList.push("/season-one/random");
});

app.get("/hello-world", (req, res) => {
  res.json({
    english: "Hello world!",
    esperanto: "Saluton mondo!",
    hawaiian: "Aloha Honua",
    turkish: "Merhaba Dünya!",
  });
  historyList.push("/hello-world");
});

app.get("/ponies/random", (req, res) => {
  const randomPony = pickRandom(ponyData.members);
  res.json(randomPony);

  historyList.push("/ponies/random");
});

app.get("/history", (req, res) => {
  res.json({ routes: historyList.map((element) => element) });
  historyList.push("/history");
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 5050;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
