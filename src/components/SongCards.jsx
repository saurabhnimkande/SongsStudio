import { useEffect, useRef, useState } from "react";
import "./SongCards.css";

export const SongCards = () => {
  let [songData, setSongData] = useState([]);
  let [singleSongData, setSingleSongData] = useState({});
  let songIndex = useRef(0);
  let [toggleMusicPlayer, setToogleMusicPlayer] = useState(false);
  let [togglePlay, setTogglePlay] = useState(false);
  let [songUrl, setSongUrl] = useState("");
  let soundRef = useRef(null);

  const getSongData = async () => {
    let data = await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/studiod9c0baf.json"
    );
    let getData = await data.json();
    setSongData(getData);
  };

  const playSong = () => {
    soundRef.current.play();
  };

  const pauseSong = () => {
    soundRef.current.pause();
  };

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

  useEffect(() => {
    getSongData();
  }, []);

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
