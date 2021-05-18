import './App.css';
import {base_url} from "./constants";
import ReactAudioPlayer from "react-audio-player";
import React, {useEffect, useState} from "react";
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

const App = () => {
    const [featured, setFeatured] = useState([]);
    const [audioPlayer, setAudioPlayer] = useState(null);

    useEffect(() => {
        fetchFeatured().then(() => (''));
    }, []);

    const fetchFeatured = async () => {
        const response = await fetch(`${base_url}musics/songs_by_sections`);
        const data = await response.json();
        setFeatured(data);
    };

    return (
        <div className="App">
            <Router>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img src="/trapflix.jpeg" alt="" height="36"
                             className="d-inline-block align-text-top" />
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">about</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
                {/*<nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>*/}

                <Switch>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/info/:songId">
                        <SongInfo ref={audioPlayer}/>
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
                    <AudioPlayer
                        src={null}
                        ref={(element) => {
                            setAudioPlayer(element);
                        }}
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
};

function About() {
    return <h2>About</h2>;
}

export default App;
