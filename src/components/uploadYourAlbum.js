import React from "react";
import {base_url} from "../constants";
import axios from 'axios';

class UploadYourAlbum extends React.Component {

    state = {
        song_title: "",
        song_artist: "",
        song_album: "",
        song_description: "",
        song_release_date: "",
        trapsong: undefined,
        cover: undefined
    };

    render() {
        return (
            <div className="container">
                <br/>
                <div className="highlight">
                    <h3>New album</h3>
                    <form action="" noValidate>
                        <div className="mb-3">
                            <label className="form-label">Album/Single name</label>
                            <input type="text" name="song_title" className="form-control" aria-describedby="titleHelp"
                                   required onChange={(e) => {
                                this.setState({
                                    "song_title": e.target.value
                                })
                            }}/>
                            <div id="titleHelp" className="form-text">Please add a name</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Artist name</label>
                            <input type="text" name="song_artist" className="form-control" required onChange={(e) => {
                                this.setState({
                                    "song_artist": e.target.value
                                })
                            }}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Album</label>
                            <input type="text" name="song_album" className="form-control" required onChange={(e) => {
                                this.setState({
                                    "song_album": e.target.value
                                })
                            }}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea name="song_description" className="form-control" rows="3" onChange={(e) => {
                                this.setState({
                                    "song_description": e.target.value
                                })
                            }} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Release date</label>
                            <input type="date" name="song_release_date" className="form-control" required
                                   onChange={(e) => {
                                       this.setState({
                                           "song_release_date": e.target.value
                                       })
                                   }}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">MP3 file</label>
                            <input type="file" name="trapsong" className="form-control-file" aria-describedby="mp3Help"
                                   onChange={this.onFileChange} multiple accept=".mp3"/>
                            <div id="mp3Help" className="form-text">Your song must be mp3 file format</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Cover</label>
                            <input type="file" name="trapsong" className="form-control-file" aria-describedby="mp3Help"
                                   onChange={this.onCoverChange} accept="image/*"/>
                            <div id="mp3Help" className="form-text">Your cover is required and must be a square.</div>
                        </div>
                        <button className="btn btn-primary" onClick={event => this.uploadSingle(event)}
                                type="submit">Upload now
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    onFileChange = event => {
        this.setState({trapsong: event.target.files});
    };

    onCoverChange = event => {
        this.setState({cover: event.target.files[0]});
    };

    uploadSingle(event) {
        event.preventDefault();

        const {song_title, song_artist, song_album, song_description, song_release_date, trapsong, cover} = this.state;
        /*console.log(song_title);
        console.log(song_artist);
        console.log(song_album);
        console.log(song_description);
        console.log(song_release_date);*/
        console.log(trapsong);

        const formData = new FormData();
        for (let i = 0; i < trapsong.length; i++) {
            formData.append("trapsong", trapsong[i])
        }
        formData.append("trapcover", cover);
        formData.append("song_title", song_title);
        formData.append("song_artist", song_artist);
        formData.append("song_album", song_album);
        formData.append("song_description", song_description);
        formData.append("song_release_date", song_release_date);

        axios.post(`${base_url}albums/instance`, formData)
            .then((res) => {
                alert("Uploaded successfully");
                console.log(res);
            }).catch((err) => {
            alert(JSON.stringify(err));
        });
    }
}

export default UploadYourAlbum;
