{
  /* <script> */
}

function displayNewArtist(searchMethod) {
  document.querySelectorAll(".upper-name-artist").forEach((element, index) => {
    if (
      searchMethod.artists.items[index] &&
      searchMethod.artists.items[index].name
    ) {
      let artistName = searchMethod.artists.items[index].name;
      if (artistName.length > 30) {
        artistName = artistName.substring(0, 27) + "...";
      }
      element.innerHTML = artistName;
    }
  });
  document.querySelectorAll(".upper-image-artist").forEach((element, index) => {
    if (
      searchMethod.artists.items[index] &&
      searchMethod.artists.items[index].images &&
      searchMethod.artists.items[index].images[0] &&
      searchMethod.artists.items[index].images[0].url
    ) {
      element.innerHTML = `<img src="${searchMethod.artists.items[index].images[0].url}" class="best-release-img-artists" alt="singer_image">`;
      element.setAttribute(
        "data-artist-id",
        searchMethod.artists.items[index].id
      );
    }
  });
}

function displayNewPlaylist(searchMethod) {
  document
    .querySelectorAll(".album-upper-artist-playlist")
    .forEach((element, index) => {
      let artistNames = "";
      if (
        searchMethod.playlists.items[index] &&
        searchMethod.playlists.items[index].owner &&
        searchMethod.playlists.items[index].owner.display_name
      ) {
        artistNames = searchMethod.playlists.items[index].owner.display_name;
      }
      element.innerHTML = artistNames;
    });
  document;
  document
    .querySelectorAll(".album-upper-name-playlist")
    .forEach((element, index) => {
      if (
        searchMethod.playlists.items[index] &&
        searchMethod.playlists.items[index].name
      ) {
        let playlistName = searchMethod.playlists.items[index].name;
        if (playlistName.length > 30) {
          playlistName = playlistName.substring(0, 27) + "...";
        }
        element.innerHTML = playlistName;
      }
    });
  document
    .querySelectorAll(".album-upper-image-playlist")
    .forEach((element, index) => {
      if (
        searchMethod.playlists.items[index] &&
        searchMethod.playlists.items[index].images &&
        searchMethod.playlists.items[index].images[0] &&
        searchMethod.playlists.items[index].images[0].url
      ) {
        element.innerHTML = `<img src="${searchMethod.playlists.items[index].images[0].url}" class="best-release-img" alt="singer_image">`;

        element.setAttribute(
          "data-playlist-id",
          searchMethod.playlists.items[index].id
        );
      }
    });
}

function displayNewAlbum(searchMethod) {
  document.querySelectorAll(".album-upper-name").forEach((element, index) => {
    if (
      searchMethod.albums.items[index] &&
      searchMethod.albums.items[index].name
    ) {
      let albumName = searchMethod.albums.items[index].name;
      if (albumName.length > 30) {
        albumName = albumName.substring(0, 27) + "...";
      }
      element.innerHTML = albumName;
    }
  });
  document.querySelectorAll(".album-upper-image").forEach((element, index) => {
    if (
      searchMethod.albums.items[index] &&
      searchMethod.albums.items[index].images &&
      searchMethod.albums.items[index].images[0] &&
      searchMethod.albums.items[index].images[0].url
    ) {
      element.innerHTML = `<img src="${searchMethod.albums.items[index].images[0].url}" class="best-release-img" alt="singer_image">`;
    }
  });

  document.querySelectorAll(".album-upper-artist").forEach((element, index) => {
    let artistNames = "";
    if (
      searchMethod.albums.items[index] &&
      searchMethod.albums.items[index].artists
    ) {
      artistNames = searchMethod.albums.items[index].artists
        .map((artist) => artist.name)
        .join(", ");
      if (artistNames.length > 18) {
        artistNames = artistNames.substring(0, 18) + "...";
      }
    }
    element.innerHTML = artistNames;
  });
}

function displayNewReleases(newReleases) {
  const randomNumber = Math.floor(Math.random() * 40) + 1;
  document
    .querySelectorAll(".album-upper-image")
    .forEach((singleImage, index) => {
      const album = newReleases.albums.items[index + randomNumber];
      if (album && album.images && album.images.length > 0) {
        singleImage.innerHTML = `<img src="${album.images[0].url}" class="best-release-img" alt="singer_image">`;
      }
    });
  document.querySelectorAll(".album-upper-name").forEach((name, index) => {
    let albumName = "";
    if (
      newReleases.albums.items[index + randomNumber] &&
      newReleases.albums.items[index + randomNumber].name
    ) {
      albumName = newReleases.albums.items[index + randomNumber].name;
      if (albumName.length > 30) {
        albumName = albumName.substring(0, 30) + "...";
      }
    }
    name.innerHTML = albumName;
  });

  document
    .querySelectorAll(".album-upper-artist")
    .forEach((artist) => (artist.innerHTML = ""));
  document.querySelectorAll(".album-upper-artist").forEach((artist, index) => {
    let artistNames = [];
    if (
      newReleases.albums.items[index + randomNumber] &&
      newReleases.albums.items[index + randomNumber].artists
    ) {
      artistNames = newReleases.albums.items[index + randomNumber].artists.map(
        (artist) => artist.name
      );
      if (artistNames.length > 14) {
        artistNames = artistNames.slice(0, 14);
        artistNames.push("...");
      }
    }
    artist.innerHTML += artistNames.join(", ");
  });
}

{
  /* </script> */
}
