import { useState } from "react";
import { LeftList } from "./LeftList";
import { Navbar } from "./Navbar";
import { SongCards } from "./SongCards";
import "./WelcomeScreen.css";
export const WelcomeScreen = () => {
  let [filterby, setFilterBy] = useState("Show All");

  const getOptions = (e) => {
    setFilterBy(e.target.value);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div id="trendingSection">
        <div>
          <h2>Trending</h2>
        </div>
        <div>
          <label>Filter : </label>
          <select
            id="filterOptions"
            onChange={(e) => {
              getOptions(e);
            }}
          >
            <option value="Show All">Show All</option>
            <option value="Atif Aslam">Atif Aslam</option>
            <option value="Rahat Fateh Ali Khan">Rahat Fateh Ali Khan</option>
            <option value="Momina Mustehsan">Momina Mustehsan</option>
            <option value="Harshadeep Kaur">Harshadeep Kaur</option>
            <option value="Ali Zafar">Ali Zafar</option>
          </select>
        </div>
      </div>
      <div id="mainContent">
        <LeftList></LeftList>
        <SongCards filterby={filterby}></SongCards>
      </div>
    </div>
  );
};
