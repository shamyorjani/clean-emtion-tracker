function displaySearchRecommendation(searchMethod) {
  document.querySelectorAll(".result-text h4").forEach((element, index) => {
    let songName = searchMethod.tracks.items[index].name;
    element.setAttribute(
      "data-single-song-id",
      searchMethod.tracks.items[index].id
    );
    if (songName.length > 30) {
      songName = songName.substring(0, 27) + "...";
    }
    element.innerHTML = songName;
  });
  document.querySelectorAll(".result-text h5").forEach((element, index) => {
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
  document
    .querySelectorAll(".result-text h4[data-single-song-id] ")
    .forEach((element, index) => {
      element.addEventListener("click", async function () {
        hideSideBar();

        try {
          const alpineElement = document.querySelector("body");
          const desktopNavSearchopen =
            alpineElement.__x.$data.desktopNavSearchopen;
        } catch (error) {
          console.log("gg g g g gg g error", error);
        }

        // showSIdeBarLoader();
        const trackId = this.getAttribute("data-single-song-id");
        const track = await APIController.getTrack(accessToken, trackId);
        console.log("track image url=>", track);
        attachPlayTrackEvent(track, accessToken, track.album.images[0].url);
      });
    });
}

function displaySearchSongs(searchMethod) {
  document.querySelectorAll(".result-text h4").forEach((element, index) => {
    if (index < 3 || index >= 9) {
      let songName;
      if (searchMethod.tracks.items && searchMethod.tracks.items[index]) {
        if (index >= 9) {
          songName = searchMethod.tracks.items[index - 9]?.name;
          element.setAttribute(
            "data-single-song-id",
            searchMethod.tracks.items[index - 9].id
          );
        } else {
          songName = searchMethod.tracks.items[index]?.name;
          element.setAttribute(
            "data-single-song-id",
            searchMethod.tracks.items[index]?.id
          );
        }
        if (songName && songName.length > 30) {
          songName = songName.substring(0, 27) + "...";
        }
      }
      element.innerHTML = songName || "";
    }
  });
  document.querySelectorAll(".result-text h5").forEach((element, index) => {
    if (index < 3 || index >= 9) {
      let artistNames;
      if (index >= 9 && searchMethod.tracks.items[index - 6]?.artists) {
        artistNames = searchMethod.tracks.items[index - 6].artists
          .map((artist) => artist.name)
          .join(", ");
      } else if (searchMethod.tracks.items[index]?.artists) {
        artistNames = searchMethod.tracks.items[index].artists
          .map((artist) => artist.name)
          .join(", ");
      }
      if (artistNames && artistNames.length > 14) {
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
      index >= 9 &&
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
}

function displaySearchAlbums(searchMethod) {
  document.querySelectorAll(".result-text h4").forEach((element, index) => {
    if (index >= 3 && index < 6) {
      element.setAttribute(
        "data-album-id",
        searchMethod.albums.items[index - 3].id
      );

      let albumName = searchMethod.albums.items[index - 3]?.name;
      if (albumName && albumName.length > 30) {
        albumName = albumName.substring(0, 27) + "...";
      }
      element.innerHTML = albumName || "";
    }
  });
  document
    .querySelectorAll(".result-text h4[data-album-id]")
    .forEach((element) => {
      console.log("sesarch album element", element);
      element.removeAttribute("data-single-song-id");
      element.addEventListener("click", async function () {
        showSIdeBarLoader();
        const albumId = this.getAttribute("data-album-id");
        const album = await APIController.getAlbum(accessToken, albumId);

        const albumTracks = await APIController.getAlbumTracks(
          accessToken,
          albumId
        );
        displayAlbumTracks(albumTracks, accessToken, album.images[0].url);
      });
      // Your code here
    });
  document.querySelectorAll(".result-text h5").forEach((element, index) => {
    if (
      index >= 3 &&
      index < 6 &&
      searchMethod.albums.items[index - 3] &&
      searchMethod.albums.items[index - 3].artists
    ) {
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
      index >= 3 &&
      index < 6 &&
      searchMethod.albums.items[index - 3] &&
      searchMethod.albums.items[index - 3].images &&
      searchMethod.albums.items[index - 3].images[0] &&
      searchMethod.albums.items[index - 3].images[0].url
    ) {
      element.style.backgroundImage = `url(${
        searchMethod.albums.items[index - 3].images[0].url
      })`;
    }
  });
}

function displaySearchPlaylists(searchMethod) {
  document.querySelectorAll(".result-text h4").forEach((element, index) => {
    if (
      index >= 6 &&
      index < 9 &&
      searchMethod.playlists &&
      searchMethod.playlists.items &&
      searchMethod.playlists.items[index]
    ) {
      let songName = searchMethod.playlists.items[index].name;
      element.setAttribute(
        "data-playlist-id",
        searchMethod.playlists.items[index].id
      );
      element.setAttribute("data-playlist-name", songName);
      if (songName.length > 30) {
        songName = songName.substring(0, 27) + "...";
      }
      element.innerHTML = songName;
    }
  });

  document.querySelectorAll(".result-text h5").forEach((element, index) => {
    if (
      index >= 6 &&
      index < 9 &&
      searchMethod.playlists &&
      searchMethod.playlists.items &&
      searchMethod.playlists.items[index] &&
      searchMethod.playlists.items[index].owner &&
      searchMethod.playlists.items[index].owner.display_name
    ) {
      let artistName = searchMethod.playlists.items[index].owner.display_name;
      element.innerHTML = artistName;
    }
  });

  document.querySelectorAll(".result-image").forEach((element, index) => {
    if (
      index >= 6 &&
      index < 9 &&
      searchMethod.playlists &&
      searchMethod.playlists.items &&
      searchMethod.playlists.items[index] &&
      searchMethod.playlists.items[index].images &&
      searchMethod.playlists.items[index].images[0] &&
      searchMethod.playlists.items[index].images[0].url
    ) {
      element.style.backgroundImage = `url(${searchMethod.playlists.items[index].images[0].url})`;
    }
  });
  document
    .querySelectorAll(".result-text h4[data-playlist-id]")
    .forEach((element, index) => {
      element.removeAttribute("data-single-song-id");
      let playtracks = [];
      let tracksImages = [];
      element.addEventListener("click", async function () {
        showSIdeBarLoader();
        const playlistName = element.getAttribute("data-playlist-name");

        console.log("playlist name", playlistName);
        const playlistId = this.getAttribute("data-playlist-id");
        const playlistTracks = await APIController.getPlaylistTracks(
          accessToken,
          playlistId
        );
        const playlistImage = await APIController.getPlaylistImage(
          accessToken,
          playlistId
        );
        playlistTracks.items.forEach((track) => {
          playtracks.push(track.track);
          try {
            if (track.track.album.images[0]) {
              tracksImages.push(track.track.album.images[0].url);
            }
          } catch (error) {
            console.log("error", error);
          }
        });
        // playtracks.push(playlistTracks.items[index].track);
        // console.log("playlistTracks image content", element.innerHTML);
        console.log("playlistTracks", playtracks[0]);
        console.log("playlist image", playlistImage);
        displayAlbumTracks(playtracks, accessToken, tracksImages, playlistName);
      });
    });
}

function displaySongsRecommendation(searchMethod) {
  document
    .querySelectorAll(".carosuel-slide-class")
    .forEach((element, index) => {
      if (
        searchMethod &&
        searchMethod.tracks &&
        searchMethod.tracks.items &&
        searchMethod.tracks.items[index] &&
        searchMethod.tracks.items[index].album &&
        searchMethod.tracks.items[index].album.images &&
        searchMethod.tracks.items[index].album.images[0] &&
        searchMethod.tracks.items[index].album.images[0].url
      ) {
        element.setAttribute(
          "data-album-id",
          searchMethod.tracks.items[index].album.id
        );
      }
    });
  document
    .querySelectorAll(".album-img-container")
    .forEach((element, index) => {
      if (
        searchMethod &&
        searchMethod.tracks &&
        searchMethod.tracks.items &&
        searchMethod.tracks.items[index] &&
        searchMethod.tracks.items[index].album &&
        searchMethod.tracks.items[index].album.images &&
        searchMethod.tracks.items[index].album.images[0] &&
        searchMethod.tracks.items[index].album.images[0].url
      ) {
        element.innerHTML = `<img src="${searchMethod.tracks.items[index].album.images[0].url}" class="album-img" alt="singer_image">`;
        element.setAttribute(
          "data-single-song-id",
          searchMethod.tracks.items[index].id
        );
      }
    });

  let artistNameDiv = document.querySelectorAll(".max-w-\\[130px\\] h3");
  artistNameDiv.forEach((element, index) => {
    if (
      searchMethod.tracks &&
      searchMethod.tracks.items &&
      searchMethod.tracks.items[index] &&
      searchMethod.tracks.items[index].artists
    ) {
      let artistNames = searchMethod.tracks.items[index].artists
        .map((artist) => artist.name)
        .join(", ");
      if (artistNames.length > 14) {
        artistNames = artistNames.substring(0, 14) + "...";
      }
      element.innerHTML = artistNames;
    }
  });

  let songsNameDiv = document.querySelectorAll(".max-w-\\[130px\\] h2");
  songsNameDiv.forEach((element, index) => {
    if (
      searchMethod.tracks &&
      searchMethod.tracks.items &&
      searchMethod.tracks.items[index] &&
      searchMethod.tracks.items[index].name
    ) {
      let songName = searchMethod.tracks.items[index].name;
      if (songName.length > 30) {
        songName = songName.substring(0, 27) + "...";
      }
      element.innerHTML = songName;
    }
  });
}

function searchItemText() {
  document.querySelectorAll(".result-text h4").forEach((element) => {
    let songName = element.innerHTML;
    if (songName.length > 20) {
      element.innerHTML = songName.substring(0, 20) + "...";
    }
  });

  document.querySelectorAll(".result-text h5").forEach((element) => {
    let artistName = element.innerHTML;
    if (artistName.length > 20) {
      element.innerHTML = artistName.substring(0, 20) + "...";
    }
  });
}

async function updateSearchResults(
  inputValue,
  playlistHeading,
  playlistElement,
  getConnectSearch,
  displaySearchPlaylists,
  displaySearchRecommendation,
  displaySearchSongs,
  displaySearchAlbums,
  searchList,
  accessToken
) {
  var searchMethod;

  if (inputValue === "") {
    playlistHeading.forEach((singleElement, index) => {
      singleElement.innerHTML = index !== 0 ? "" : "Trending";
    });
    playlistElement.forEach((singleElement, index) => {
      singleElement.style.marginTop = index !== 0 ? "21px" : "0px";
    });
    // If the input value is empty, show default search results (e.g., "Sad")
    searchMethod = await getConnectSearch(accessToken, "", "track");
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
    searchMethod = await getConnectSearch(accessToken, inputValue, "track");
    displaySearchSongs(searchMethod);

    searchMethod = await getConnectSearch(accessToken, inputValue, "album");
    displaySearchAlbums(searchMethod);

    searchMethod = await getConnectSearch(accessToken, inputValue, "playlist");
    displaySearchPlaylists(searchMethod);
  }
}
