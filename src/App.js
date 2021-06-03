import './App.css';
import React, {Component, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./home";
import SongInfo from "./components/songInfo";
import AudioPlayer from "./AudioPlayer";
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav, Navbar} from "react-bootstrap";
import About from "./components/about";
import Login from "./components/login";
import AlbumDetails from "./components/albumsDetails";
import ReactJkMusicPlayer from "react-jinke-music-player";
import 'react-jinke-music-player/assets/index.css'
import UploadYourWork from "./components/uploadYourWork";
import UploadYourAlbum from "./components/uploadYourAlbum";

class App extends Component {
    constructor() {
        super();
        this.audioInstance = null;
        this.audioPlayer = null;
    }

    state = {
        audioLists: [],
        audioPlayer: null
    };

    addAudiosToPlayList = (audioList) => {
        this.setState({
            audioLists: audioList
        })
    };

    playByIndex = (index) => {
        this.audioInstance.playByIndex(index)
    };

    render() {
        //const [featured, setFeatured] = useState([]);
        //const [audioPlayer, setAudioPlayer] = useState(null);
        //const [audioLists, setAudioLists] = useState([]);

        /*useEffect(() => {
            fetchFeatured().then(() => (''));
        }, []);

        const fetchFeatured = async () => {
            const response = await fetch(`${base_url}musics/songs_by_sections`);
            const data = await response.json();
            setFeatured(data);
        };*/
        const {audioLists, audioPlayer} = this.state;
        return (
            <div className="App">
                <Router>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">
                            <img src="/trapflix.jpeg" alt="" height="36"
                                 className="d-inline-block align-text-top"/>
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link><Link to="/" style={{color: "#fff"}}>Home</Link></Nav.Link>
                            <Nav.Link><Link to="/about" style={{color: "#fff"}}>About</Link></Nav.Link>
                            <Nav.Link><Link to="/upload-your-work" style={{color: "#fff"}}>Upload</Link></Nav.Link>
                        </Nav>
                    </Navbar>
                    <br/>

                    <Switch>
                        <Route path="/about">
                            <About/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/album/:songId">
                            <SongInfo playByIndex={this.playByIndex} addAudiosToPlayList={this.addAudiosToPlayList} ref={this.audioInstance}/>
                        </Route>
                        <Route path="/album/:albumId">
                            <AlbumDetails playByIndex={this.playByIndex} addAudiosToPlayList={this.addAudiosToPlayList} ref={audioPlayer}/>
                        </Route>
                        <Route path="/upload-your-work">
                            <UploadYourWork />
                        </Route>
                        <Route path="/upload-your-album">
                            <UploadYourAlbum />
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="trapflix-audio--player">
                        {/*<AudioPlayer
                        src={null}
                        ref={(element) => {
                            setAudioPlayer(element);
                        }}
                    />*/}
                        <ReactJkMusicPlayer
                            getAudioInstance={(instance) => {
                                //setAudioPlayer(instance);
                                /*this.setState({
                                    "audioPlayer" : instance
                                });*/
                                this.audioInstance = instance
                            }}
                            mode="full"
                            glassBg
                            quietUpdate
                            clearPriorAudioLists
                            audioLists={audioLists}
                        />
                    </div>
                    {/*<div className="trapflix-audio--player">
                    {featured.length == 0 ? <div>No featured musics for now</div> :
                        <AudioPlayer tracks={featured} ref={(element) => {
                            setAudioPlayer(element);
                        }}/>}
                </div>*/}
                </Router>
            </div>
        );
    }
}

export default App;
