import React, {useEffect, useState} from "react";
import {
    useParams
} from "react-router-dom";
import {base_url} from "../constants";

const AlbumDetails = React.forwardRef((props, ref) => {
    let {albumId} = useParams();
    const [album, setAlbum] = useState({});
    const [errorAlbum, setErrorAlbum] = useState({});
    const fetchSong = async () => {
        const response = await fetch(`${base_url}albums/get_album/${albumId}`);
        const data = await response.json();
        setAlbum(data);
    };
    useEffect(() => {
        fetchSong().then(() => ('')).catch(() => setErrorAlbum(true));
    }, );

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
                                        <button className="btn btn-outline-dark btn-sm" style={{width: 100}} onClick={() => {
                                            //ref.audioEl.current.pause();
                                            //ref.audioEl.current.src = base_url + song.song_name;
                                            //ref.onNewSong(song);
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
});

export default AlbumDetails;