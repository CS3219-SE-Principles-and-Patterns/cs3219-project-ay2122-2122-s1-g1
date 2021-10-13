import React from "react";

function About() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">About</h1>
            <p>
            Increasingly, students face challenging technical interviews when applying for jobs which many have difficulty dealing with. 
            Issues range from a lack of communication skills to articulate their thought process out loud to an outright inability to understand and solve the given problem. 
            Moreover, grinding practice questions can be tedious and monotonous.
            To solve this issue, we created an interview preparation platform and peer matching system called PeerPrep where students can find peers to practice whiteboard style interview questions together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;