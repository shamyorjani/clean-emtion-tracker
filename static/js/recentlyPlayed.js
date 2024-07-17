function displayRecentlyPlayedTracks(recentlyPlayedTracks, accessToken) {
  const recentlyPlayedContainer = document.querySelector("#recentlyPlayedTab");
  recentlyPlayedContainer.innerHTML = ""; // Clear existing content
  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // console.log("recenlty tracks", uniqueTracks);

  uniqueTracks.length = 0;

  recentlyPlayedTracks.items.forEach((track) => {
    const isDuplicate = uniqueTracks.some(
      (t) => t.track.name === track.track.name
    );
    if (!isDuplicate) {
      uniqueTracks.push(track);
      const trackItem = document.createElement("div");
      const trackName =
        track.track.name.length <= 15
          ? track.track.name
          : track.track.name.slice(0, 15) + "...";

      trackItem.innerHTML = `
          <div class="playlist-short-container">
              <div class="playlist-icon-container">
                  <div class="recent-icon-inner-container">
                      <span class="play-icon sidebar-play-btn">
                        <i class="fas fa-play"></i>
                      </span>
                          <img src='${
                            track.track.album.images[0].url
                          }' class="recent-track-image" />
                  </div>
                  <div>
                      <h3 class="playlist-name">${trackName}</h3>
                      <p class="playlist-names">${
                        track.track.artists[0].name
                      }</p>
                  </div>
              </div>

              <div class="playlist-song-time">
                  <span class="song-time">${formatDuration(
                    track.track.duration_ms
                  )}</span>
              </div>
          </div>
              `;
      recentlyPlayedContainer.appendChild(trackItem);
    }
  });
}

let uniqueTracks = [];

window.uniqueTracks = uniqueTracks;

function displayAlbumTracks(
  albumTracks,
  accessToken,
  albumImageUrl = "../static/assets/images/img1.jpeg",
  selectionNameContent
) {
  const albumTracksContainer = document.querySelector("#albumTracksTab");
  albumTracksContainer.innerHTML = ""; // Clear existing content

  const albumTracksTabBtn = document.querySelector("#albumTracksTabBtn");
  albumTracksTabBtn.style.display = "inline-block";
  showTab("albumTracks");
  setActiveTab(albumTracksTabBtn);

  const tabsContainer = document.querySelector(".tabs-container");
  tabsContainer.classList.add("tabs-container-active");

  const recentTracksTabBtn = document.querySelector("#recentlyPlayedTabBtn");
  recentTracksTabBtn.classList.remove("right");
  recentTracksTabBtn.classList.add("left");

  const sidebarLoader = document.querySelector("sidebar-tracks-loader");

  console.log("albums tracks", albumTracks);

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  let counter = 0;

  // const uniqueTracks = [];

  const selectionName = document.createElement("h1");
  selectionName.textContent = selectionNameContent;
  selectionName.classList.add("selection-name");
  albumTracksContainer.appendChild(selectionName);

  uniqueTracks.length = 0;

  albumTracks.forEach((track, index) => {
    // console.log("track", track);
    const isDuplicate = uniqueTracks.some((t) => t.name === track.name);
    if (!isDuplicate) {
      uniqueTracks.push(track);
      const trackItem = document.createElement("div");
      const trackName =
        track.name.length <= 15 ? track.name : track.name.slice(0, 15) + "...";
      counter++;
      trackItem.innerHTML = `
          <div class="playlist-short-container">
              <div class="playlist-icon-container">
                  <div class="playlist-icon-inner-container p-12">
                      <span class="play-icon sidebar-play-btn">
                        <i class="fas fa-play"></i>
                      </span >
                      <img src='
                      ${
                        // albumImageUrl
                        Array.isArray(albumImageUrl)
                          ? albumImageUrl[index]
                          : albumImageUrl
                      }' class="recent-track-image" />

                  </div>
                  <div>
                      <h3 class="playlist-name">${trackName}</h3>
                      <p class="playlist-names">${track.artists[0].name}</p>
                  </div>
              </div>

              <div class="playlist-song-time">
                  <span class="song-time">${formatDuration(
                    track.duration_ms
                  )}</span>
              </div>
          </div>
              `;

      albumTracksContainer.appendChild(trackItem);
    }
  });

  const sidebarPlayBtn = document.querySelectorAll(
    ".playlist-icon-inner-container"
  );

  sidebarPlayBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      console.log("clicked");
      const track = albumTracks[index];
      // artistData(track.artists[0].name);

      console.log("clicked track sidebar", track, "index", index);
      attachPlayTrackEvent(track, accessToken, albumImageUrl);
    });
  });
}
