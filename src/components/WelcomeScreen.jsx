import { LeftList } from "./LeftList";
import { Navbar } from "./Navbar";
import { SongCards } from "./SongCards";
import "./WelcomeScreen.css";
export const WelcomeScreen = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div id="trendingSection">
        <div>
          <h2>Trending</h2>
        </div>
        <div>
          <select>
            <option>Atif Aslam</option>
          </select>
        </div>
      </div>
      <div id="mainContent">
        <LeftList></LeftList>
        <SongCards></SongCards>
      </div>
    </div>
  );
};
