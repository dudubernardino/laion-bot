require("dotenv").config();
const Twit = require("twit");

const Bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
});

console.log("Este bot está rodando...");

const BotInit = () => {
  let query = {
    q: "Laion",
    result_type: "recent"
  };

  const BotGotLatestTweet = (err, data, response) => {
    if (err) {
      console.log("Bot could not find latest tweet, : " + err);
    } else {
      data.statuses.map(tweet => {
        const id = {
          id: tweet.id_str
        };

        try {
          Bot.post("statuses/retweet/:id", id, (err, response) => {
            if (err) {
              console.log("Bot could not retweet, : " + err);
            } else {
              console.log("Bot retweeted : " + id.id);
            }
          });
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  Bot.get("search/tweets", query, BotGotLatestTweet);
};

setInterval(() => {
  BotInit();
  console.log("Rodou");
}, 30 * 60 * 1000);
