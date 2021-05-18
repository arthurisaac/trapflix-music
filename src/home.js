import {base_url} from "./constants";
import ReactAudioPlayer from "react-audio-player";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [errorFeatured, setErrorFeatured] = useState(false);
    const [currentMusic, setCurrentMusic] = useState("");
    const [isPlaying, setIsPlaying] = useState("");
    const [audioPlayer, setAudioPlayer] = useState(null);
    useEffect(() => {
        fetchFeatured().then(() => ('')).catch(() => setErrorFeatured(true));
    }, []);

    const fetchFeatured = async () => {
        const response = await fetch(`${base_url}musics/songs_by_sections`);
        const data = await response.json();
        setFeatured(data);
    };

    return (
        <div className="App">

            <div className="home-title">
                <h3>Featured Music</h3>
                <div className="home-title--divider"/>
            </div>

            <div className="container">
                <div className="row text-center">
                    {
                        errorFeatured ? <div>No featured musics for now</div> :
                            featured.map((music, index) => (music.section?.toLowerCase() === "Featured Music".toLowerCase()) ?
                                <div key={index} className="col-6 col-sm-3" onDoubleClick={() => {
                                    audioPlayer.audioEl.current.pause();
                                    setCurrentMusic(base_url + music.song_name)
                                    audioPlayer.audioEl.current.src = base_url + music.song_name;

                                }}>
                                    <Link to={"/info/" + music.song_id}>
                                        <div>
                                            <img src={base_url + music.song_thumbnail} alt=""
                                                 className="border-0 img-thumbnail home-song--cover"/>
                                        </div>
                                        <div className="home-song--info">
                                            <div className="home-song--title">{music.song_title}</div>
                                            <div className="home-song--artist">{music.song_artist}</div>
                                        </div>
                                    </Link>

                                </div> : <div key={index}/>
                            )
                    }
                </div>
            </div>

            <div className="home-title">
                <h3>Popular Playlists</h3>
                <div className="home-title--divider"/>
            </div>
            <div className="container">
                {/*<div className="row text-center">
                    {
                        errorFeatured ? <div>No popular playlists for now</div> :
                            featured.map((music, index) => (music.section?.toLowerCase() === "Popular Playlists".toLowerCase()) ?
                                <div key={index}>{music.song_title}</div> : <div/>
                            )
                    }
                </div>*/}

            </div>
            <div className="home-title">
                <h3>Trending singles</h3>
                <div className="home-title--divider"/>
            </div>
{/*            <div className="trapflix-audio--player">
                {featured.length == 0 ? <div>No featured musics for now</div> : <AudioPlayer tracks={featured}/>}
            </div>*/}
        </div>
    );
};

export default Home;