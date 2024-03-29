import {base_url} from "./constants";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Carousel} from '3d-react-carousal';

const Home = () => {
    const [ads, setAds] = useState([]);
    const [errorAds, setErrorAds] = useState(false);
    const [featured, setFeatured] = useState([]);
    const [errorFeatured, setErrorFeatured] = useState(false);
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
        return ads.map((ad, index) => <Link to={"/album/" + ad.id}><img key={index} src={ad.cover} alt=""
                                                                        className="slide-image"/></Link>);
    };

    return (
        <div className="App">
            <br/>
            {
                errorAds ? <div className="text-center">Something wrong</div> : <div/>
            }
            {
                ads.length > 0 ? <Carousel slides={adSlides()} autoplay={true} interval={3000}/> : <div/>
            }
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
                                    <div key={index} className="col-6 col-sm-3 home-song" onClick={() => {
                                        /*audioPlayer.audioEl.current.pause();
                                        audioPlayer.audioEl.current.src = music.song_name;*/
                                    }}>
                                        <div className="home-song--play">
                                            Play
                                        </div>
                                        <div>
                                            <img src={music.song_thumbnail} alt=""
                                                 className="border-0 img-thumbnail home-song--cover"
                                                 style={{padding: 0}}/>
                                        </div>
                                        <div className="home-song--info">
                                            <Link to={"/album/" + music.album_id}>
                                                <div className="home-song--title">{music.song_title}</div>
                                            </Link>
                                            <div className="home-song--artist">{music.song_artist}</div>
                                        </div>

                                    </div> : <div key={index}/>
                                )
                        }
                    </div>
                </div>
            </div>

            <div className="section section-playlist" style={{marginBottom: 0}}>
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
                <div className="home-comingsoon">
                    <img src="coming-soon.png" alt="coming soon" />
                </div>
                </div>
            </div>

            <div className="section section-exclusive" style={{marginTop: 0}}>
                <div className="home-title">
                    <h3>EXCLUSIVE VIDEOS</h3>
                    <div className="home-title--divider"/>
                </div>
                <br/>
                <div className="text-center">
                    <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY" className="home-iframe" title="exclusive video"/>
                </div>
            </div>

            <div className="section">
                <div className="home-title">
                    <h3>Trending singles</h3>
                    <div className="home-title--divider"/>
                </div>
                <div className="container text-center">
                    {/*<img src="coming-soon.png" alt="coming soon" width="400" style={{margin: 0}}/>*/}
                    <div className="row text-center">
                        {
                            errorFeatured ? <div>No featured musics for now</div> :
                                featured.map((music, index) => (music.section?.toLowerCase() === "Trending singles".toLowerCase()) ?
                                    <div key={index} className="col-6 col-sm-3 home-song" onClick={() => {
                                        /*audioPlayer.audioEl.current.pause();
                                        audioPlayer.audioEl.current.src = music.song_name;*/
                                    }}>
                                        <div className="home-song--play">
                                            Play
                                        </div>
                                        <div>
                                            <img src={music.song_thumbnail} alt=""
                                                 className="border-0 img-thumbnail home-song--cover"
                                                 style={{padding: 0}}/>
                                        </div>
                                        <div className="home-song--info">
                                            <Link to={"/album/" + music.album_id}>
                                                <div className="home-song--title">{music.song_title}</div>
                                            </Link>
                                            <div className="home-song--artist">{music.song_artist}</div>
                                        </div>

                                    </div> : <div key={index}/>
                                )
                        }
                    </div>
                </div>
            </div>

            <div className="section section-events">
                <div>
                    <h3>Wanna be the next star?</h3>
                    <Link to="/upload-your-work" className="btn btn-dark">Upload your work</Link>
                </div>

            </div>

            <div className="section section-footer">
                <hr/>
                <div className="container">
                    <p className="text-right">© Trapflix Music 2021</p>
                </div>
            </div>

        </div>
    );
};

export default Home;