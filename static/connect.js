// API Controller Module
const APIController = (function () {
  const _getConnectSearch = async (accessToken, query) => {
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
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

  const _getNewReleases = async (accessToken) => {
    const result = await fetch(
      "https://api.spotify.com/v1/browse/new-releases?limit=10",
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

  const _getArtist = async (accessToken, artistId) => {
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
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
    getConnectSearch(accessToken, query) {
      return _getConnectSearch(accessToken, query);
    },
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
    getArtist(accessToken, artistId) {
      return _getArtist(accessToken, artistId);
    },
    getNewReleases(accessToken) {
      return _getNewReleases(accessToken);
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
    leftAudioPlayerImg: ".left-audio-player-img",
    authorImage: ".author-image",
    mainImage: ".main",
    newReleasesImage: ".album-upper-image",
    newReleasesName: ".album-upper-name",
    newReleasesArtist: ".album-upper-artist",
    artistBioElement: ".song-album-description",
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
        leftAudioPlayerImg: document.querySelector(
          DOMElements.leftAudioPlayerImg
        ),
        authorImage: document.querySelector(DOMElements.authorImage),
        mainImage: document.querySelector(DOMElements.mainImage),
        newReleasesImage: document.querySelector(DOMElements.newReleasesImage),
        newReleasesName: document.querySelector(DOMElements.newReleasesName),
        newReleasesArtist: document.querySelector(
          DOMElements.newReleasesArtist
        ),
        artistBioElement: document.querySelector(DOMElements.artistBioElement),
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
      const currentSongElement = document.querySelectorAll(
        DOMElements.currentSong
      );

      currentlyPlaying.innerHTML = "";
      const songName = currentlyPlaying.item.name;
      currentSongElement.forEach(
        (currentSong) => (currentSong.innerHTML = songName)
      );
    },
    displayArtistImage: function (currentArtist) {
      const artistImageElement = document.querySelectorAll(
        DOMElements.leftAudioPlayerImg
      );
      const artistImage = document.querySelector(DOMElements.authorImage);
      const mainImage = document.querySelector(DOMElements.mainImage);
      artistImageElement.forEach((artistImage) => (artistImage.innerHTML = ""));

      const artistUrl = currentArtist.images[0].url;

      artistImage.style.backgroundImage = `url(${artistUrl})`;
      mainImage.style.backgroundImage = `url(${artistUrl})`;
      artistImageElement.forEach(
        (artistImage) =>
          (artistImage.innerHTML = `
      <img
            src="${artistUrl}"
            class="bottom-player-artist-image"
            alt="singer_image"
          />`)
      );
    },
    displayNewReleases: function (newReleases) {
      document
        .querySelectorAll(DOMElements.newReleasesImage)
        .forEach(
          (singleImage, index) =>
            (singleImage.innerHTML = `<img src="${newReleases.albums.items[index].images[0].url}" class="best-release-img" alt="singer_image">`)
        );
      document
        .querySelectorAll(DOMElements.newReleasesName)
        .forEach(
          (name, index) =>
            (name.innerHTML = newReleases.albums.items[index].name)
        );

      document
        .querySelectorAll(DOMElements.newReleasesArtist)
        .forEach((artist) => (artist.innerHTML = ""));
      document
        .querySelectorAll(DOMElements.newReleasesArtist)
        .forEach((artist, index) => {
          let artistNames = newReleases.albums.items[index].artists.map(
            (artist) => artist.name
          );
          artist.innerHTML += artistNames.join(", ");
        });
    },

    // Add more UI-related methods for additional functionalitiesUICtrl.inputField().newReleasesImage
  };
})();

// APP Controller Module
const APPController = (async function (UICtrl, APICtrl) {
  // const DOMInputs = UICtrl.inputField();

  // After the user is redirected back
  window.addEventListener("load", async () => {
    if (accessToken) {
      const userType = await APICtrl.getUserProfile(accessToken);

      if (userType.product !== "premium") {
        // redirect to free subscription page
        window.location.href = "/free-subscription";
      }
    }
  });

  const accessToken = new URLSearchParams(
    window.location.hash.substring(1)
  ).get("access_token");

  document
    .querySelector(".logo-link")
    .setAttribute("href", window.location.href);

  if (accessToken) {
    const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);
    UICtrl.displayUserPlaylists(playlists);
    console.log("playlists", playlists);

    // const topTracks = await APICtrl.getTopTracks(accessToken);
    // UICtrl.displayTopTracks(topTracks);

    const userProfile = await APICtrl.getUserProfile(accessToken);
    UICtrl.displayUserProfile(userProfile);

    // const recentlyPlayedTracks = await APICtrl.getRecentlyPlayedTracks(
    //   accessToken
    // );
    // UICtrl.displayRecentlyPlayedTracks(recentlyPlayedTracks, accessToken);

    const currentlyPlaying = await APICtrl.getCurrentlyPlaying(accessToken);

    const currentArtist = await APICtrl.getArtist(
      accessToken,
      currentlyPlaying.item.artists[0].id
    );

    UICtrl.displayArtistName(currentlyPlaying);
    UICtrl.displayCurrentSongName(currentlyPlaying);
    UICtrl.displayArtistImage(currentArtist);

    const newReleases = await APICtrl.getNewReleases(accessToken);
    console.log("New Releases : ", newReleases);
    UICtrl.displayNewReleases(newReleases);

    console.log("Name dak ly ", newReleases.albums.items[6].name);
    console.log(
      "Artist name dak ",
      newReleases.albums.items[6].artists[0].name
    );

    // getting artist bio data summary
    artistData(currentArtist.name);
  }

  return {
    init: function () {
      console.log("App is starting");
    },
  };
})(UIController, APIController);

// APPController.init();
