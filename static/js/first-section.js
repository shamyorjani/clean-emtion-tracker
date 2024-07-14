var artistBio = [];

// const loader = document.querySelector(".loader-section-container");
// loader.style.display = "none"; // Show the loader

var artistData = async (artistName) => {
  // if (typeof artistName !== "string") {
  //   artistName = String(artistName);
  // }
  artistName = artistName.split(" ").join("+");
  // loader.style.display = "block"; // Show the loader
  let response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=a6430db72689041eaecff4ca70a70c00&format=json`
  );
  let data = await response.json();
  // console.log("artist data name", data.artist.bio.summary);
  artistBio.length = 0;
  artistBio.push(data.artist.bio.summary);

  // console.log("some data ", data);
  let bio = artistBio[0];

  let artistBioElement = document.querySelector(".song-album-description");
  artistBioElement.innerHTML = "";
  // console.log("bio", bio);

  if (bio.length > 20) {
    artistBioElement.innerHTML = bio.substring(0, 220);
  } else {
    artistBioElement.innerHTML = "Sorry no bio available for this artist.";
    artistBioElement.style.fontSize = "1.1rem";
    artistBioElement.style.lineHeight = "1.5";
  }

  // } catch (error) {
  //   console.error(error);
  // }
  // } finally {
  //   // loader.style.display = "none";
  // }
};
function displayArtistName(currentlyPlaying) {
  const artistNameElement = document.querySelector(".song-album-name");
  const artistLeftNameElement = document.querySelector(".left-author-name");
  const audioPlayerArtistName = document.querySelector(".song-author");

  console.log("chekc kark yar :", artistLeftNameElement);
  if (!currentlyPlaying || !currentlyPlaying.item) {
    return;
  }
  const artistName = currentlyPlaying.item.artists[0].name;
  artistLeftNameElement.innerHTML = artistName;
  console.log(
    "artist name",
    artistName,
    "artisnameleftelement",
    artistLeftNameElement
  );
  if (artistName.length > 10 && artistName.length < 15) {
    artistNameElement.style.fontSize = "1.2rem";
  } else if (artistName.length > 15) {
    artistNameElement.style.fontSize = "1rem";
  }
}

function displayCurrentSongName(currentlyPlaying) {
  const currentSongElement = document.querySelectorAll(".song-title");

  let songName = "";
  if (currentlyPlaying && currentlyPlaying.item) {
    songName = currentlyPlaying.item.name;
  }
  currentSongElement.forEach(
    (currentSong) => (currentSong.innerHTML = songName)
  );
}

function displayArtistImage(currentArtist) {
  const artistImageElement = document.querySelectorAll(
    ".left-audio-player-img"
  );
  const artistImage = document.querySelector(".author-image");
  const mainImage = document.querySelector(".main");
  artistImageElement.forEach((artistImage) => (artistImage.innerHTML = ""));

  const artistUrl = currentArtist;
  console.log("artist url", artistUrl);
  artistImage.style.backgroundImage = `url('${artistUrl}')`;
  mainImage.style.backgroundImage = `url('${artistUrl}')`;
  artistImageElement.forEach(
    (artistImage) =>
      (artistImage.innerHTML = `
      <img
            src="${artistUrl}"
            class="bottom-player-artist-image"
            alt="singer_image"
          />`)
  );
}
