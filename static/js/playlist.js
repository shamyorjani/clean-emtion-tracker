function displayUserPlaylists(playlists) {
    const playlistsContainer = document.querySelector(".playlist-container");
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
  }