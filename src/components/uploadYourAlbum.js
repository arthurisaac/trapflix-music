import React from "react";
import {base_url} from "../constants";
import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css';

class UploadYourAlbum extends React.Component {

    state = {
        song_title: "",
        song_artist: "",
        song_album: "",
        song_description: "",
        song_release_date: "",
        trapsong: [],
        loading: false,
        cover: undefined
    };

    render() {
        return (
            <div className="container">
                <br/>
                <form noValidate onSubmit={event => this.uploadSingle(event)}>
                    <div className="highlight">
                        <br/>
                        <div className="text-center">
                            <h2 >New album</h2>
                            <div className="form-text">Add new album in trapflix</div>
                        </div>

                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-4">
                                <div className="mb-3">
                                    <label className="form-label">Album/Single name</label>
                                    <input type="text" name="song_title" className="form-control"
                                           aria-describedby="titleHelp"
                                           required onChange={(e) => {
                                        this.setState({
                                            "song_title": e.target.value
                                        })
                                    }}/>
                                    <div id="titleHelp" className="form-text">Please add a name</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Artist name</label>
                                    <input type="text" name="song_artist" className="form-control" required
                                           onChange={(e) => {
                                               this.setState({
                                                   "song_artist": e.target.value
                                               })
                                           }}/>
                                </div>
                                {/*<div className="mb-3">
                                    <label className="form-label">Album</label>
                                    <input type="text" name="song_album" className="form-control" required onChange={(e) => {
                                        this.setState({
                                            "song_album": e.target.value
                                        })
                                    }}/>
                                </div>*/}
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea name="song_description" className="form-control" rows="3"
                                              onChange={(e) => {
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
                                    <label className="form-label">Cover</label>
                                    <input type="file" name="trapsong" className="form-control-file"
                                           aria-describedby="mp3Help"
                                           onChange={this.onCoverChange} accept="image/*" required/>
                                    <div id="mp3Help" className="form-text">Your cover is required and must be a square.
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="mb-3">
                                    <div className="files-box">
                                        <label className="form-label">Choose music files to upload to trapflix</label>
                                        <input type="file" name="trapsong" className="form-control-file"
                                               aria-describedby="mp3Help"
                                               onChange={this.onFileChange} multiple accept=".mp3" required/>
                                        <div id="mp3Help" className="form-text">Your song must be mp3 file format</div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        this.state.trapsong.map((file, index) => (
                                            <div key={index} className="files-list">
                                                <div><span className="files-list--index">{index}</span>{file.name}</div>
                                                <div>
                                                    <div className="btn btn-sm btn-danger"
                                                         onClick={() => this.removeFile(file)}>delete
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                {
                                    this.state.loading ? <div>Uploading... Please wait!</div> :
                                        <button className="btn btn-primary"
                                                type="submit">Upload now
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    onFileChange = event => {
        //this.setState({trapsong: event.target.files});
        console.log(event.target.files.length);
        for (let i = 0; i < event.target.files.length; i++) {
            setTimeout(() => {
                this.setState({
                    trapsong: [...this.state.trapsong, event.target.files[i]]
                });
            }, 500);
            console.log(event.target.files[i]);
        }
    };

    onCoverChange = event => {
        this.setState({cover: event.target.files[0]});
    };

    removeFile = (fileItem) => {
        const files = this.state.trapsong.filter(file => file !== fileItem);
        this.setState({
            trapsong: files
        });
    };

    uploadSingle(event) {
        event.preventDefault();

        const {song_title, song_artist, song_description, song_release_date, trapsong, cover} = this.state;
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
        //formData.append("song_album", song_album);
        formData.append("trapcover", cover);
        formData.append("song_title", song_title);
        formData.append("song_artist", song_artist);
        formData.append("song_album", song_title);
        formData.append("song_description", song_description);
        formData.append("song_release_date", song_release_date);

        this.setState({
            loading: true
        });

        //TODO
        axios.post(`${base_url}albums/local`, formData)
            .then((res) => {
                alert("Uploaded successfully");
                console.log(res);
                this.setState({
                    loading: false
                });
            })
            .catch((err) => {
                alert(JSON.stringify(err));
                this.setState({
                    loading: false
                });
            });
    }
}

export default UploadYourAlbum;
