// API Controller Module
const APIController = (function () {
  const _getConnectedUserPlaylists = async (accessToken) => {
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await result.json();
    return data.items;
  };

  const _getTopTracks = async (accessToken) => {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await result.json();
    return data.items;
  };
  const _getUserProfile = async (accessToken) => {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await result.json();
    return data;
  };
  const _getRecentlyPlayedTracks = async (accessToken) => {
    const result = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const data = await result.json();
    return data;
  };
  const _getCurrentlyPlaying = async (accessToken) => {
    try {
      const result = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      // Check if response status is OK
      if (!result.ok) {
        throw new Error("Error fetching currently playing song");
      }

      const data = await result.json();
      return data;
    } catch (error) {
      console.error("Error fetching currently playing song:", error.message);
      return null; // Return null or handle the error as needed
    }
  };

  // Add more private methods for additional functionalities

  return {
    getConnectedUserPlaylists(accessToken) {
      return _getConnectedUserPlaylists(accessToken);
    },

    getTopTracks(accessToken) {
      return _getTopTracks(accessToken);
    },
    getUserProfile(accessToken) {
      return _getUserProfile(accessToken);
    },
    getRecentlyPlayedTracks(accessToken) {
      return _getRecentlyPlayedTracks(accessToken);
    },
    getCurrentlyPlaying(accessToken) {
      return _getCurrentlyPlaying(accessToken);
    },

    // Add more public methods for additional functionalities
  };
})();

// UI Module
const UIController = (function () {
  const DOMElements = {
    connectBtn: "#connectBtn",
    playlistsContainer: ".playlist-container",
    topTracksContainer: "#topTracks",
    userProfileContainer: "#profile-name-container",
    recentlyPlayedContainer: "#recentlyPlayedContainer",
    togglePlaying: ".togglePlay",
    artistName: ".song-album-name",
    currentSong: ".song-title",
    songAuthor: ".song-author",
    // Add more selectors as needed
    // Add more selectors as needed
  };
  const attachPlayTrackEvent = function (trackItem, track, accessToken) {
    trackItem.addEventListener("click", function () {
      // Call a function to play the selected track
      playTrack(accessToken, track.uri);
    });
  };
  const playTrack = function (accessToken, trackUri) {
    const player = new Spotify.Player({
      name: "Your App Name",
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
    });
    // window.onSpotifyWebPlaybackSDKReady = (accessToken, trackUri) => {
    //   const player = new Spotify.Player({
    //     name: "Web Playback SDK Quick Start Player",
    //     getOAuthToken: (cb) => {
    //       cb(accessToken);
    //     },
    //     volume: 0.5,
    //   });

    // Error handling
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

    // Playback status updates
    player.addListener("player_state_changed", (state) => {
      console.log(state);
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      // Play the selected track
      playOnDevice(accessToken, device_id, trackUri);
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

  return {
    inputField: function () {
      return {
        connectBtn: document.querySelector(DOMElements.connectBtn),
        playlistsContainer: document.querySelector(
          DOMElements.playlistsContainer
        ),
        topTracksContainer: document.querySelector(
          DOMElements.topTracksContainer
        ),
        userProfileContainer: document.querySelector(
          DOMElements.userProfileContainer
        ),
        recentlyPlayedContainer: document.querySelector(
          DOMElements.recentlyPlayedContainer
        ),
        togglePlaying: document.querySelector(DOMElements.togglePlaying),
        artistName: document.querySelector(DOMElements.artistName),
        currentSong: document.querySelector(DOMElements.currentSong),
        songAuthor: document.querySelector(DOMElements.songAuthor),

        // Add more selectors as needed
      };
    },

    // UI-related methods for displaying information
    displayUserPlaylists: function (playlists) {
      const playlistsContainer = document.querySelector(
        DOMElements.playlistsContainer
      );
      playlistsContainer.innerHTML = ""; // Clear existing content

      playlists.forEach((playlist) => {
        const playlistItem = document.createElement("div");
        playlistItem.innerHTML = `
        <div class="playlist-short-container">
                <div class="playlist-icon-container">
                    <div class="playlist-icon-inner-container">
                        <i class="fa-regular fa-user playlist-icon"></i>
                    </div>
                </div>

                <div>
                    <h3 class="playlist-name">${playlist.name}</h3>
                    <p class="playlist-names">some other names</p>
                    <p class="playlist-names">some other names</p>
                    <div class="music-playlist-icon">
                        <i class="fa-solid fa-music music-playlist-icon"></i>
                        <p class="playlist-names">song name</p>

                    </div>

                </div>
                <div class="playlist-song-time">
                    <span class="song-time">37 m</span>
                </div>
            </div>
        `;
        playlistsContainer.appendChild(playlistItem);
      });
    },

    displayTopTracks: function (topTracks) {
      const topTracksContainer = document.querySelector(
        DOMElements.topTracksContainer
      );
      topTracksContainer.innerHTML = ""; // Clear existing content

      topTracks.forEach((track) => {
        const trackItem = document.createElement("div");
        trackItem.innerHTML = `<p>${track.name} by ${track.artists[0].name}</p>`;
        topTracksContainer.appendChild(trackItem);
      });
    },
    displayUserProfile: function (userProfile) {
      const userProfileContainer = document.querySelector(
        DOMElements.userProfileContainer
      );
      userProfileContainer.innerHTML = ""; // Clear existing content

      const profileItem = document.createElement("div");
      profileItem.setAttribute("class", "flex items-center");
      if (userProfile.images) {
        profileItem.innerHTML = `
                <img src="${userProfile.images[0].url}" class="profile-image" alt="Profile Image">
                
                <a href="${userProfile.external_urls.spotify}" id="profile-name" class= "text-[#bdc0c0]">${userProfile.display_name}</a>
                `;
      }
      userProfileContainer.appendChild(profileItem);
      //   console.log(userProfile);
    },
    displayRecentlyPlayedTracks: function (recentlyPlayedTracks, accessToken) {
      const recentlyPlayedContainer = document.querySelector(
        DOMElements.recentlyPlayedContainer
      );
      recentlyPlayedContainer.innerHTML = ""; // Clear existing content

      recentlyPlayedTracks.items.forEach((track) => {
        const trackItem = document.createElement("div");
        trackItem.innerHTML = `<p>${track.track.name} by ${track.track.artists[0].name}</p>`;
        recentlyPlayedContainer.appendChild(trackItem);

        // Make the track clickable
        // console.log(recentlyPlayedTracks);
        // console.log(accessToken);
        attachPlayTrackEvent(trackItem, track.track, accessToken);
      });
    },
    displayArtistName: function (currentlyPlaying) {
      const artistNameElement = document.querySelector(DOMElements.artistName);
      const audioPlayerArtistName = document.querySelector(
        DOMElements.songAuthor
      );
      audioPlayerArtistName.innerHTML = "";
      artistNameElement.innerHTML = "";

      const artistName = currentlyPlaying.item.artists[0].name;
      artistNameElement.innerHTML = artistName;
      audioPlayerArtistName.innerHTML = artistName;
    },
    displayCurrentSongName: function (currentlyPlaying) {
      const currentSongElement = document.querySelector(
        DOMElements.currentSong
      );

      currentlyPlaying.innerHTML = "";
      const songName = currentlyPlaying.item.name;
      currentSongElement.innerHTML = songName;
    },

    // Add more UI-related methods for additional functionalities
  };
})();

// APP Controller Module
const APPController = (async function (UICtrl, APICtrl) {
  const DOMInputs = UICtrl.inputField();

  DOMInputs.connectBtn.addEventListener("click", connectToSpotify);

  async function connectToSpotify() {
    const clientId = "23ab69c678df492d958a9220fb60bfe9";
    const redirectUri = "http://localhost:5000/callback";
    const scope =
      "playlist-read-private user-top-read user-read-private user-read-email user-read-recently-played user-read-currently-playing user-modify-playback-state user-read-playback-state streaming"; // Add additional scopes if needed

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;

    // } else {
    //   document.querySelector(".logo-link").setAttribute("href", "/");
    // }

    // Redirect the user to the Spotify authorization page
    window.location.href = authUrl;

    // After the user is redirected back
    window.addEventListener("load", async () => {
      if (accessToken) {
        const userType = await APICtrl.getUserProfile(accessToken);

        if (userType.product === "premium") {
          // redirect to home screen
          window.location.href = authUrl;
        } else {
          // redirect to free subscription page
          window.location.href = "/free-subscription";
        }
      }
    });

    // if (authUrl) {
    // }
  }

  const accessToken = new URLSearchParams(
    window.location.hash.substring(1)
  ).get("access_token");

  document
    .querySelector(".logo-link")
    .setAttribute("href", window.location.href);
  // const accessToken = new URLSearchParams(
  //   window.location.hash.substring(1)
  // ).get("access_token");

  if (accessToken) {
    const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);
    UICtrl.displayUserPlaylists(playlists);

    const topTracks = await APICtrl.getTopTracks(accessToken);
    UICtrl.displayTopTracks(topTracks);

    const userProfile = await APICtrl.getUserProfile(accessToken);
    UICtrl.displayUserProfile(userProfile);
    console.log(userProfile.product);

    const recentlyPlayedTracks = await APICtrl.getRecentlyPlayedTracks(
      accessToken
    );
    UICtrl.displayRecentlyPlayedTracks(recentlyPlayedTracks, accessToken);

    const currentlyPlaying = await APICtrl.getCurrentlyPlaying(accessToken);
    console.log("Currently Playing:", currentlyPlaying);
    UICtrl.displayArtistName(currentlyPlaying);
    UICtrl.displayCurrentSongName(currentlyPlaying);
    document.querySelector(".left-audio-player-img").innerHTML = `
    <img src="${currentlyPlaying.item.album.images[0].url}"
        class="current-song-artist-image"
        alt="singer_image">`;

    // Add more code to handle other functionalities
  }

  return {
    init: function () {
      console.log("App is starting");
    },
  };
})(UIController, APIController);

// APPController.init();
