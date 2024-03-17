const attachPlayTrackEvent = function (trackItem, track, accessToken, volume) {
  trackItem.addEventListener("click", function () {
    // Call a function to play the selected track
    playTrack(accessToken, track.uri, volume);
  });
};
const playTrack = function (accessToken, trackUri, volume) {
  const player = new Spotify.Player({
    name: "MoodWave",
    getOAuthToken: (cb) => {
      cb(accessToken);
    },
  });

  player.addListener("initialization_error", ({ message }) => {
    console.log("initilizaion error");
    console.error(message);
  });
  player.addListener("authentication_error", ({ message }) => {
    console.log("authentican error" + accessToken + " " + trackUri);
    console.error(message);
  });
  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    // Play the selected track
    playOnDevice(accessToken, device_id, trackUri);
    player.setVolume(0.3).then(() => {
      console.log("Volume updated!");
    });
    setInterval(() => {
      player.getCurrentState().then((state) => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          return;
        }

        // var current_track = state.track_window.current_track;
        // var next_track = state.track_window.next_tracks[0];
        var currentPos = state.position;

        console.log("Currently position playing", currentPos);
        // console.log("Playing Next", next_track);
      });
    }, 1000);
    // Add an event listener to the "high-volume" button
    document
      .querySelector(".high-volume")
      .addEventListener("click", function () {
        // Decrease the volume by 10%
        player.getVolume().then((volume) => {
          var newVolume = volume + 0.1;
          if (newVolume > 1) newVolume = 1;
          player.setVolume(newVolume).then(() => {
            console.log("Volume decreased by 10%");
          });
        });
      });

    // Add an event listener to the "high-volume" button
    document
      .querySelector(".low-volume")
      .addEventListener("click", function () {
        // Decrease the volume by 10%
        player.getVolume().then((volume) => {
          var newVolume = volume - 0.1;
          if (newVolume < 0) newVolume = 0;
          player.setVolume(newVolume).then(() => {
            console.log("Volume decreased by 10%");
          });
        });
      });
    // Add an event listener to the "next" button
    document
      .querySelector(".next-button")
      .addEventListener("click", function () {
        player.nextTrack().then(() => {
          console.log("Playing next track");
        });
      });
  });

  // Connect to the player
  player.connect().then((success) => {
    if (success) {
      console.log("The Web Playback SDK successfully connected to Spotify!");
    }
  });
  document.querySelector(".togglePlay").addEventListener("click", () => {
    player.togglePlay().then(() => {
      console.log("Toggled playback!");
    });
  });

  // Spotify Web Playback SDK ready callback
};
window.onSpotifyWebPlaybackSDKReady = () => {
  console.log("Spotify Web Playback SDK is ready.");
};

const playOnDevice = async function (accessToken, deviceId, trackUri) {
  const playEndpoint = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

  const result = await fetch(playEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris: [trackUri],
    }),
  });

  const data = await result.json();
  console.log(data);
};
