function updateTime(currentPos, totalDuration) {
    var minutes = Math.floor(currentPos / 60000);
    var seconds = Math.floor((currentPos % 60000) / 1000);
    var formattedTime =
      ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

    var leftPlayerTimer = document.querySelector(".audio-player-info-left");
    leftPlayerTimer.innerHTML = formattedTime;

    var totalMinutes = Math.floor(totalDuration / 60000);
    var totalSeconds = Math.floor((totalDuration % 60000) / 1000);
    var totalFormattedTime =
      ("0" + totalMinutes).slice(-2) + ":" + ("0" + totalSeconds).slice(-2);

    var rightPlayerTimer = document.querySelector(".audio-player-info-right");
    rightPlayerTimer.innerHTML = totalFormattedTime;

    var progressMeter = document.querySelector(".audio-player-progressmeter");
    var progressPercentage = (currentPos / totalDuration) * 100;
    progressMeter.style.width = progressPercentage + "%";
    progressMeter.style.backgroundColor = "red";
  }
  // const loader = document.querySelector(".player-loader");
  // loader.style.display = "none";
  const attachPlayTrackEvent = function (
    trackItem,
    track,
    accessToken,
    volume
  ) {
    trackItem.addEventListener("click", function () {
      // Call a function to play the selected track
      loader.style.display = "block";
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
      loader.style.display = "none";
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

          var currentPos = state.position;
          var minutes = Math.floor(currentPos / 60000);
          var seconds = Math.floor((currentPos % 60000) / 1000);
          var formattedTime =
            ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

          var leftPlayerTimer = document.querySelector(
            ".audio-player-info-left"
          );
          leftPlayerTimer.innerHTML = formattedTime;
          var totalDuration = state.duration;
          var totalMinutes = Math.floor(totalDuration / 60000);
          var totalSeconds = Math.floor((totalDuration % 60000) / 1000);
          var totalFormattedTime =
            ("0" + totalMinutes).slice(-2) +
            ":" +
            ("0" + totalSeconds).slice(-2);

          var rightPlayerTimer = document.querySelector(
            ".audio-player-info-right"
          );
          rightPlayerTimer.innerHTML = totalFormattedTime;
          // console.log("Total duration of the song", totalFormattedTime);
          // console.log("Currently position playing", formattedTime);

          // Update the time
          updateTime(currentPos, totalDuration);

          // Seek when the progress bar is clicked
          document
            .querySelector(".audio-player-progressbar")
            .addEventListener("click", function (e) {
              var percent = e.offsetX / this.offsetWidth;
              var newCurrentPos = percent * totalDuration;
              player.seek(newCurrentPos).then(() => {
                // console.log("Changed position!");
              });
            });

          // console.log("Current state", state);
        });
      }, 1000);

      document
        .querySelector(".custom-input-range")
        .addEventListener("input", function () {
          var volumeValue = parseFloat(this.value);
          player.setVolume(volumeValue).then(() => {
            console.log("Volume changed to", volumeValue);
          });
        });
    });

    // Connect to the player
    player.connect().then((success) => {
      if (success) {
        console.log("The Web Playback SDK successfully connected to Spotify!");
      }
    });
    document.querySelector(".playBtn").addEventListener("click", () => {
      player.togglePlay().then(() => {
        console.log("Toggled playback!");
      });
    });

    document.querySelector(".pauseBtn").addEventListener("click", () => {
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

  async function getNext(currentlyPlaying) {
    console.log("music player currenly playing", currentlyPlaying);
  }