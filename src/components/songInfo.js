import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import React, {useEffect, useState, useRef} from "react";
import {base_url} from "../constants";
import "../css/bootstrap.min.css";
import ReactAudioPlayer from "react-audio-player";

const SongInfo = React.forwardRef((props, ref) => {
    let {songId} = useParams();
    const [song, setSong] = useState({});
    const [errorSong, setErrorSong] = useState({});
    const [isPlaying, setIsPlaying] = useState("");
    //const [audioPlayer, setAudioPlayer] = useState(null);
    const fetchSong = async () => {
        const response = await fetch(`${base_url}musics/get_song/${songId}`);
        const data = await response.json();
        setSong(data);
    };
    useEffect(() => {
        fetchSong().then(() => ('')).catch(() => setErrorSong(true));
    }, []);

    useEffect(() => {

    }, []);

    return <div>
        <div>

            <div className="container">
                {
                    song ? (<div>
                        <div className="row">
                            <div className="col-4">
                                <img src={base_url + song.song_thumbnail} alt="" className="border-0 img-thumbnail"/>
                            </div>
                            <div className="col-8">
                                <div className="container">
                                    <h1>{song.song_title}</h1>
                                    <div>{song.song_artist}</div>
                                    <p className="detail-song--album">{song.song_album}</p>
                                    <div>
                                        <button className="btn btn-outline-dark btn-sm" onClick={() => {
                                            //ref.audioEl.current.pause();
                                            //ref.audioEl.current.src = base_url + song.song_name;
                                            ref.onNewSong(song);
                                        }}>Play
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>) : <h6>Loading</h6>}
            </div>
        </div>
        {/*{
            song ? <ReactAudioPlayer
                src={base_url + song.song_name}
                ref={(element) => {
                    setAudioPlayer(element);
                }}
                autoPlay
                controls
            /> : <div/>
        }*/}
    </div>;
});

export default SongInfo;