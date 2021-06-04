import React from "react";
import {base_url} from "../constants";
import axios from 'axios';
import {Link} from "react-router-dom";

class UploadYourWork extends React.Component {

    state = {
        song_title: "",
        song_artist: "",
        song_album: "",
        song_description: "",
        song_release_date: "",
        trapsong: undefined
    };

    render() {
        return (
            <div className="container">
                <div className="upload-header text-center">
                    <br/>
                    <br/>
                    <img src="trapflix.jpeg" alt=""/>
                    <br/>
                    <br/>
                    <h3>Welcome to trapflix Album Management!</h3>
                </div>
                <div className="text-center">
                    <div className="text-center">
                        <h4>This is a platform to upload your music to the trapflix App</h4>
                        <br/>
                        <Link to="/upload-your-album" className="btn btn-dark">Get started now !</Link>
                    </div>
                </div>
                <br/>
                <br/>
                {/*<div className="highlight">
                    <h3>Add a song</h3>
                    <form noValidate>
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
                                   onChange={this.onFileChange}/>
                            <div id="mp3Help" className="form-text">Your song must be mp3 file format</div>
                        </div>
                        <button className="btn btn-primary" onClick={event => this.uploadSingle(event)}>Upload now
                        </button>
                    </form>
                </div>*/}
            </div>
        );
    }

    onFileChange = event => {
        console.log(event.target.files[0]);
        this.setState({trapsong: event.target.files[0]});
    };

    uploadSingle(event) {
        event.preventDefault();

        const {song_title, song_artist, song_album, song_description, song_release_date, trapsong} = this.state;
        /*console.log(song_title);
        console.log(song_artist);
        console.log(song_album);
        console.log(song_description);
        console.log(song_release_date);
        console.log(trapsong);*/

        const formData = new FormData();
        formData.append("trapsong", trapsong, trapsong.name);
        formData.append("song_title", song_title);
        formData.append("song_artist", song_artist);
        formData.append("song_album", song_album);
        formData.append("song_description", song_description);
        formData.append("song_release_date", song_release_date);

        axios.post(`${base_url}musics/`, formData)
            .then((res) => {
                alert("Uploaded successfully");
                console.log(res);
            }).catch((err) => {
            alert(JSON.stringify(err));
        });
    }
}

export default UploadYourWork;
