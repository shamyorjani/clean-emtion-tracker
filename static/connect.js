// API Controller Module
const APIController = (function () {
  const queries = [
    "Top songs",
    "Global Top songs",
    "Most Viewed Songs",
    "Trending",
    "Best song", // You can replace [Year] with a specific year, e.g., "Best of 2023"
    "Popular songs",
    "rated songs",
    "Top songs",
    "greatest songs",
    "song of the year", 
    "viral songs",
    "all time hits",
    "Top Hits",
    "Global Top",
    "Most Viewed Songs",
    "Trending",
    "Best of [Year]", // You can replace [Year] with a specific year, e.g., "Best of 2023"
    "Most Popular Tracks",
    "Chart Toppers",
    "Viral Hits",
    "All-Time Favorites",
    "Greatest Hits",
    "Essential Tracks",
    "Popular Songs",
    "Bestselling Singles",
    "Ultimate Playlist",
    "Top Rated Tracks",
    "Top Charting Songs",
    "Highly Rated Hits",
    "Hit Singles",
    "Top Tracks of All Time",
    "Classic Hits",
    "Fan Favorites",
    "Record-Breaking Hits",
    "Award-Winning Songs",
    "Golden Oldies",
    "Iconic Tracks",
    // Add more queries as needed
  ];

  const _getConnectSearch = async (accessToken, query = "", type) => {
    let url = `https://api.spotify.com/v1/search?`;

    // If a query is provided, use it, otherwise, select a random query from the array
    if (query) {
      url += `q=${query}&`;
    } else {
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
      url += `q=${encodeURIComponent(randomQuery)}&`;
    }

    url += `type=${type}&limit=15`;

    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

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
    getConnectSearch(accessToken, query, type) {
      return _getConnectSearch(accessToken, query, type);
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
    searchSongName: ".result-text h4", // Add the new selector for the h4 element
    searchArtistName: ".result-text h5", // Add the new selector for the h5 element
    searchSongImage: "result-image",
    // inputElement: ".search-inner-box-main input[type='text']",
    // playlistElement: ".every-result",
    // playlistHeading : ".search-result-heading",
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
        // inputElement: document.querySelector(DOMElements.inputElement),
        // playlistElement: document.querySelector(DOMElements.playlistElement),
        // playlistHeading: document.querySelector(DOMElements.playlistHeading),
        // Add more selectors as needed
      };
    },

    // Display Search recomendation

    // End of Display Search recomendation
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
      if (artistName.length > 10 && artistName.length < 15) {
        artistNameElement.style.fontSize = "1.2rem";
      } else if (artistName.length > 15) {
        artistNameElement.style.fontSize = "1rem";
      }
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
    // displaySearchRecommendation: function (searchMethod) {
    //   document
    //     .querySelectorAll(DOMElements.searchSongName)
    //     .forEach((element, index) => {
    //       let songName = searchMethod.tracks.items[index].album.name;
    //       if (songName.length > 30) {
    //         songName = songName.substring(0, 27) + "...";
    //       }
    //       element.innerHTML = songName;
    //     });
    //   document
    //     .querySelectorAll(DOMElements.searchArtistName)
    //     .forEach((element, index) => {
    //       let artistNames = searchMethod.tracks.items[index].album.artists
    //         .map((artist) => artist.name)
    //         .join(", ");
    //       if (artistNames.length > 18) {
    //         artistNames = artistNames.substring(0, 18) + "...";
    //       }
    //       element.innerHTML = artistNames;
    //     });
    //   document.querySelectorAll(".result-image").forEach((element, index) => {
    //     if (
    //       searchMethod.tracks.items[index] &&
    //       searchMethod.tracks.items[index].album &&
    //       searchMethod.tracks.items[index].album.images &&
    //       searchMethod.tracks.items[index].album.images[0] &&
    //       searchMethod.tracks.items[index].album.images[0].url
    //     ) {
    //       element.style.backgroundImage = `url(${searchMethod.tracks.items[index].album.images[0].url})`;
    //     }
    //   });

    //   //   const searchMethod = await APICtrl.getConnectSearch(accessToken, "love");
    //   // UICtrl.displaySearchRecommendation(searchMethod);

    //   // console.log("Search Method : ", searchMethod);
    //   // searchMethod.tracks.items.forEach((item) => {
    //   //   console.log("Search Image : ", item.album.images[0].url);
    //   // });
    //   // searchMethod.tracks.items.forEach((item) => {
    //   //   console.log("Search Name : ", item.album.name);
    //   // });

    //   // searchMethod.tracks.items.forEach((item) => {
    //   //   console.log("Search Artist Names:");
    //   //   const artistNames = item.album.artists.map((artist) => artist.name).join(", ");
    //   //   console.log(artistNames);
    //   // });
    // },
    // displaySearchRecommendation: function (searchMethod) {
    //   document
    //     .querySelectorAll(DOMElements.searchSongName)
    //     .forEach((element, index) => {
    //       let albumName = searchMethod.albums.items[index].name;
    //       if (albumName.length > 30) {
    //         albumName = albumName.substring(0, 27) + "...";
    //       }
    //       element.innerHTML = albumName;
    //     });
    //   document
    //     .querySelectorAll(DOMElements.searchArtistName)
    //     .forEach((element, index) => {
    //       let artistNames = searchMethod.albums.items[index].artists
    //         .map((artist) => artist.name)
    //         .join(", ");
    //       if (artistNames.length > 18) {
    //         artistNames = artistNames.substring(0, 18) + "...";
    //       }
    //       element.innerHTML = artistNames;
    //     });
    //   document.querySelectorAll(".result-image").forEach((element, index) => {
    //     if (
    //       searchMethod.albums.items[index] &&
    //       searchMethod.albums.items[index].images &&
    //       searchMethod.albums.items[index].images[0] &&
    //       searchMethod.albums.items[index].images[0].url
    //     ) {
    //       element.style.backgroundImage = `url(${searchMethod.albums.items[index].images[0].url})`;
    //     }
    //   });
    // },
    displaySearchRecommendation: function (searchMethod) {
      document
        .querySelectorAll(DOMElements.searchSongName)
        .forEach((element, index) => {
          let songName = searchMethod.playlists.items[index].name;
          if (songName.length > 30) {
            songName = songName.substring(0, 27) + "...";
          }
          element.innerHTML = songName;
        });
      document
        .querySelectorAll(DOMElements.searchArtistName)
        .forEach((element, index) => {
          let ownerName = searchMethod.playlists.items[index].owner.display_name;
          if (ownerName.length > 18) {
            ownerName = ownerName.substring(0, 18) + "...";
          }
          element.innerHTML = ownerName;
        });
      document.querySelectorAll(".result-image").forEach((element, index) => {
        if (
          searchMethod.playlists.items[index] &&
          searchMethod.playlists.items[index].images &&
          searchMethod.playlists.items[index].images[0] &&
          searchMethod.playlists.items[index].images[0].url
        ) {
          element.style.backgroundImage = `url(${searchMethod.playlists.items[index].images[0].url})`;
        }
      });
    },
    searchItemText: function () {
      document
        .querySelectorAll(DOMElements.searchSongName)
        .forEach((element) => {
          let songName = element.innerHTML;
          if (songName.length > 20) {
            element.innerHTML = songName.substring(0, 20) + "...";
          }
        });

      document
        .querySelectorAll(DOMElements.searchArtistName)
        .forEach((element) => {
          let artistName = element.innerHTML;
          if (artistName.length > 20) {
            element.innerHTML = artistName.substring(0, 20) + "...";
          }
        });
    },

    // Add more UI-related methods for additional functionalitiesUICtrl.inputField().newReleasesImage
  };
})();

// APP Controller Module
const APPController = (async function (UICtrl, APICtrl) {
  const DOMInputs = UICtrl.inputField();

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
  // const accessToken = new URLSearchParams(
  //   window.location.hash.substring(1)
  // ).get("access_token");

  if (accessToken) {
    const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);
    UICtrl.displayUserPlaylists(playlists);
    // console.log("playlists", playlists);
    UICtrl.searchItemText();

    // Search method
    // const searchMethod = await APICtrl.getConnectSearch(accessToken, "Sad");
    // UICtrl.displaySearchRecommendation(searchMethod);
    // const searchBarMethod = UICtrl.searchBarMethod();

    var inputElement = document.querySelector(
      '.search-inner-box-main input[type="text"]'
    );
    var playlistElement = document.querySelectorAll(".every-result");
    var playlistHeading = document.querySelectorAll(".search-result-heading");
    var searchList = ["Albums", "Playlists", "Songs"];

    async function updateSearchResults(inputValue) {
      var searchMethod;

      if (inputValue === "") {
        playlistHeading.forEach((singleElement, index) => {
          singleElement.innerHTML = index !== 0 ? "" : "Trending";
        });
        playlistElement.forEach((singleElement, index) => {
          singleElement.style.marginTop = index !== 0 ? "21px" : "0px";
        });
        // If the input value is empty, show default search results (e.g., "Sad")
        searchMethod = await APICtrl.getConnectSearch(accessToken, "", "playlist");
      } else {
        playlistHeading.forEach((singleElement, index) => {
          singleElement.innerHTML =
            index !== 0 ? searchList[index - 1] : "Trending";
        });
        playlistElement.forEach((singleElement, index) => {
          singleElement.style.marginTop = index !== 0 ? "0px" : "0px";
        });
        // Otherwise, perform search based on the input value
        searchMethod = await APICtrl.getConnectSearch(
          accessToken,
          inputValue,
          "playlist"
        );
      }

      UICtrl.displaySearchRecommendation(searchMethod);

      // Reset styles and headings
    }

    // Initial search with default query ("Sad")
    updateSearchResults("");

    inputElement.addEventListener("keyup", async function (event) {
      var inputValue = inputElement.value.trim();
      await updateSearchResults(inputValue);
    });

    document
      .querySelector(".navbar-clear-btn")
      .addEventListener("click", function () {
        inputElement.value = "";
        updateSearchResults("");
      });

    // console.log("Search Method : ", searchMethod);
    // searchMethod.tracks.items.forEach((item) => {
    // console.log("Search Image : ", item.album.images[0].url);
    // });
    // searchMethod.tracks.items.forEach((item) => {
    // console.log("Search Name : ", item.album.name);
    // });

    // searchMethod.tracks.items.forEach((item) => {
    // console.log("Search Artist Names:");
    // const artistNames = item.album.artists.map((artist) => artist.name).join(", ");
    // console.log(artistNames);
    // });

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
    // console.log("New Releases : ", newReleases);
    // UICtrl.displayNewReleases(newReleases);

    // UICtrl.inputField().newReleasesName.innerHTML = "karachi wala";
    // console.log("kam ka kam " , UICtrl.inputField().newReleasesName);
    console.log();
    // console.log("Name dak ly ", newReleases.albums.items[6].name);
    // console.log("Artist name dak ", currentArtist.name);
    artistData(currentArtist.name);

    // Call startPolling with your access token and polling interval
    // const startPolling = (accessToken, interval) => {
    //   setInterval(async () => {}, interval);
    // };
    // startPolling(accessToken, 5000);

    // searchMethodCheck = await APICtrl.getConnectSearch(
    //   accessToken,
    //   "heart broken",
    //   "album"
    // );
    // console.log("Search Method : ", searchMethodCheck);
    // const getAlbums = async (accessToken, query) => {
    //   const searchMethod = await APICtrl.getConnectSearch(
    //     accessToken,
    //     query,
    //     "album"
    //   );
    //   return searchMethod.albums.items;
    // };

    // const displayAlbums = (albums) => {
    //   albums.forEach((album) => {
    //     console.log("Album Image: ", album.images[0].url);
    //     console.log("Album Name: ", album.name);
    //     console.log(
    //       "Artist Names: ",
    //       album.artists.map((artist) => artist.name).join(", ")
    //     );
    //   });
    // };

    // const searchAndDisplayAlbums = async (accessToken, query) => {
    //   const albums = await getAlbums(accessToken, query);
    //   displayAlbums(albums);
    // };

    // // Usage example
    // searchAndDisplayAlbums(accessToken, "love");



    // const getPlaylists = async (accessToken, query) => {
    //   const searchMethod = await APICtrl.getConnectSearch(
    //   accessToken,
    //   query,
    //   "playlist"
    //   );
    //   return searchMethod.playlists.items;
    // };

    // const displayPlaylists = (playlists) => {
    //   playlists.forEach((playlist) => {
    //   console.log("Playlist Image: ", playlist.images[0].url);
    //   console.log("Playlist Name: ", playlist.name);
    //   console.log(
    //     "Artist Names: ",
    //     playlist.owner.display_name
    //   );
    //   });
    // };

    // const searchAndDisplayPlaylists = async (accessToken, query) => {
    //   const playlists = await getPlaylists(accessToken, query);
    //   displayPlaylists(playlists);
    // };

    // // Usage example
    // searchAndDisplayPlaylists(accessToken, "heart broken");
  }
  return {
    init: function () {
      console.log("App is starting");
    },
  };
})(UIController, APIController);

// APPController.init();
