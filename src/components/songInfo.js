import {
    useParams
} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {base_url} from "../constants";
import "../css/bootstrap.min.css";

const SongInfo = React.forwardRef((props, ref) => {
    let {songId} = useParams();
    const [song, setSong] = useState({});
    const [songs, setSongs] = useState([]);
    const [audioLists, setAudioLists] = useState([]);

    useEffect(() => {
        fetch(`${base_url}albums/get_album/${songId}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setSong(data[0]);
                setSongs(data);
                addAudioOnList(data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addAudioOnList = (data) => {
        const audioList = data.map((song) => {
                return {
                    musicSrc: song.song_name,
                    cover: song.song_thumbnail,
                    singer: song.song_artist,
                    name: song.song_title
                }
        });
        setAudioLists(audioList);
    };

    return <div>
        <div>
            <div className="container">
                {
                    song ? (<div>
                        <div className="row">
                            <div className="col-sm-3">
                                <img src={song.song_thumbnail} alt="" className="border-0 img-thumbnail"/>
                            </div>
                            <div className="col-sm">
                                <div className="container">
                                    <h1 className="detail-song--title">{song.song_title}</h1>
                                    <br/>
                                    <div>{song.song_artist}</div>
                                    <p className="detail-song--album">{song.song_album}</p>
                                    <div>
                                        <button className="btn btn-outline-dark btn-sm" style={{width: 100}}
                                                onClick={() => {
                                                    //ref.audioEl.current.pause();
                                                    //ref.audioEl.current.src = base_url + song.song_name;
                                                    //ref.onNewSong(song);
                                                    props.addAudiosToPlayList(audioLists)
                                                }}>Play
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>) : <h6>Loading</h6>

                }
                <br/>
                {/*<pre>{JSON.stringify(songs)}</pre>*/}

                {
                    songs.map(
                        (song, index) =>
                            <div className="album-list">
                                <div key={index} className="album-list-item">
                                    <div className="album-list-item--details">
                                        <div className="album-list-item--details--index">{index}</div>
                                        <div className="album-list-item--song">
                                            <h6>{song.song_title}</h6>
                                            <div>{song.song_artist}</div>
                                        </div>
                                    </div>
                                    <div className="album-list-item--play">
                                        <button className="btn btn-sm" onClick={() => {
                                            props.addAudiosToPlayList(audioLists);
                                            props.playByIndex(index);
                                        }}>Play</button>
                                    </div>
                                </div>
                                <br/>
                                <div className="album-list-item--separator"></div>
                            </div>
                    )
                }
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