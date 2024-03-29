import React from "react";
import AudioControls from "./AudioControls";
import "./App.css";


class AudioPlayer extends React.Component {
    state = {
        song: {},
        trackProgress: 0,
        duration: 0,
        currentPercentage: 0,
        isPresent: false,
        isPlaying: false,
    }
    audioEl = React.createRef();
    listenTracker = null;
    intervalRef = React.createRef();

    onError = (e) => this.props.onError?.(e);
    onCanPlay = (e) => this.props.onCanPlay?.(e);
    onCanPlayThrough = (e) => this.props.onCanPlayThrough?.(e);
    onPlay = (e) => {
        this.setListenTrack();
        this.props.onPlay?.(e);
    }
    onAbort = (e) => {
        this.clearListenTrack();
        this.props.onAbort?.(e);
    }
    onEnded = (e) => {
        this.clearListenTrack();
        this.props.onEnded?.(e);
    }
    onPause = (e) => {
        this.clearListenTrack();
        this.props.onPause?.(e);
    }
    onSeeked = (e) => {
        this.props.onSeeked?.(e);
    }
    onLoadedMetadata = (e) => {
        this.props.onLoadedMetadata?.(e);
    }
    onVolumeChanged = (e) => {
        this.props.onVolumeChanged?.(e);
    }

    onNewSong(song) {
        this.setState({
            song: song,
            isPlaying: true,
            isPresent: true,
        });
        this.audioEl.current.pause();
        this.audioEl.current.src = song.song_name;
        this.audioEl.current.play();
        this.startTimer();
    }

    componentDidMount() {
        const audio = this.audioEl.current;
        if (!audio) return;

        this.updateVolume(this.props.volume);

        audio.addEventListener('error', this.onError);

        // When enough of the file has downloaded to start playing
        audio.addEventListener('canplay', this.onCanPlay);

        // When enough of the file has downloaded to play the entire file
        audio.addEventListener('canplaythrough', this.onCanPlayThrough);

        // When audio play starts
        audio.addEventListener('play', this.onPlay);

        // When unloading the audio player (switching to another src)
        audio.addEventListener('abort', this.onAbort);

        // When the file has finished playing to the end
        audio.addEventListener('ended', this.onEnded);

        // When the user pauses playback
        audio.addEventListener('pause', this.onPause);

        // When the user drags the time indicator to a new time
        audio.addEventListener('seeked', this.onSeeked);

        audio.addEventListener('loadedmetadata', this.onLoadedMetadata);

        audio.addEventListener('volumechange', this.onVolumeChanged);
    }

    componentWillUnmount() {
        const audio = this.audioEl.current;
        if (!audio) return;

        audio.removeEventListener('error', this.onError);

        // When enough of the file has downloaded to start playing
        audio.removeEventListener('canplay', this.onCanPlay);

        // When enough of the file has downloaded to play the entire file
        audio.removeEventListener('canplaythrough', this.onCanPlayThrough);

        // When audio play starts
        audio.removeEventListener('play', this.onPlay);

        // When unloading the audio player (switching to another src)
        audio.removeEventListener('abort', this.onAbort);

        // When the file has finished playing to the end
        audio.removeEventListener('ended', this.onEnded);

        // When the user pauses playback
        audio.removeEventListener('pause', this.onPause);

        // When the user drags the time indicator to a new time
        audio.removeEventListener('seeked', this.onSeeked);

        audio.removeEventListener('loadedmetadata', this.onLoadedMetadata);

        audio.removeEventListener('volumechange', this.onVolumeChanged);
    }

    componentDidUpdate() {
        this.updateVolume(this.props.volume);
    }

    setListenTrack() {
        if (!this.listenTracker) {
            const listenInterval = this.props.listenInterval;
            this.listenTracker = window.setInterval(() => {
                this.audioEl.current && this.props.onListen?.(this.audioEl.current.currentTime);
            }, listenInterval);
            /*this.setState({
                duration: this.audioEl.current.duration,
                isPlaying: true
            });*/
            this.startTimer();
        }
    }

    updateVolume(volume) {
        const audio = this.audioEl.current;
        if (audio !== null && typeof volume === 'number' && volume !== audio?.volume) {
            audio.volume = volume;
        }
    }

    clearListenTrack() {
        if (this.listenTracker) {
            clearInterval(this.listenTracker);
            delete this.listenTracker;
        }
    }

    nowPlaying() {
        if (this.state.song)
            return <div>Not playing</div>;
        else
            return this.player();
    }

    player() {
        const {song_thumbnail, song_title, song_artist,} = this.state.song;
        const { trackProgress, currentPercentage, duration} = this.state;
        const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, red), color-stop(${currentPercentage}, #777))`;

        return (
            <div>
                {this.state.isPresent ? <div className="audio-player">
                    <div className="track-info">
                        <img
                            className="artwork"
                            src={song_thumbnail}
                            alt={`track artwork for ${song_title} by ${song_artist}`}
                        />
                        <div className="track-info--artist">
                            <h6 className="title">{song_title}</h6>
                            <p className="artist">{song_artist}</p>
                        </div>
                    </div>
                    <AudioControls
                        isPlaying={!this.audioEl.current.paused}
                        onPrevClick={() => {
                        }}
                        onNextClick={() => {
                        }}
                        onPlayPauseClick={() => {
                            if (this.audioEl.current.paused) {
                                this.setState({
                                    isPlaying: true
                                });
                                this.audioEl.current.play();
                            } else {
                                this.setState({
                                    isPlaying: false
                                });
                                this.audioEl.current.pause();
                            }
                        }}
                    />
                    <input
                        type="range"
                        value={trackProgress}
                        step="1"
                        min="0"
                        max={this.audioEl.current.duration ? this.audioEl.current.duration : `${duration}`}
                        className="progress"
                        onChange={(e) => this.onScrub(e.target.value)}
                        onMouseUp={() => this.onScrubEnd()}
                        onKeyUp={() => this.onScrubEnd()}
                        style={{background: trackStyling}}
                    />
                </div> : <div></div>
                }
                <audio
                    autoPlay={true}
                    ref={this.audioEl}
                    src={this.props.src}
                >
                    incompatibilityMessage
                </audio>
            </div>

        );
    }

    onScrub(value) {
        clearInterval(this.intervalRef.current);
        this.audioEl.current.currentTime = value;
        this.setState({
            trackProgress: this.audioEl.current.currentTime
        });
    }

    onScrubEnd = () => {
        // If not already playing, start

        if (!this.state.isPlaying) {
            this.setState({
                isPlaying: false,
            });
        }
        this.startTimer();
    };

    startTimer() {
        clearInterval(this.intervalRef.current);
        this.intervalRef.current = setInterval(() => {
            const {duration} = this.audioEl.current;
            if (this.audioEl.current && this.audioEl.current.ended) {
                //toNextTrack();
            } else {
                this.setState({
                    trackProgress: this.audioEl.current.currentTime,
                    currentPercentage: duration
                        ? `${(this.state.trackProgress / duration) * 100}%`
                        : "0%"
                })
                //console.log(this.state.trackProgress)
            }
        }, [1000]);
    }

    render() {
        return this.player();
    }
}

export default AudioPlayer;