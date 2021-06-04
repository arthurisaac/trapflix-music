import React, {Component} from "react";
import {
    withRouter
} from "react-router-dom";
import {base_url} from "../constants";

class AlbumDetails extends Component {
    state = {
        album: {},
        audioLists: [],
        errorAlbum: false
    };

    componentDidMount() {
        const albumId = this.props.match.params;
        fetch(`${base_url}albums/get_album/${albumId}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    album: data
                })
            })
            .catch(() => this.setState({
                errorAlbum: true
            }));
    }

    addAudioOnList = (data) => {
        const audioList = data.map((song) => {
            return {
                musicSrc: song.song_name,
                cover: song.song_thumbnail,
                singer: song.song_artist,
                name: song.song_title
            }
        });
        this.setState({
            "audioLists": audioList
        });
        this.props.addAudiosToPlayList(audioList);
    };

    render() {
        const {errorAlbum, album} = this.state;

        return <div>
            <div className="container">
                <div className="container">
                    {
                        errorAlbum ? <div>Somthing wrong</div> : <div></div>
                    }
                    {
                        album ? (<div>
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src={base_url + album.cover} alt="" className="border-0 img-thumbnail"/>
                                </div>
                                <div className="col-sm">
                                    <div className="container">
                                        <h1 className="detail-song--title">{album.title}</h1>
                                        <br/>
                                        <div>{album.artist}</div>
                                        <p className="detail-song--album">{album.year} - {album.title}</p>
                                        <div>
                                            <button className="btn btn-outline-dark btn-sm" style={{width: 100}}
                                                    onClick={() => {
                                                        //ref.audioEl.current.pause();
                                                        //ref.audioEl.current.src = base_url + song.song_name;
                                                        //ref.onNewSong(song);
                                                        this.props.addAudiosToPlayList(this.state.audioLists)
                                                    }}>Play album
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>) : <h6>Loading</h6>}
                </div>
            </div>
        </div>
    }
}

export default withRouter(AlbumDetails);