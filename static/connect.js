// API Controller Module
const APIController = (function () {
  const queries = [
    "Top songs",
    "Sad",
    "indian Songs",
    "Kawali",
    "pakistani songs",
    "Urdu Songs",
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
      "https://api.spotify.com/v1/browse/new-releases?limit=50",
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
      const randomNumber = Math.floor(Math.random() * 40) + 1;
      document
        .querySelectorAll(DOMElements.newReleasesImage)
        .forEach(
          (singleImage, index) =>
            (singleImage.innerHTML = `<img src="${newReleases.albums.items[index + randomNumber].images[0].url}" class="best-release-img" alt="singer_image">`)
        );
      document
        .querySelectorAll(DOMElements.newReleasesName)
        .forEach((name, index) => {
          let albumName = newReleases.albums.items[index + randomNumber].name;
          if (albumName.length > 30) {
        albumName = albumName.substring(0, 30) + "...";
          }
          name.innerHTML = albumName;
        });

      document
        .querySelectorAll(DOMElements.newReleasesArtist)
        .forEach((artist) => (artist.innerHTML = ""));
      document
        .querySelectorAll(DOMElements.newReleasesArtist)
        .forEach((artist, index) => {
          let artistNames = newReleases.albums.items[index + randomNumber].artists.map(
        (artist) => artist.name
          );
          if (artistNames.length > 14) {
        artistNames = artistNames.substring(0, 14) + "...";
          }
          artist.innerHTML += artistNames.join(", ");
        });

      
    },
    displaySearchRecommendation: function (searchMethod) {
      document
        .querySelectorAll(DOMElements.searchSongName)
        .forEach((element, index) => {
          let songName = searchMethod.tracks.items[index].name;
          if (songName.length > 30) {
            songName = songName.substring(0, 27) + "...";
          }
          element.innerHTML = songName;
        });
      document
        .querySelectorAll(DOMElements.searchArtistName)
        .forEach((element, index) => {
          let artistNames = searchMethod.tracks.items[index].artists
            .map((artist) => artist.name)
            .join(", ");
          if (artistNames.length > 14) {
            artistNames = artistNames.substring(0, 14) + "...";
          }
          element.innerHTML = artistNames;
        });
      document.querySelectorAll(".result-image").forEach((element, index) => {
        if (
          searchMethod.tracks.items[index] &&
          searchMethod.tracks.items[index].album &&
          searchMethod.tracks.items[index].album.images &&
          searchMethod.tracks.items[index].album.images[0] &&
          searchMethod.tracks.items[index].album.images[0].url
        ) {
          element.style.backgroundImage = `url(${searchMethod.tracks.items[index].album.images[0].url})`;
        }
      });
    },
    displaySearchSongs: function (searchMethod) {
      document
          .querySelectorAll(".result-text h4")
          .forEach((element, index) => {
            if (index < 3 || index >= 9) {
              let songName;
              if (index >= 9) {
                songName = searchMethod.tracks.items[index - 9].name;
              } else {
                songName = searchMethod.tracks.items[index].name;
              }
              if (songName.length > 30) {
                songName = songName.substring(0, 27) + "...";
              }
              element.innerHTML = songName;
            }
          });
        document
          .querySelectorAll(".result-text h5")
          .forEach((element, index) => {
            if (index < 3 || index >= 9) {
              let artistNames;
              if (index >= 9) {
                artistNames = searchMethod.tracks.items[index - 6].artists
                  .map((artist) => artist.name)
                  .join(", ");
              } else {
                artistNames = searchMethod.tracks.items[index].artists
                  .map((artist) => artist.name)
                  .join(", ");
              }
              if (artistNames.length > 14) {
                artistNames = artistNames.substring(0, 14) + "...";
              }

              element.innerHTML = artistNames;
            }
          });
        document.querySelectorAll(".result-image").forEach((element, index) => {
          if (
            index < 3 &&
            searchMethod.tracks.items[index] &&
            searchMethod.tracks.items[index].album &&
            searchMethod.tracks.items[index].album.images &&
            searchMethod.tracks.items[index].album.images[0] &&
            searchMethod.tracks.items[index].album.images[0].url
          ) {
            element.style.backgroundImage = `url(${searchMethod.tracks.items[index].album.images[0].url})`;
          } else if (
            index >= 6 &&
            searchMethod.tracks.items[index - 6] &&
            searchMethod.tracks.items[index - 6].album &&
            searchMethod.tracks.items[index - 6].album.images &&
            searchMethod.tracks.items[index - 6].album.images[0] &&
            searchMethod.tracks.items[index - 6].album.images[0].url
          ) {
            element.style.backgroundImage = `url(${
              searchMethod.tracks.items[index - 6].album.images[0].url
            })`;
          }
        });
    },
    displaySearchAlbums: function (searchMethod) {
      document
            .querySelectorAll(".result-text h4")
            .forEach((element, index) => {
              if (index >= 3 && index < 6) {
              let albumName = searchMethod.albums.items[index - 3].name;
              if (albumName.length > 30) {
                albumName = albumName.substring(0, 27) + "...";
              }
              element.innerHTML = albumName;
              }
            });
            document
            .querySelectorAll(".result-text h5")
            .forEach((element, index) => {
              if (index >= 3 && index < 6) {
              let artistNames = searchMethod.albums.items[index - 3].artists
                .map((artist) => artist.name)
                .join(", ");
              if (artistNames.length > 18) {
                artistNames = artistNames.substring(0, 18) + "...";
              }
              element.innerHTML = artistNames;
              }
            });
          document.querySelectorAll(".result-image").forEach((element, index) => {
            if (
              index >= 3 && index < 6 &&
              searchMethod.albums.items[index - 3] &&
              searchMethod.albums.items[index - 3].images &&
              searchMethod.albums.items[index - 3].images[0] &&
              searchMethod.albums.items[index - 3].images[0].url
            ) {
              element.style.backgroundImage = `url(${searchMethod.albums.items[index - 3].images[0].url})`;
            }
          });
    },
    displaySearchPlaylists: function (searchMethod) {
      document
      .querySelectorAll(".result-text h4")
      .forEach((element, index) => {
        if (index >= 6 && index < 9) {
          let songName = searchMethod.playlists.items[index - 6].name;
          if (songName.length > 30) {
            songName = songName.substring(0, 27) + "...";
          }
          element.innerHTML = songName;
        }
      });
    document
      .querySelectorAll(".result-text h5")
      .forEach((element, index) => {
        if (index >= 6 && index < 9) {
          let ownerName =
            searchMethod.playlists.items[index - 6].owner.display_name;
          if (ownerName.length > 14) {
            ownerName = ownerName.substring(0, 14) + "...";
          }
          element.innerHTML = ownerName;
        }
      });
    document.querySelectorAll(".result-image").forEach((element, index) => {
      if (
        index >= 6 &&
        index < 9 &&
        searchMethod.playlists.items[index - 6] &&
        searchMethod.playlists.items[index - 6].images &&
        searchMethod.playlists.items[index - 6].images[0] &&
        searchMethod.playlists.items[index - 6].images[0].url
      ) {
        element.style.backgroundImage = `url(${
          searchMethod.playlists.items[index - 6].images[0].url
        })`;
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

    // variables
    var inputElement = document.querySelector(
      '.search-inner-box-main input[type="text"]'
    );
    var playlistElement = document.querySelectorAll(".every-result");
    var playlistHeading = document.querySelectorAll(".search-result-heading");
    var searchList = ["Albums", "Playlists", "Songs"];

    //  Functions
    // Function to update search results
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
        searchMethod = await APICtrl.getConnectSearch(accessToken, "", "track");
        UICtrl.displaySearchRecommendation(searchMethod);
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
          "track"
        );
        UICtrl.displaySearchSongs(searchMethod);

        searchMethod = await APICtrl.getConnectSearch(
          accessToken,
          inputValue,
          "album"
        );
        UICtrl.displaySearchAlbums(searchMethod);

        searchMethod = await APICtrl.getConnectSearch(
          accessToken,
          inputValue,
          "playlist"
        );
        UICtrl.displaySearchPlaylists(searchMethod);
      }
      // console.log("input", inputElement);
      UICtrl.displaySearchRecommendation(searchMethod);

      // Reset styles and headings
    }
    updateSearchResults("");
    inputElement.addEventListener("keyup", async function (event) {
      var inputValue = inputElement.value.trim();
      await updateSearchResults(inputValue);
    });


    // async function searchAlbumsNewReleases(inputValue) {
    //   let searchMethod = await APICtrl.getConnectSearch(accessToken, inputValue, "album");
    //   // document
    //   // .querySelectorAll(".album-upper-name")
    //   // .forEach((element, index) => {
    //   //   let albumName = searchMethod.albums.items[index].name;
    //   //   if (albumName.length > 30) {
    //   //     albumName = albumName.substring(0, 27) + "...";
    //   //   }
    //   //   element.innerHTML = albumName;
    //   // });
    //   // document
    //   // .querySelectorAll(".album-upper-artist")
    //   // .forEach((element, index) => {
    //   //   let artistNames = searchMethod.albums.items[index].artists
    //   //     .map((artist) => artist.name)
    //   //     .join(", ");
    //   //   if (artistNames.length > 18) {
    //   //     artistNames = artistNames.substring(0, 18) + "...";
    //   //   }
    //   //   element.innerHTML = "pakisfdkl";
    //   // });
      
    // document.querySelectorAll(".album-upper-image").forEach((element, index) => {
    //   if (
    //     index >= 3 && index < 6 &&
    //     searchMethod.albums.items[index - 3] &&
    //     searchMethod.albums.items[index - 3].images &&
    //     searchMethod.albums.items[index - 3].images[0] &&
    //     searchMethod.albums.items[index - 3].images[0].url
    //   ) {
    //     element.innerHTML = `<img src="${newReleases.albums.items[index + randomNumber].images[0].url}" class="best-release-img" alt="singer_image">`;
    //   }
    // });
      
    // }
    // inputValue = "love";
    // await searchAlbumsNewReleases(inputValue);
    // Enter button for search
    inputElement.addEventListener("keydown", async function (event) {
      if (event.key === "Enter") {
        const inputValue = inputElement.value.trim();
        // console.log();
        // await searchAlbumsNewReleases(inputValue);
      }
    });

     
    document
      .querySelector(".navbar-clear-btn")
      .addEventListener("click", function () {
        inputElement.value = "";
        updateSearchResults("");
      });

    // APPController.init();
    const userProfile = await APICtrl.getUserProfile(accessToken);
    const currentlyPlaying = await APICtrl.getCurrentlyPlaying(accessToken);
    const currentArtist = await APICtrl.getArtist(
      accessToken,
      currentlyPlaying.item.artists[0].id
    );
    const newReleases = await APICtrl.getNewReleases(accessToken);

    // UICtrl display methods
    UICtrl.displayUserProfile(userProfile);
    UICtrl.displayArtistName(currentlyPlaying);
    UICtrl.displayCurrentSongName(currentlyPlaying);
    UICtrl.displayArtistImage(currentArtist);
    UICtrl.displayUserPlaylists(playlists);
    UICtrl.searchItemText();
    UICtrl.displayNewReleases(newReleases);


    artistData(currentArtist.name);
  }
  return {
    init: function () {
      console.log("App is starting");
    },
  };
})(UIController, APIController);


// APPController.init();
