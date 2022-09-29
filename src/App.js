import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";

import useStyles from "./styles.js";
const App = () => {
  const classes = useStyles();

  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: "5c284b31f31d9328fc2ca2b63eedc90f2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
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
      <NewsCards articles={newsArticles} />
    </div>
  );
};

export default App;
