import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Words from "./words";
export default function Guessing(props) {
  const [word, setWord] = useState([]);
  const [nextGame, setNextGame] = useState(null);
  const [wordLength, setWordLength] = useState(4);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(word);

    console.log(Object.values(data)[0]);
    if (Object.values(data) == word) {
      if (wordLength < 5) {
        props.setScore(props.score + 1);
      } else if (wordLength > 5) {
        props.setScore(props.score + 5);
      } else {
        props.setScore(props.score + 3);
      }
      alert("great job!!");
      axios.post("/nextGamePost", [true]).then((res) => console.log(res));
      setNextGame(
        <>
          <Navigate to="/words" />
        </>
      );
    }
  };
  useEffect(() => {}, [props.score]);

  let length = 5;
  useEffect(() => {
    let mounted = true;
    async function getData() {
      axios.get("/chossenWord").then((res) => {
        setWord(Object.keys(res.data)[0]);
        setWordLength(Object.keys(res.data)[0].length);
      });
    }
    getData();
    return () => (mounted = false);
  }, []);

  return (
    <>
      <div className="guessForm">
        <Container color="rgba(131, 81, 81, 0)" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input maxlength={wordLength} {...register("word")} />
          <input type="submit" />
        </form>
        <h5>word length: {wordLength}</h5>
      </div>
      {nextGame}
    </>
  );
}
