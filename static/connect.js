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
    const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const data = await result.json();
    return data.items;
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
    getAlbumTracks(accessToken, albumId) {
      return _getAlbumTracks(accessToken, albumId);
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

      if (userType.product !== "premium") {
        // redirect to free subscription page
        window.location.href = "/free-subscription";
      }
    }
  });

  const accessToken = new URLSearchParams(
    window.location.hash.substring(1)
  ).get("access_token");

  let searchMethod = await APICtrl.getConnectSearch(
    accessToken,
    "sad",
    "artist"
  );
  const albumTracks = await APICtrl.getAlbumTracks(accessToken, "4OXoBlapQygTdzAifJm8BL");
  console.log("albums tracks", albumTracks);
  const artistNames = albumTracks.items ? albumTracks.items.map((track) => track.artists[0].name) : [];
  console.log("Artist Names:", artistNames);

  const trackNames = albumTracks.items ? albumTracks.items.map((track) => track.name) : [];
  console.log("Track Names:", trackNames);

  const imageUrls = albumTracks.items ? albumTracks.items.map((track) => track.album.images[0].url) : [];
  console.log("Image URLs:", imageUrls);

  const durations = albumTracks.items ? albumTracks.items.map((track) => track.duration_ms) : [];
  console.log("Durations:", durations);

  document
    .querySelector(".logo-link")
    .setAttribute("href", window.location.href);
  // const accessToken = new URLSearchParams(
  //   window.location.hash.substring(1)
  // ).get("access_token");

  if (accessToken) {
    const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);

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

    async function searchReleases(inputValue, type) {
      let searchMethod = await APICtrl.getConnectSearch(
        accessToken,
        inputValue,
        type
      );
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
      await searchReleases(inputValue, "album");
      await searchReleases(inputValue, "track");
      await searchReleases(inputValue, "playlist");
      await searchReleases(inputValue, "artist");

    }
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

    mickToggle.addEventListener("click", () => {
      if (!mickSelect.classList.contains("active-mick")) {
        recognition.start();
        mickSelect.classList.add("active-mick");
      } else if (mickSelect.classList.contains("active-mick")) {
        recognition.stop();
        mickSelect.classList.remove("active-mick"); // Move this line here
      }
    });

    recognition.addEventListener("result", async (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      inputElement.value = result;
      await updateSearchResults(result);
    });
    recognition.addEventListener("end", () => {
      mickSelect.classList.remove("active-mick");
    });
    document.addEventListener("DOMContentLoaded", function () {});
    // const micIcon = document.getElementById("mic-id");

    // micIcon.addEventListener("click", function () {
    //   let isActive = false;
    //   isActive = !isActive;
    //   if (!isActive) {
    //     micIcon.classList.toggle("active-mick", false);
    //   } else {
    //     micIcon.classList.toggle("active-mick", true);
    //   }
    // });

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
    console.log("newReleases", newReleases);
    // UICtrl display methods
    displayUserProfile(userProfile);
    // displayUserPlaylists(playlists);
    const recentlyPlayedTracks = await APICtrl.getRecentlyPlayedTracks(
      accessToken
    );
    displayRecentlyPlayedTracks(recentlyPlayedTracks, accessToken);
    searchItemText();
    displayNewReleases(newReleases);
    const currentlyPlaying = await APICtrl.getCurrentlyPlaying(accessToken);
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

    const sidebarPlayBtn = document.querySelectorAll(".sidebar-play-btn");
    sidebarPlayBtn.forEach((btn, index) => {
      btn.addEventListener("click", async () => {
        const track = recentlyPlayedTracks.items[index].track;
        attachPlayTrackEvent(btn, track, accessToken);
      });
    });
    const nextButtons = document.querySelectorAll(".nextBtn");
    const prevButtons = document.querySelectorAll(".previousBtn");
    let next = 0;
    let prev = recentlyPlayedTracks.length - 1;
    nextButtons.forEach((nextButton) => {
      nextButton.addEventListener("click", async () => {
        next++;
        if (next >= recentlyPlayedTracks.length) {
          next = 0;
        }
        attachPlayTrackEvent(nextButton, topTracks[next], accessToken);
      });
    });
    prevButtons.forEach((prevButton) => {
      prevButton.addEventListener("click", async () => {
        prev--;
        if (prev < 0) {
          prev = recentlyPlayedTracks.length - 1;
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
