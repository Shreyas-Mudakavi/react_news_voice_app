import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import React, { createRef, useEffect, useState } from "react";

import useStyles from "./styles.js";

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  i,
  activeArticle,
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50); // this will make sure that to get at the top of the card and also to bring it up above

  useEffect(() => {
    setElRefs(
      (refs) =>
        Array(20)
          .fill()
          .map((_, j) => refs[j] || createRef()) // _ means as we are not using the first argument here and size is 20 as the number of cards shown will be 20
    );
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);

  return (
    <Card
      ref={elRefs[i]}
      className={classNames(
        classes.card,
        activeArticle === i ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className={classes.media}
          image={
            urlToImage ||
            "https://ou.ac.lk/wp-content/uploads/2021/02/News-2.jpg"
          }
        />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>

        <Typography className={classes.title} gutterBottom variant="h5">
          {title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Typography variant="h5" color="textPrimary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
