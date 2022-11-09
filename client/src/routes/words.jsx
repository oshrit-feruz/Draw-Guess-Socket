import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import randomWords from "random-words";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function Words() {
  const [level, setLevel] = useState(null);
  const [words, setWords] = useState([]);
  useEffect(() => {
    if (level == "easy") {
      let wordsList = randomWords({ exactly: 30, maxLength: 4, minLength: 3 });
      setWords(wordsList);
    } else if (level == "medium") {
      let wordsList = randomWords({ exactly: 30, maxLength: 6, minLength: 5 });
      setWords(wordsList);
    } else {
      let wordsList = randomWords({ exactly: 30, minLength: 6 });
      setWords(wordsList);
      console.log(wordsList);
    }
  }, [level]);

  const word = words.map((singleWord) => {
    let chossenLevel=level
    if (
      (level === "easy" && singleWord.length < 5) ||
      (level === "medium" && singleWord.length == 5) ||
      (level === "hard" && singleWord.length > 5)
    ) {
      console.log(chossenLevel);
      return (
        <div className="wordsButton">
          <Link
            to="/drawing"
            state={{
              level: chossenLevel,
            }}
          >
            <Button variant="outlined">{singleWord}</Button>
          </Link>
        </div>
      );
    }
  });

  if (level == null) {
    return (
      <>
        <h1>Choose words level</h1>
        <Box
          className="level"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
          }}
        >
          <ImageButton
            onClick={() => setLevel("easy")}
            focusRipple
            key="easy"
            style={{
              width: "40%",
            }}
          >
            <ImageSrc style={{ backgroundColor: "#46bad4", opacity: "0.1" }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                Easy (3-4 letters)
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </Box>
        <Box
          className="level"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
          }}
        >
          <ImageButton
            onClick={() => setLevel("medium")}
            focusRipple
            key="medium"
            style={{
              width: "40%",
            }}
          >
            <ImageSrc style={{ backgroundColor: "#46bad4", opacity: "0.4" }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                Medium (5 letters)
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </Box>

        <Box
          className="level"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
          }}
        >
          <ImageButton
            onClick={() => setLevel("hard")}
            focusRipple
            key="hard"
            style={{
              width: "40%",
            }}
          >
            <ImageSrc style={{ backgroundColor: "#46bad4", opacity: "0.8" }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                Hard (6 letters)
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <h1>Choose the word you want to draw</h1>
        {word}
      </>
    );
  }
}
