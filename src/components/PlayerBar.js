import React, { Component } from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <button id="previous">
                        <span className="ion-md-skip-backward"></span>
                    </button>
                    <button id="play-pause">
                        <span className="ion-md-play"></span>
                        <span className="ion-md-pause"></span>
                    </button>
                    <button id="next">
                        <span className="ion-md-skip-forward"></span>
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">-:--</div>
                    <input type="range" className="seek-bar" value="0" />
                    <div className="total-time">-:--</div>
                </section>
                <section id="volume-control">
                    <div className="icon ion-md-volume-low"></div>
                    <input type="range" className="seek-bar" value="80" />
                    <div className="icon ion-md-volume-high"></div>
                </section>
            </section>
        );
    }
}

export default PlayerBar;