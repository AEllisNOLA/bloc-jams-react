import React, { Component } from 'react';
import albumData from '.././data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find(album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: .80,
            isPlaying: false,
            hover: false
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
        this.audioElement.volume = this.state.volume;
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationChange: e => {
                this.setState({ duration: this.audioElement.duration });
            }, 
            volumeChange: e => {
                this.setState({ volume: this.audioElement.volume });
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationChange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumeChange', this.eventListeners.volume);
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true })
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false })
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song, album) {
        const isSameSong = this.state.currentSong === song;

        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    }

    hoverOn(index) {
        this.setState({ hover: index })
    }

    hoverOff() {
        this.setState({ hover: false })
    }

    handleHover(song, index) {
        const isSameSong = this.state.currentSong === song;
        const playButton = <span className="ion-md-play"></span>
        const pauseButton = <span className="ion-md-pause"></span>
        const trackNumber = <span>{index + 1}</span>


        //  song is playing so show pause button
        if (this.state.isPlaying && isSameSong) {
            return pauseButton;
            // song is paused so show play button 
        } else if (!this.state.isPlaying && isSameSong) {
            return playButton;
            // hovering over a different song, so offer play button.
        } else if (this.state.hover === index) {
            return playButton;
            // otherwise show track number... track 1 shows play by default due to currentSong state
        } else {
            return trackNumber;
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        const lastIndex = Math.max(0, currentIndex)
        const lastSong = this.state.album.songs[lastIndex];

        if (newIndex > this.state.album.songs.length - 1) {
            this.setSong(lastSong)
            this.play();
        } else {
            this.setSong(newSong);
            this.play();
        }
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ volume: newVolume });
    }

    formatTime(time) {
        const formattedTime = `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;

        if (isNaN(time)) {
            return "-:--"
        } else {
            return formattedTime;
        }
    }

    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map((song, index) => {
                            return (
                                <tr
                                    className="song"
                                    key={index}
                                    onClick={() => this.handleSongClick(song)}
                                    onMouseEnter={() => this.hoverOn(index)}
                                    onMouseLeave={() => this.hoverOff()}
                                >

                                    <td><span>{this.handleHover(song, index)}</span></td>
                                    <td><span>{song.title}</span></td>
                                    <td><span>{this.formatTime(song.duration)}</span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <PlayerBar
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    volume={this.state.volume}
                    handleVolumeChange={(e) => {this.handleVolumeChange(e)}}
                    handleSongClick={() => { this.handleSongClick(this.state.currentSong) }}
                    handlePrevClick={() => { this.handlePrevClick() }}
                    handleNextClick={() => { this.handleNextClick() }}
                    handleTimeChange={(e) => { this.handleTimeChange(e)}}
                    formatTime={(e) => this.formatTime(e)}
                />
            </section>
        );
    }
}

export default Album;
