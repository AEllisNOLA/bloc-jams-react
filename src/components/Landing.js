import React from "react";

const Landing = () => (
  <section
    className="landing ui vertical masthead center aligned segment"
    id="hero-section"
  >
    <div className="overlay">
      <h1 className="hero-title">Turn the music up!</h1>
      <segment className="selling-points ui feature alternate vertical stripe segment">
        <div className="ui three column center aligned divided relaxed stackable grid container">
          <div className="row">
            <div className="point column">
              <h2 className="content content-head">Choose Your Music</h2>
              <h3 className="content content-description">
                The world is full of music; why should you have to listen to the
                music that someone else chose?
              </h3>
            </div>

            <div className="point column">
              <h2 className="content content-head">Unlimited, streaming, ad-free</h2>
              <h3 className="content content-description">No arbitrary limits. No distractions.</h3>
            </div>

            <div className="point column">
              <h2 className="content content-head">Mobile-enabled</h2>
              <h3 className="content content-description">
                Listen to your music on-the-go. This streaming service is
                available on all mobile platforms.
              </h3>
            </div>
          </div>
        </div>
      </segment>
    </div>
  </section>
);

export default Landing;
