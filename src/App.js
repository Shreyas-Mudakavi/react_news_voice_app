import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import wordsToNumbers from "words-to-numbers";

import useStyles from "./styles.js";
const App = () => {
  const classes = useStyles();

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_BUTTON_API_KEY,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          const article = articles[parsedNumber];

          if (article) {
            window.open(article.url, "_blank"); // this will open the link in a new tab
            alanBtn().playCommand("Opening....");
          } else if (parsedNumber > 20) {
            alanBtn().playText("Please try that again!");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://media.gettyimages.com/photos/digital-marketing-picture-id1222811180?k=20&m=1222811180&s=612x612&w=0&h=pbx0i1gHDYn1vgQlCaFcOHP2GW3GpB-LCSAhx7JUZwo="
          alt=""
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
