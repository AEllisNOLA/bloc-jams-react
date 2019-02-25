import React, { Component } from 'react';
import albumData from '.././data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            hover: false
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
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
        console.log("hovering on " + index);
    }

    hoverOff() {
        this.setState({ hover: false })
        console.log("Off")
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
        const newIndex = Math.max(0, currentIndex -1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
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
                                <td><span>{song.duration}</span></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <PlayerBar 
                    isPlaying={this.state.isPlaying} 
                    currentSong={this.state.currentSong}
                    handleSongClick={() => {this.handleSongClick(this.state.currentSong)}} 
                    handlePrevClick={() => {this.handlePrevClick()}}
                />
            </section>
        );
    }
}

export default Album;
