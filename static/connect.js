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

      console.log("artit info", searchMethod.artists);
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
        console.log("yaha chalta hy ");
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

    const showSIdeBarLoader = () => {
      const albumsContainer = document.querySelector("#albumTracksTab");
      albumsContainer.innerHTML = `
          <div class="sidebar-tracks-loader">
            <div class="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>`;
      const sidebarLoader = document.querySelector(".sidebar-tracks-loader");
      sidebarLoader.style.display = "flex";
    };

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
            playtracks.push(track.track);
            tracksImages.push(track.track.album.images[0].url);
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
        this.title.value,
        this.description.value,
        accessToken,
        userProfile.id
      );

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
      // let newPlaylists = await APICtrl.getConnectedUserPlaylists(accessToken);
      // console.log("new playlist", newPlaylists.length);
      // showPlaylists(newPlaylists);

      const deletePlaylistBtns = document.querySelectorAll(".delete-playlist");
      console.log("created form length of playlist", deletePlaylistBtns.length);
    });

    const playlistBtn = document.querySelector(".playlist-btn");
    const playlistHeader = document.querySelector(".playlist-header");

    playlistBtn.addEventListener("click", () => {
      playlistHeader.style.display = "block";

      const editPlaylistBtns = document.querySelectorAll(".edit-playlist");

      console.log("edit playlist btn", editPlaylistBtns.length);

      editPlaylistBtns.forEach(async (editBtn, index) => {
        // const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);
        const modalPlaylistName = document.querySelectorAll(".playlist-name");
        editBtn.addEventListener("click", () => {
          console.log("edit playlist clicked");
          modal.style.display = "flex";
          modalHeading.textContent = "Edit Playlist";
          editForm.style.display = "block";
          createForm.style.display = "none";
          const titleInput = editForm.querySelector('input[name="title"]');
          titleInput.value = modalPlaylistName[index].textContent;

          editForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            modal.style.display = "none";
            updatePlaylist(
              this.title.value,
              this.description.value,
              accessToken,
              playlists[index].id
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

            // Clear input fields after submit
            const descriptionInput = editForm.querySelector(
              'input[name="description"]'
            );
            titleInput.value = "";
            // descriptionInput.value != "" ? "" : "";
          });
        });
      });

      const mainPlaylistCloseBtn = document.querySelector(
        ".main-playlist-close-btn"
      );
      mainPlaylistCloseBtn.addEventListener("click", () => {
        playlistHeader.style.display = "none";
      });

      console.log("playlist lcicked", playlistHeader.style);
    });
    deletingPlaylist(accessToken, playlists, APICtrl.getConnectedUserPlaylists);
    // const deletePlaylistBtns = document.querySelectorAll(".delete-playlist");

    // deletePlaylistBtns.forEach((deletePlaylistBtn, index) => {
    //   deletePlaylistBtn.addEventListener("click", () => {
    //     console.log("deletePlaylistBtn clicked");
    //     const playlistss = document.querySelectorAll(".playlist");
    //     const playlistID = playlistss[index].getAttribute("data-playlist-id");
    //     console.log("playlistID", playlistID);
    //     deletePlaylist(playlistID, accessToken);

    //     const intervalId = setInterval(async () => {
    //       const playlists = await APICtrl.getConnectedUserPlaylists(
    //         accessToken
    //       );
    //       console.log("playlists", playlists);
    //       showPlaylists(playlists);
    //     }, 1000);

    //     // Stop the interval after 2 seconds
    //     setTimeout(() => {
    //       clearInterval(intervalId);
    //     }, 2000);
    //     console.log("deleted form array length", deletePlaylistBtns.length);
    //   });
    // });

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
        console.log("track", track);
        attachPlayTrackEvent(
          track.track,
          accessToken,
          track.track.album.images[0].url
        );
      });
    });

    const nextButtons = document.querySelectorAll(".nextBtn");
    const prevButtons = document.querySelectorAll(".previousBtn");
    let next = 0;
    let prev = recentlyPlayedTracks.length - 1;
    nextButtons.forEach((nextButton) => {
      nextButton.addEventListener("click", async () => {
        next++;
        if (next >= recentlyPlayedTracks.items.length) {
          next = 0;
        }
        attachPlayTrackEvent(uniqueTracks[next].track, accessToken);
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
