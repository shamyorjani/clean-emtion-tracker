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

  const _setRepeatMode = async function (accessToken, state) {
    const repeatEndpoint = `https://api.spotify.com/v1/me/player/repeat?state=${state}`;

    const result = await fetch(repeatEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (result.ok) {
      console.log("Repeat mode set to", state);
    } else {
      console.error("Failed to set repeat mode");
    }
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
      "https://api.spotify.com/v1/browse/new-releases?limit=40",
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
  const _getNext = async (accessToken) => {
    const result = await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await result.json();
    return data;
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
    getNext(accessToken) {
      return _getNext(accessToken);
    },
    setRepeatMode(accessToken, state) {
      return _setRepeatMode(accessToken, state);
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
  return {
    // Display Search recomendation

    // End of Display Search recomendation
    // UI-related methods for displaying information

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

    // Add more UI-related methods for additional functionalitiesUICtrl.inputField().newReleasesImage
  };
})();

// APP Controller Module
const APPController = (async function (UICtrl, APICtrl) {
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
        displaySearchRecommendation(searchMethod);
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
        displaySearchSongs(searchMethod);

        searchMethod = await APICtrl.getConnectSearch(
          accessToken,
          inputValue,
          "album"
        );
        displaySearchAlbums(searchMethod);

        searchMethod = await APICtrl.getConnectSearch(
          accessToken,
          inputValue,
          "playlist"
        );
        displaySearchPlaylists(searchMethod);
      }
      // console.log("input", inputElement);
      displaySearchRecommendation(searchMethod);

      // Reset styles and headings
    }
    updateSearchResults("");
    inputElement.addEventListener("keyup", async function (event) {
      var inputValue = inputElement.value.trim();
      await updateSearchResults(inputValue);
    });

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

    // UICtrl display methods
    setInterval(async () => {
      const userProfile = await APICtrl.getUserProfile(accessToken);
      const currentlyPlaying = await APICtrl.getCurrentlyPlaying(accessToken);
      // console.log("currentlyPlaying", currentlyPlaying);
      const currentArtist = await APICtrl.getArtist(
        accessToken,
        currentlyPlaying.item.artists[0].id
      );

      const currentAlbum = currentlyPlaying.item.album.images[0].url;
      const newReleases = await APICtrl.getNewReleases(accessToken);
      artistData(currentArtist.name);

      displayUserProfile(userProfile);
      displayArtistName(currentlyPlaying);
      displayCurrentSongName(currentlyPlaying);
      displayArtistImage(currentAlbum);
      displayUserPlaylists(playlists);
      searchItemText();
      displayNewReleases(newReleases);
    }, 12000);

    const topTracks = await APICtrl.getTopTracks(accessToken);
    console.log("top tracks", topTracks[0].uri);

    const playsong = document.querySelector(".playsong");

    attachPlayTrackEvent(playsong, topTracks[0], accessToken);

    const nextButtons = document.querySelectorAll(".nextBtn");
    const prevButtons = document.querySelectorAll(".previousBtn");
    let next = 0;
    let prev = topTracks.length - 1;
    nextButtons.forEach((nextButton) => {
      nextButton.addEventListener("click", async () => {
        next++;
        if (next >= topTracks.length) {
          next = 0;
        }
        attachPlayTrackEvent(nextButton, topTracks[next], accessToken);
      });
    });
    prevButtons.forEach((prevButton) => {
      prevButton.addEventListener("click", async () => {
        prev--;
        if (prev < 0) {
          prev = topTracks.length - 1;
        }
        attachPlayTrackEvent(prevButton, topTracks[prev], accessToken);
      });
    });

    const repeatBtn = document.querySelector(".repeatBtn");
    repeatBtn.addEventListener("click", async () => {
      await APICtrl.setRepeatMode(accessToken, "context");
      console.log("repeat enabled");
    });
    // Function to shuffle an array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Shuffle button event listener
    var shuffleBtn = document.querySelector(".shuffleBtn");
    shuffleBtn.addEventListener("click", () => {
      // Shuffle the topTracks array
      const shuffledTracks = shuffleArray(topTracks);

      // Play the first track in the shuffled array
      attachPlayTrackEvent(shuffleBtn, shuffledTracks[0], accessToken);
    });
  }
  return {
    init: function () {
      console.log("App is starting");
    },
  };
})(UIController, APIController);

// APPController.init();
