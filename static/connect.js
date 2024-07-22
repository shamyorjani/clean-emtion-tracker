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

    url += `type=${type}&limit=20`;

    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await result.json();
    return data;
  };
  const _getAlbumTracks = async (accessToken, albumId) => {
    const result = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const data = await result.json();
    return data.items;
  };

  const _getTrack = async (accessToken, trackId) => {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const data = await result.json();
    return data;
  };

  const _getAlbum = async (accessToken, albumId) => {
    const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
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

  const _getPlaylistTracks = async (accessToken, playlist_id) => {
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
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

  const _getPlaylistImage = async (accessToken, playlist_id) => {
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/images`,
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

  const _getArtistTopTracks = async (accessToken, artistId) => {
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
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
      "https://api.spotify.com/v1/me/player/recently-played?limit=6",
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
        throw new Error(
          `Error fetching currently playing song: ${result.status} ${result.statusText}`
        );
        throw new Error(
          `Error fetching currently playing song: ${result.status} ${result.statusText}`
        );
      }

      const text = await result.text(); // Read the response as text

      if (!text) {
        throw new Error("Empty response from currently playing song API");
      }

      const data = JSON.parse(text); // Parse the JSON from the text

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
    getAlbumTracks(accessToken, albumId) {
      return _getAlbumTracks(accessToken, albumId);
    },

    getTrack(accessToken, trackId) {
      return _getTrack(accessToken, trackId);
    },

    getAlbum(accessToken, albumId) {
      return _getAlbum(accessToken, albumId);
    },
    getConnectedUserPlaylists(accessToken) {
      return _getConnectedUserPlaylists(accessToken);
    },
    getPlaylistTracks(accessToken, playlist_id) {
      return _getPlaylistTracks(accessToken, playlist_id);
    },
    getPlaylistImage(accessToken, playlist_id) {
      return _getPlaylistImage(accessToken, playlist_id);
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
    getArtistTopTracks(accessToken, artistId) {
      return _getArtistTopTracks(accessToken, artistId);
    },

    // Add more public methods for additional functionalities
  };
})();
window.APIController = APIController;

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

    newReleasesImagePlaylist: ".album-upper-image-playlist",
    newReleasesNamePlaylist: ".album-upper-name-playlist",
    newReleasesArtistPlaylist: ".album-upper-artist-playlist",

    newReleasesImageArtist: ".upper-image-artist",
    newReleasesNameArtist: ".upper-name-artist",

    searchSongName: ".result-text h4", // Add the new selector for the h4 element
    searchArtistName: ".result-text h5", // Add the new selector for the h5 element
    searchSongImage: "result-image",
    // inputElement: ".search-inner-box-main input[type='text']",
    // playlistElement: ".every-result",
    // playlistHeading : ".search-result-heading",
    // Add more selectors as needed
  };

  return {
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
  };
})();

// APP Controller Module
const APPController = (async function (UICtrl, APICtrl) {
  // After the user is redirected back
  window.addEventListener("load", async () => {
    if (accessToken) {
      const userType = await APICtrl.getUserProfile(accessToken);
      // let accessToken;

      if (userType.product !== "premium") {
        // redirect to free subscription page
        window.location.href = "/free-subscription";
      }
    }
  });

  const accessToken = new URLSearchParams(
    window.location.hash.substring(1)
  ).get("access_token");
  window.accessToken = accessToken;

  if (!accessToken) {
    // window.location.href = "/connect";
    connectToSpotify();
  }

  let searchMethod = await APICtrl.getConnectSearch(
    accessToken,
    "sad",
    "artist"
  );

  document
    .querySelector(".logo-link")
    .setAttribute("href", window.location.href);
  // const accessToken = new URLSearchParams(
  //   window.location.hash.substring(1)
  // ).get("access_token");

  if (accessToken) {
    const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);
    console.log("playlists", playlists);
    showPlaylists(playlists);
    var mobileCarousel = document.querySelector(".mobile-albums-list-carousel");
    mobileCarousel.innerHTML = "";

    for (let index = 0; index < 10; index++) {
      var newSlide = document.createElement("div");
      newSlide.className = "slide";
      newSlide.innerHTML = `
    <div class="carosuel-slide-class">
      <div class="album-upper-image border-none rounded-full">
        <img
          src="../static/assets/images/img1.jpeg"
          class="best-release-img"
          alt="singer_image"
        />
      </div>  
      <h2 class="album-upper-name">Lorem ipsum dolor sit amet.</h2>
      <h3 class="album-upper-artist">Lorem ipsum dolor.</h3>
    </div>
  `;
      mobileCarousel.appendChild(newSlide);
    }

    // Reinitialize the slick carousel after adding new slides
    $(".mobile-albums-list-carousel").slick("unslick");
    $(".mobile-albums-list-carousel").slick({
      // autoplay: true,
      // infinite: true,
      speed: 200,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
      variableWidth: false,
    });
    // variables
    var inputElement = document.querySelector(
      '.search-inner-box-main input[type="text"]'
    );
    var playlistElement = document.querySelectorAll(".every-result");
    var playlistHeading = document.querySelectorAll(".search-result-heading");
    var searchList = ["Albums", "Playlists", "Songs"];
    searchMethod = await APICtrl.getConnectSearch(
      accessToken,
      "love",
      "artist"
    );
    displayNewArtist(searchMethod);

    //  Functions
    // Function to update search results

    // Setting inputValues
    const eras = [
      "2020s",
      "2010s",
      "2000s",
      "1990s",
      "1980s",
      "1970s",
      "1960s",
      "1950s",
    ];
    const container = document.getElementById("eras-list");
    let selectedEra = "";
    let selectedSongType = "";
    let selectedLanguage = "";

    eras.forEach((era) => {
      const eraDiv = document.createElement("div");
      eraDiv.className =
        "relative flex cursor-default select-none items-center rounded py-1.5 pl-8 pr-2 hover:bg-neutral-100 hover:text-black outline-none";
      eraDiv.innerHTML = `
            <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-2 h-2 fill-current">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            </span>
            <span>${era}</span>
        `;
      eraDiv.querySelector("svg").style.display = "none";

      // Add click event listener to each eraDiv
      eraDiv.addEventListener("click", function () {
        // Hide all SVGs
        const allSvgs = container.querySelectorAll("svg");
        allSvgs.forEach((svg) => (svg.style.display = "none"));

        // Show the clicked one
        const svg = eraDiv.querySelector("svg");
        svg.style.display = "block";
        selectedEra = era;
      });

      container.appendChild(eraDiv);
    });
    // Song types
    const songTypes = [
      "Hindustani Classical",
      "Carnatic Classical",
      "Bollywood Songs",
      "Devotional Music (Bhajans)",
      "Devotional Music (Sufi Music)",
      "Folk Music (Bhangra)",
      "Folk Music (Rajasthani Folk)",
      "Indi-pop",
      "Qawwali",
      "Ghazals",
      "Pakistani Film Music",
      "Folk Music (Punjabi Folk)",
      "Folk Music (Balochi Folk)",
      "Modern Pakistani Pop",
      "Sufi Music (Kafi)",
      "Sufi Music (Sufi Rock)",
    ];

    const songTypeContainer = document.getElementById("songs-list");

    songTypes.forEach((song) => {
      const songDiv = document.createElement("div");
      songDiv.className =
        "relative flex cursor-default select-none items-center rounded py-1.5 pl-8 pr-2 hover:bg-neutral-100 hover:text-black outline-none";
      songDiv.innerHTML = `
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-2 h-2 fill-current">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </span>
        <span>${song}</span>
      `;
      songDiv.querySelector("svg").style.display = "none";

      songDiv.addEventListener("click", function () {
        const allSvgs = songTypeContainer.querySelectorAll("svg");
        allSvgs.forEach((svg) => (svg.style.display = "none"));
        songDiv.querySelector("svg").style.display = "block";
        selectedSongType = song;
      });

      songTypeContainer.appendChild(songDiv);
    });
    // Song Language
    const languages = [
      "Urdu",
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Portuguese",
      "Japanese",
      "Korean",
      "Chinese",
      "Russian",
      "Arabic",
      "Dutch",
      "Swedish",
      "Norwegian",
      "Danish",
    ];
    const songLanguageContainer = document.getElementById("languages-list");

    languages.forEach((language) => {
      const languageDiv = document.createElement("div");
      languageDiv.className =
        "relative flex cursor-default select-none items-center rounded py-1.5 pl-8 pr-2 hover:bg-neutral-100 hover:text-black outline-none";
      languageDiv.innerHTML = `
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <span>${language}</span>
      `;
      languageDiv.querySelector("svg").style.display = "none";

      languageDiv.addEventListener("click", function () {
        const svg = languageDiv.querySelector("svg");
        if (svg.style.display === "none") {
          svg.style.display = "block";
          selectedLanguage = selectedLanguage + ", " + language;
        } else {
          svg.style.display = "none";
        }
      });

      songLanguageContainer.appendChild(languageDiv);
    });

    async function mainSearchMethod() {
      updateSearchResults(
        "",
        playlistHeading,
        playlistElement,
        APICtrl.getConnectSearch,
        displaySearchPlaylists,
        displaySearchRecommendation,
        displaySearchSongs,
        displaySearchAlbums,
        searchList,
        accessToken
      );
      inputElement.addEventListener("keyup", async function (event) {
        var inputValue = inputElement.value.trim();
        await updateSearchResults(
          inputValue,
          playlistHeading,
          playlistElement,
          APICtrl.getConnectSearch,
          displaySearchPlaylists,
          displaySearchRecommendation,
          displaySearchSongs,
          displaySearchAlbums,
          searchList,
          accessToken
        );
      });
    }
    mainSearchMethod();
    const album = await APICtrl.getAlbum(accessToken, "4OXoBlapQygTdzAifJm8BL");
    // console.log("album image", album.name);
    const albumTracks = await APICtrl.getAlbumTracks(
      accessToken,
      "4OXoBlapQygTdzAifJm8BL"
    );
    // displayAlbumTracks(albumTracks, accessToken, album.images[0].url);

    const durations = albumTracks.items
      ? albumTracks.items.map((track) => track.duration_ms)
      : [];
    // console.log("Durations:", durations);

    async function searchReleases(inputValue, type) {
      let searchMethod = await APICtrl.getConnectSearch(
        accessToken,
        inputValue,
        type
      );

      console.log("artist info", searchMethod.artists);
      if (type === "track") {
        displaySongsRecommendation(searchMethod);
      } else if (type === "album") {
        displayNewAlbum(searchMethod);
      } else if (type === "playlist") {
        displayNewPlaylist(searchMethod);
      } else if (type === "artist") {
        displayNewArtist(searchMethod);
      }
    }
    async function searchResults() {
      const inputValue = inputElement.value.trim();
      console.log("input value", inputValue);
      await searchReleases(inputValue, "album");
      await searchReleases(inputValue, "track");
      await searchReleases(inputValue, "playlist");
      await searchReleases(inputValue, "artist");
    }
    async function updateResults(final_input) {
      await searchReleases(final_input, "album");
      await searchReleases(final_input, "track");
      await searchReleases(final_input, "playlist");
      await searchReleases(final_input, "artist");
    }
    const detected_emotion = document
      .getElementById("detected_emotion")
      .getAttribute("data-emotion");
    // console.log('emotion edetected dsfsa +++++>>> ', detected_emotion.textContent);
    updateResults(detected_emotion);
    const dropdownMenu = document.getElementById("dropdown-menu");
    const updateButton = document.getElementById("update-button");
    if (updateButton) {
      updateButton.addEventListener("click", async function () {
        simulateScroll("down");
        let final_input =
          detected_emotion +
          selectedEra +
          " " +
          selectedSongType +
          " in " +
          selectedLanguage;
        dropdownMenu.classList.add("hidden");
        dropdownMenu.classList.remove("hidden");
        // console.log("final_input", final_input);
        await updateResults(final_input);
      });
      inputElement.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") {
          searchResults();
        }
      });
      searchMethod = await APICtrl.getConnectSearch(accessToken, "", "track");
      displaySongsRecommendation(searchMethod);

      const hideContainer = document.querySelectorAll(
        ".album-playlist-main-container"
      );

      var mickSelect = document.getElementById("mic-id");
      var mickToggle = document.getElementById("start");
      var recognition = new webkitSpeechRecognition();
      recognition.lang = window.navigator.language;
      recognition.interimResults = true;

      let toggle = false;
      mickToggle.addEventListener("click", () => {
        if (toggle) {
          mickSelect.style.color = "red";
          recognition.start();
        } else {
          mickSelect.style.color = "white";
          recognition.stop();
        }
        toggle = !toggle;
      });

      recognition.addEventListener("result", async (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        inputElement.value = result;
        await updateSearchResults(result);
      });
      recognition.addEventListener("end", () => {
        mickSelect.style.color = "white";
      });

      const tabs = document.querySelectorAll("#tabs a");
      tabs.forEach((tab) => {
        tab.addEventListener("click", async function (event) {
          event.preventDefault();
          tabs.forEach((t) => {
            t.classList.remove("active-tab");
            const activeDiv = t.parentElement.querySelector(".active");
            const hrElement = activeDiv.querySelector("hr");
            if (hrElement) {
              hrElement.remove();
            }
          });
          // Add 'active-tab' class to the clicked tab
          tab.classList.add("active-tab");

          // Log the active tab name
          console.log("Active Tab:", tab.getAttribute("data-tab"));

          // Add hr element to the active tab
          const activeDiv = tab.parentElement.querySelector(".active");
          const hrElement = document.createElement("hr");
          hideContainer.forEach((container) => {
            container.style.display = "flex";
          });
          if (tab.getAttribute("data-tab") === "overview") {
            hrElement.classList.add("hrElementTab");
            activeDiv.appendChild(hrElement);
            hideContainer.forEach((container) => {
              container.style.display = "flex";
            });
            let value = inputElement.value;
            await searchReleases(value, "track");
          } else if (tab.getAttribute("data-tab") === "sad-songs") {
            hrElement.classList.add("hrElementTab");
            activeDiv.appendChild(hrElement);
            hideContainer.forEach((container) => {
              container.style.display = "none";
            });

            await searchReleases("sad songs", "track");
          } else if (tab.getAttribute("data-tab") === "romantic-songs") {
            hrElement.classList.add("hrElementTab");
            activeDiv.appendChild(hrElement);
            hideContainer.forEach((container) => {
              container.style.display = "none";
            });
            await searchReleases("romantic songs", "track");
          } else if (tab.getAttribute("data-tab") === "heartbreaks") {
            hrElement.classList.add("hrElementTab");
            activeDiv.appendChild(hrElement);
            hideContainer.forEach((container) => {
              container.style.display = "none";
            });
            await searchReleases("heart broken songs", "track");
          } else if (tab.getAttribute("data-tab") === "angry-mood") {
            hrElement.classList.add("hrElementTab");
            activeDiv.appendChild(hrElement);
            hideContainer.forEach((container) => {
              container.style.display = "none";
            });
            await searchReleases("angry mood", "track");
          } else if (tab.getAttribute("data-tab") === "joyful") {
            hrElement.classList.add("hrElementTab");
            activeDiv.appendChild(hrElement);
            hideContainer.forEach((container) => {
              container.style.display = "none";
            });
            await searchReleases("happy mood", "track");
          }
        });
      });
    }
    document
      .querySelector(".navbar-clear-btn")
      .addEventListener("click", function () {
        inputElement.value = "";
        updateSearchResults(
          "",
          playlistHeading,
          playlistElement,
          APICtrl.getConnectSearch,
          displaySearchPlaylists,
          displaySearchRecommendation,
          displaySearchSongs,
          displaySearchAlbums,
          searchList,
          accessToken
        );
      });

    // APPController.init();
    const userProfile = await APICtrl.getUserProfile(accessToken);
    const newReleases = await APICtrl.getNewReleases(accessToken);
    searchMethod = await APICtrl.getConnectSearch(accessToken, "", "playlist");
    displayNewPlaylist(searchMethod);
    // console.log("newReleases", newReleases);
    // UICtrl display methods
    displayUserProfile(userProfile);
    // displayUserPlaylists(playlists);
    const recentlyPlayedTracks = await APICtrl.getRecentlyPlayedTracks(
      accessToken
    );
    showAllSongData(
      recentlyPlayedTracks.items[0].track,
      recentlyPlayedTracks.items[0].track.album.images[0].url
    );
    displayRecentlyPlayedTracks(recentlyPlayedTracks, accessToken);
    // check
    searchItemText();
    displayNewReleases(newReleases);

    const showSideBar = () => {
      const animatedDiv = document.querySelector("#playlist-container");
      animatedDiv.style.right = "0%";
    };
    const hideSideBar = () => {
      const animatedDiv = document.querySelector("#playlist-container");
      animatedDiv.style.right = "-100%";
    };
    const showSIdeBarLoader = () => {
      showSideBar();
      const albumsContainer = document.querySelector("#albumTracksTab");
      albumsContainer.innerHTML = `
          <div class="sidebar-tracks-loader">
            <div class="lds-ripple"><div>
          </div>`;
      const sidebarLoader = document.querySelector(".sidebar-tracks-loader");
      sidebarLoader.style.display = "flex";
    };
    window.showSIdeBarLoader = showSIdeBarLoader;
    window.showSideBar = showSideBar;
    window.hideSideBar = hideSideBar;

    document
      .querySelectorAll(".carosuel-slide-class")
      .forEach((albumElement, index) => {
        albumElement.addEventListener("click", async function () {
          // Get the album id from the clicked element
          showSIdeBarLoader();

          const albumId = this.getAttribute("data-album-id");
          const albumNames = document.querySelectorAll(
            ".album-upper-name-playlist"
          );
          const albumName = albumNames[index].textContent;

          console.log("albumName", albumName);

          // Fetch the album details
          const album = await APICtrl.getAlbum(accessToken, albumId);
          const albumTracks = await APICtrl.getAlbumTracks(
            accessToken,
            albumId
          );

          // console.log(album);

          // Display the album tracks and the album image
          displayAlbumTracks(
            albumTracks,
            accessToken,
            album.images[0].url,
            albumName
          );
        });
      });

    document
      .querySelectorAll(".album-upper-image-playlist")
      .forEach((element, index) => {
        let playtracks = [];
        let tracksImages = [];
        element.addEventListener("click", async function () {
          showSIdeBarLoader();
          const playlistNames = document.querySelectorAll(
            ".album-upper-name-playlist"
          );
          const playlistName = playlistNames[index].textContent;

          console.log("albumName", playlistName);
          const playlistId = this.getAttribute("data-playlist-id");
          const playlistTracks = await APICtrl.getPlaylistTracks(
            accessToken,
            playlistId
          );
          const playlistImage = await APICtrl.getPlaylistImage(
            accessToken,
            playlistId
          );
          playlistTracks.items.forEach((track) => {
            playtracks.push(track?.track ?? track);
            tracksImages.push(
              track?.track?.album?.images[0]?.url ??
                track?.album?.images[0]?.url
            );
          });
          // playtracks.push(playlistTracks.items[index].track);
          // console.log("playlistTracks image content", element.innerHTML);
          console.log("playlistTracks", playtracks[0]);
          console.log("playlist image", playlistImage);
          displayAlbumTracks(
            playtracks,
            accessToken,
            tracksImages,
            playlistName
          );
        });
      });

    document
      .querySelectorAll(".upper-image-artist")
      .forEach((element, index) => {
        element.addEventListener("click", async () => {
          showSIdeBarLoader();
          let tracksImages = [];

          const artistNames = document.querySelectorAll(".upper-name-artist");
          const artistName = artistNames[index].textContent;

          const artistId = element.getAttribute("data-artist-id");
          const artistTopTracks = await APICtrl.getArtistTopTracks(
            accessToken,
            artistId
          );
          artistTopTracks.tracks.forEach((track) => {
            tracksImages.push(track.album.images[0].url);
          });

          displayAlbumTracks(
            artistTopTracks.tracks,
            accessToken,
            tracksImages,
            artistName
          );
        });
      });
    const currentlyPlaying = await APICtrl.getCurrentlyPlaying(accessToken);
    // try {
    //   if (currentlyPlaying == null) {
    const recentTracks = await APICtrl.getRecentlyPlayedTracks(accessToken);
    console.log("recent tracks current try catch===>>", recentTracks.items[0]);
    // const playBtn = document.querySelector(".playBtn");

    // playBtn.addEventListener("click", () => {
    try {
      attachPlayTrackEvent(
        recentTracks.items[0].track,
        accessToken,
        recentTracks.items[0].track.album.images[0].url
      );
    } catch (error) {
      console.log(error);
    }

    // });
    // }
    // } catch (error) {
    //   console.log(error);
    // }
    const currentArtist =
      currentlyPlaying && currentlyPlaying.item && currentlyPlaying.item.artists
        ? await APICtrl.getArtist(
            accessToken,
            currentlyPlaying.item.artists[0].id
          )
        : null;
    displayArtistName(currentlyPlaying);
    displayCurrentSongName(currentlyPlaying);
    if (currentArtist) {
      displayArtistImage(currentArtist.images[0].url);
    }

    if (currentArtist) {
      artistData(currentArtist.name);
    }
    const showPlaylistAgain = async () => {
      const intervalId = setInterval(async () => {
        const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);
        console.log("playlists", playlists);
        showPlaylists(playlists);
      }, 1000);

      // Stop the interval after 2 seconds
      setTimeout(() => {
        clearInterval(intervalId);
      }, 2000);
    };

    const editForm = document.querySelector(".edit-playlist-form");
    editForm.style.display = "none";

    const createForm = document.querySelector(".create-playlist-form");
    createForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      modal.style.display = "none";
      createPlaylist(
        e.target[0].value,
        e.target[1].value,
        accessToken,
        userProfile.id
      );
      e.target[0].value = "";
      e.target[1].value = "";

      const intervalId = setInterval(async () => {
        const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);
        console.log("playlists", playlists);
        showPlaylists(playlists);
      }, 1000);

      // Stop the interval after 2 seconds
      setTimeout(() => {
        clearInterval(intervalId);
      }, 2000);

      // Clear input fields after submit
      this.title.value = "";
      this.description.value = "";

      const deletePlaylistBtns = document.querySelectorAll(".delete-playlist");
      console.log("created form length of playlist", deletePlaylistBtns.length);
    });

    const playlistBtn = document.querySelector(".playlist-btn");
    const playlistHeader = document.querySelector(".playlist-header");

    playlistBtn.addEventListener("click", () => {
      playlistHeader.style.display = "block";

      const editPlaylistBtns = document.querySelectorAll(".edit-playlist");

      console.log("edit playlist btn", editPlaylistBtns.length);

      // editPlaylistBtns.forEach(async (editBtn, index) => {
      const editPlaylist = async (editBtn) => {
        const playlistId = editBtn.getAttribute("data-playlist-id");

        console.log("edit playlist clicked");
        modal.style.display = "flex";
        modalHeading.textContent = "Edit Playlist";
        editForm.style.display = "block";
        createForm.style.display = "none";

        const titleInput = editForm.querySelector('input[name="title"]');
        const descriptionInput = editForm.querySelector(
          'textarea[name="description"]'
        );

        titleInput.value = editBtn.getAttribute("data-edit-name");
        descriptionInput.value = editBtn.getAttribute("data-edit-desc");

        editForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          modal.style.display = "none";
          updatePlaylist(
            e.target[0].value,
            e.target[1].value,
            accessToken,
            playlistId
          );

          const intervalId = setInterval(async () => {
            const playlists = await APICtrl.getConnectedUserPlaylists(
              accessToken
            );
            console.log("playlists", playlists);
            showPlaylists(playlists);
          }, 1000);

          // Stop the interval after 2 seconds
          setTimeout(() => {
            clearInterval(intervalId);
          }, 2000);

          titleInput.value = "";
        });
      };
      window.editPlaylist = editPlaylist;

      const mainPlaylistCloseBtn = document.querySelector(
        ".main-playlist-close-btn"
      );
      mainPlaylistCloseBtn.addEventListener("click", () => {
        playlistHeader.style.display = "none";
      });

      console.log("playlist lcicked", playlistHeader.style);
    });

    document
      .querySelectorAll(".album-img-container")
      .forEach(async (element) => {
        element.addEventListener("click", async () => {
          const singleSongId = element.getAttribute("data-single-song-id");
          const track = await APICtrl.getTrack(accessToken, singleSongId);
          attachPlayTrackEvent(track, accessToken, track.album.images[0].url);
          console.log(track);
        });
      });

    const sidebarPlayBtn = document.querySelectorAll(
      ".recent-icon-inner-container"
    );

    sidebarPlayBtn.forEach((btn, index) => {
      btn.addEventListener("click", async () => {
        const track = uniqueTracks[index];
        // artistData(track.track.artists[0].name);
        try {
          const trackImage = track.track.album.images[0].url;
          console.log("track", track);
          attachPlayTrackEvent(track.track, accessToken, trackImage);
        } catch (error) {
          const trackImage = track.album.images[0].url;
          console.log("track", track.track);
          attachPlayTrackEvent(track, accessToken, trackImage);
        }
      });
    });

    const prevButtons = document.querySelectorAll(".previousBtn");
    prevButtons.forEach((prevButton) => {
      prevButton.addEventListener("click", async () => {
        console.log("next ===> ", next);
        console.log("unique tracks ===> ", uniqueTracks);

        if (next <= 0) {
          next = uniqueTracks.length - 1;
        } else {
          next--;
        }
        let nextTrack, nextTrackImage;

        try {
          nextTrackImage = uniqueTracks[next].album.images[0].url;
          nextTrack = uniqueTracks[next];
          attachPlayTrackEvent(nextTrack, accessToken, nextTrackImage);
        } catch (error) {
          nextTrackImage = uniqueTracks[next].track.album.images[0].url;
          nextTrack = uniqueTracks[next].track;
          attachPlayTrackEvent(nextTrack, accessToken, nextTrackImage);
        }
      });
    });

    const nextButtons = document.querySelectorAll(".nextBtn");
    console.log('next button====>>>, ', nextButtons);
    let next = 0;

    nextButtons.forEach((nextButton) => {
      nextButton.addEventListener("click", async () => {
        console.log("next ===> ", next);
        console.log("unique tracks ===> ", uniqueTracks[0]);

        if (next >= uniqueTracks.length - 1) {
          next = 0;
        } else {
          next++;
        }

        // console.log(uniqueTracks[next].track.album === undefined);

        let nextTrack;
        let nextTrackImage;

        try {
          nextTrackImage = uniqueTracks[next].album.images[0].url;
          nextTrack = uniqueTracks[next];
          attachPlayTrackEvent(nextTrack, accessToken, nextTrackImage);
        } catch (error) {
          nextTrackImage = uniqueTracks[next].track.album.images[0].url;
          nextTrack = uniqueTracks[next].track;
          attachPlayTrackEvent(nextTrack, accessToken, nextTrackImage);
        }

        console.log("next ===> ", next);
      });
    });
    // prevButtons.forEach((prevButton) => {
    //   prev--;
    //   if (prev < 0) {
    //     prev = recentlyPlayedTracks.length - 1;
    //   }
    //   if (topTracks) {
    //     attachPlayTrackEvent(topTracks[prev], accessToken);
    //   }
    // });

    // const repeatBtn = document.querySelector(".repeatBtn");
    // repeatBtn.addEventListener("click", async () => {
    //   await APICtrl.setRepeatMode(accessToken, "context");
    //   console.log("repeat enabled");
    // });
    // // Function to shuffle an array
    // function shuffleArray(array) {
    //   for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]];
    //   }
    //   return array;
    // }

    // // Shuffle button event listener
    // var shuffleBtn = document.querySelector(".shuffleBtn");
    // // Shuffle the topTracks array
    // const shuffledTracks = shuffleArray(topTracks);

    // // Play the first track in the sbhuffled array
    // attachPlayTrackEvent(shuffleBtn, shuffledTracks[0], accessToken);

    let accessTokenExpiration;
    accessTokenExpiration = Date.now() + 3600 * 1000; // Set expiration time to 20 seconds

    setInterval(() => {
      if (Date.now() >= accessTokenExpiration) {
        // window.location.href = "/connect"; // Redirect to /connect URL if expiration time is reached
        connectToSpotify();
      }
    }, 1000);
  }
  return {
    init: function () {},
  };
})(UIController, APIController);

// APPController.init();
