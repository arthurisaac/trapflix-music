import {base_url} from "./constants";
import ReactAudioPlayer from "react-audio-player";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Carousel} from '3d-react-carousal';

const Home = () => {
    const [ads, setAds] = useState([]);
    const [errorAds, setErrorAds] = useState(false);
    const [featured, setFeatured] = useState([]);
    const [errorFeatured, setErrorFeatured] = useState(false);
    const [currentMusic, setCurrentMusic] = useState("");
    const [isPlaying, setIsPlaying] = useState("");
    const [audioPlayer, setAudioPlayer] = useState(null);
    useEffect(() => {
        fetchFeatured().then(() => ('')).catch(() => setErrorFeatured(true));
    }, []);

    useEffect(() => {
        fetchAlbumsAds().then(() => ('')).catch(() => setErrorAds(true));
    }, []);

    const fetchFeatured = async () => {
        const response = await fetch(`${base_url}musics/songs_by_sections`);
        const data = await response.json();
        setFeatured(data);
    };

    const fetchAlbumsAds = async () => {
        const response = await fetch(`${base_url}albums/album_ads`);
        const data = await response.json();
        setAds(data);
    };

    const adSlides = () => {
        const list = ads.map((ad, index) => <Link to={"/album/" + ad.id}><img key={index} src={base_url + ad.cover} alt="" className="slide-image"/></Link>)
        return list;
    };

    return (
        <div className="App">
            <br/>
            <div style={{height: 250}}>
                {
                    ads.length > 0 ? <Carousel slides={adSlides()} autoplay={true} interval={3000}/> : <div/>
                }
            </div>
            <br/>
            <div className="section">
                <div className="home-title">
                    <h3>Featured Music</h3>
                    <div className="home-title--divider"/>
                </div>

                <div className="container">
                    <div className="row text-center">
                        {
                            errorFeatured ? <div>No featured musics for now</div> :
                                featured.map((music, index) => (music.section?.toLowerCase() === "Featured Music".toLowerCase()) ?
                                    <div key={index} className="col-6 col-sm-3 home-song" onDoubleClick={() => {
                                        audioPlayer.audioEl.current.pause();
                                        setCurrentMusic(base_url + music.song_name)
                                        audioPlayer.audioEl.current.src = base_url + music.song_name;

                                    }}>
                                        <Link to={"/info/" + music.song_id}>
                                            <div className="home-song--play">
                                                Play
                                            </div>
                                            <div>
                                                <img src={base_url + music.song_thumbnail} alt=""
                                                     className="border-0 img-thumbnail home-song--cover"
                                                     style={{padding: 0}}/>
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
            </div>

            <div className="section section-playlist">
                <div className="home-title">
                    <h3>Popular Playlists</h3>
                    <div className="home-title--divider"/>
                </div>
                <div className="container text-center">
                    {/*<div className="row text-center">
                    {
                        errorFeatured ? <div>No popular playlists for now</div> :
                            featured.map((music, index) => (music.section?.toLowerCase() === "Popular Playlists".toLowerCase()) ?
                                <div key={index}>{music.song_title}</div> : <div/>
                            )
                    }
                </div>*/}
                    <img src="coming-soon.png" alt="coming soon" width="400" style={{margin: 0}}/>
                </div>
            </div>

            <div className="section">
                <div className="home-title">
                    <h3>Trending singles</h3>
                    <div className="home-title--divider"/>
                </div>
                <div className="container text-center">
                    <img src="coming-soon.png" alt="coming soon" width="400" style={{margin: 0}}/>
                </div>
            </div>

        </div>
    );
};

export default Home;