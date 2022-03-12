import { useEffect, useRef, useState } from "react";
import "./SongCards.css";

export const SongCards = ({ filterby }) => {
  //to store the data that have been requested by the api call.
  let [songData, setSongData] = useState([]);
  //to sorter the individual song data
  let [singleSongData, setSingleSongData] = useState({});
  //to store the song index for functionlaity of the forward and back button
  let songIndex = useRef(0);
  //to display and hide the onscreen music player
  let [toggleMusicPlayer, setToogleMusicPlayer] = useState(false);
  //for toggling the play/pause button
  let [togglePlay, setTogglePlay] = useState(false);
  //for sorting the url of the song
  let [songUrl, setSongUrl] = useState("");
  //for getting the reference of the sound element
  let soundRef = useRef(null);

  // for making the get request
  const getSongData = async () => {
    let data = await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/studiod9c0baf.json"
    );
    let getData = await data.json();
    if (filterby === "Show All") {
      //by default this option is selected so all the song will be displayed
      setSongData(getData);
    } else {
      //this else part is used for filtering the music list and return the appropriate results
      let arr = getData.filter((e) => {
        let str = e.artists;
        if (str.includes(filterby)) {
          return true;
        } else {
          return false;
        }
      });
      setSongData(arr);
    }
  };

  //for playing the song
  const playSong = () => {
    soundRef.current.play();
  };

  //to pause the song
  const pauseSong = () => {
    soundRef.current.pause();
  };

  // index based changing the changeSong function is used to increment or decrement the index, to get next or previous song
  const changeSong = (diff) => {
    if (diff === -1 && songIndex.current > 0) {
      songIndex.current = songIndex.current - 1;
    } else if (diff === 1 && songIndex.current < 9) {
      songIndex.current = songIndex.current + 1;
    }

    songData.forEach((el, i) => {
      if (i === songIndex.current) {
        setSingleSongData(el);
        setSongUrl(el.url);
      }
    });
  };

  //useEffect hook for tracking the filter options selected

  useEffect(() => {
    getSongData();
  }, [filterby]);

  //useEffect hook for setting the song and setting the reference for the element
  useEffect(() => {
    let audioElement = new Audio(songUrl);
    soundRef.current = audioElement;
  }, [songUrl]);

  return (
    <>
      <div id="songCardParentDiv">
        {songData.map((el, i) => {
          return (
            <div
              className="songCardsSingle"
              key={el.song}
              onClick={() => {
                setSingleSongData(el);
                setSongUrl(el.url);
                setToogleMusicPlayer(true);
                songIndex.current = i;
              }}
            >
              <div>
                <img src={el.cover_image} alt="songImage"></img>
              </div>
              <div>
                <h5>{el.song}</h5>
                <p>{el.artists}</p>
              </div>
            </div>
          );
        })}
      </div>
      {toggleMusicPlayer ? (
        <div id="musicPlayer">
          <div id="player">
            <div>
              <img src={singleSongData.cover_image} alt="songCover"></img>
            </div>
            <div>
              <h1>{singleSongData.song}</h1>
              <p>{singleSongData.artists}</p>
              <div id="songControls">
                <div>
                  <span
                    className="material-icons-outlined"
                    onClick={() => {
                      changeSong(-1);
                      pauseSong();
                      setTogglePlay(false);
                    }}
                  >
                    arrow_back_ios
                  </span>
                </div>
                <div>
                  {togglePlay ? (
                    <span
                      className="material-icons-outlined"
                      onClick={() => {
                        setTogglePlay(false);
                        pauseSong();
                      }}
                    >
                      pause
                    </span>
                  ) : (
                    <span
                      className="material-icons-outlined"
                      onClick={() => {
                        setTogglePlay(true);
                        playSong();
                      }}
                    >
                      play_arrow
                    </span>
                  )}
                </div>
                <div>
                  <span
                    className="material-icons-outlined"
                    onClick={() => {
                      changeSong(1);
                      pauseSong();
                      setTogglePlay(false);
                    }}
                  >
                    arrow_forward_ios
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span
                className="material-icons-outlined"
                onClick={() => {
                  setToogleMusicPlayer(false);
                  setTogglePlay(false);
                  pauseSong();
                }}
              >
                close
              </span>
            </div>
          </div>
          <div>
            <h1
              style={{
                marginLeft: "40px",
                marginTop: "40px",
              }}
            >
              Music Playlist
            </h1>
            {songData.map((el, i) => (
              <div
                key={el.song}
                className="playList"
                onClick={() => {
                  setSingleSongData({ ...el });
                  setSongUrl(el.url);
                  pauseSong();
                  setTogglePlay(false);
                  songIndex.current = i;
                }}
              >
                <div>
                  <img src={el.cover_image} alt="cover_image"></img>
                </div>
                <div>
                  <h5>{el.song}</h5>
                  <p>{el.artists}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
