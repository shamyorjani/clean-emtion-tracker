function displayRecentlyPlayedTracks(recentlyPlayedTracks, accessToken) {
  const recentlyPlayedContainer = document.querySelector(".playlist-container");
  recentlyPlayedContainer.innerHTML = ""; // Clear existing content
  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  console.log("recenlty tracks", uniqueTracks);
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
                  <div class="playlist-icon-inner-container">
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
