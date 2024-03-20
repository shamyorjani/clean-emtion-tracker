// main function code

 // Search method
    // const searchMethod = await APICtrl.getConnectSearch(accessToken, "Sad");
    // UICtrl.displaySearchRecommendation(searchMethod);
    // const searchBarMethod = UICtrl.searchBarMethod();

    
    // searchMethod.tracks.items.forEach((item) => {
    // console.log("Search Image : ", item.album.images[0].url);
    // });
    // searchMethod.tracks.items.forEach((item) => {
    // console.log("Search Name : ", item.album.name);
    // });

    // searchMethod.tracks.items.forEach((item) => {
    // console.log("Search Artist Names:");
    // const artistNames = item.album.artists.map((artist) => artist.name).join(", ");
    // console.log(artistNames);
    // });

    // const topTracks = await APICtrl.getTopTracks(accessToken);
    // UICtrl.displayTopTracks(topTracks);

    // const recentlyPlayedTracks = await APICtrl.getRecentlyPlayedTracks(
    //   accessToken
    // );
    // UICtrl.displayRecentlyPlayedTracks(recentlyPlayedTracks, accessToken);

// console.log("New Releases : ", newReleases);
    // UICtrl.displayNewReleases(newReleases);

    // UICtrl.inputField().newReleasesName.innerHTML = "karachi wala";
    // console.log("kam ka kam " , UICtrl.inputField().newReleasesName);

    // console.log("Name dak ly ", newReleases.albums.items[6].name);
    // console.log("Artist name dak ", currentArtist.name);
    

    // Call startPolling with your access token and polling interval
    // const startPolling = (accessToken, interval) => {
    //   setInterval(async () => {}, interval);
    // };
    // startPolling(accessToken, 5000);

    // searchMethodCheck = await APICtrl.getConnectSearch(
    //   accessToken,
    //   "heart broken",
    //   "album"
    // );
    // console.log("Search Method : ", searchMethodCheck);
    // const getAlbums = async (accessToken, query) => {
    //   const searchMethod = await APICtrl.getConnectSearch(
    //     accessToken,
    //     query,
    //     "album"
    //   );
    //   return searchMethod.albums.items;
    // };

    // const displayAlbums = (albums) => {
    //   albums.forEach((album) => {
    //     console.log("Album Image: ", album.images[0].url);
    //     console.log("Album Name: ", album.name);
    //     console.log(
    //       "Artist Names: ",
    //       album.artists.map((artist) => artist.name).join(", ")
    //     );
    //   });
    // };

    // const searchAndDisplayAlbums = async (accessToken, query) => {
    //   const albums = await getAlbums(accessToken, query);
    //   displayAlbums(albums);
    // };

    // // Usage example
    // searchAndDisplayAlbums(accessToken, "love");

    // const getPlaylists = async (accessToken, query) => {
    //   const searchMethod = await APICtrl.getConnectSearch(
    //   accessToken,
    //   query,
    //   "playlist"
    //   );
    //   return searchMethod.playlists.items;
    // };

    // const displayPlaylists = (playlists) => {
    //   playlists.forEach((playlist) => {
    //   console.log("Playlist Image: ", playlist.images[0].url);
    //   console.log("Playlist Name: ", playlist.name);
    //   console.log(
    //     "Artist Names: ",
    //     playlist.owner.display_name
    //   );
    //   });
    // };

    // const searchAndDisplayPlaylists = async (accessToken, query) => {
    //   const playlists = await getPlaylists(accessToken, query);
    //   displayPlaylists(playlists);
    // };

    // // Usage example
    // searchAndDisplayPlaylists(accessToken, "heart broken");





     // displaySearchRecommendation: function (searchMethod) {
      // searchMethod = await APICtrl.getConnectSearch(accessToken, "", "album");
      // document
      //   .querySelectorAll(DOMElements.searchSongName)
      //   .forEach((element, index) => {
      //     let albumName = searchMethod.albums.items[index].name;
      //     if (albumName.length > 30) {
      //       albumName = albumName.substring(0, 27) + "...";
      //     }
      //     element.innerHTML = albumName;
      //   });
      // document
      //   .querySelectorAll(DOMElements.searchArtistName)
      //   .forEach((element, index) => {
      //     let artistNames = searchMethod.albums.items[index].artists
      //       .map((artist) => artist.name)
      //       .join(", ");
      //     if (artistNames.length > 18) {
      //       artistNames = artistNames.substring(0, 18) + "...";
      //     }
      //     element.innerHTML = artistNames;
      //   });
      // document.querySelectorAll(".result-image").forEach((element, index) => {
      //   if (
      //     searchMethod.albums.items[index] &&
      //     searchMethod.albums.items[index].images &&
      //     searchMethod.albums.items[index].images[0] &&
      //     searchMethod.albums.items[index].images[0].url
      //   ) {
      //     element.style.backgroundImage = `url(${searchMethod.albums.items[index].images[0].url})`;
      //   }
      // });
    // },





    // displaySearchRecommendation: function (searchMethod) {
    // searchMethod = await APICtrl.getConnectSearch(accessToken, "", "album");
    // document
    //   .querySelectorAll(DOMElements.searchSongName)
    //   .forEach((element, index) => {
    //     let albumName = searchMethod.albums.items[index].name;
    //     if (albumName.length > 30) {
    //       albumName = albumName.substring(0, 27) + "...";
    //     }
    //     element.innerHTML = albumName;
    //   });
    // document
    //   .querySelectorAll(DOMElements.searchArtistName)
    //   .forEach((element, index) => {
    //     let artistNames = searchMethod.albums.items[index].artists
    //       .map((artist) => artist.name)
    //       .join(", ");
    //     if (artistNames.length > 18) {
    //       artistNames = artistNames.substring(0, 18) + "...";
    //     }
    //     element.innerHTML = artistNames;
    //   });
    // document.querySelectorAll(".result-image").forEach((element, index) => {
    //   if (
    //     searchMethod.albums.items[index] &&
    //     searchMethod.albums.items[index].images &&
    //     searchMethod.albums.items[index].images[0] &&
    //     searchMethod.albums.items[index].images[0].url
    //   ) {
    //     element.style.backgroundImage = `url(${searchMethod.albums.items[index].images[0].url})`;
    //   }
    // });
    // },
    // displaySearchRecommendation: function (searchMethod) {
    // document
    //   .querySelectorAll(DOMElements.searchSongName)
    //   .forEach((element, index) => {
    //     let songName = searchMethod.playlists.items[index].name;
    //     if (songName.length > 30) {
    //       songName = songName.substring(0, 27) + "...";
    //     }
    //     element.innerHTML = songName;
    //   });
    // document
    //   .querySelectorAll(DOMElements.searchArtistName)
    //   .forEach((element, index) => {
    //     let ownerName = searchMethod.playlists.items[index].owner.display_name;
    //     if (ownerName.length > 18) {
    //       ownerName = ownerName.substring(0, 18) + "...";
    //     }
    //     element.innerHTML = ownerName;
    //   });
    // document.querySelectorAll(".result-image").forEach((element, index) => {
    //   if (
    //     searchMethod.playlists.items[index] &&
    //     searchMethod.playlists.items[index].images &&
    //     searchMethod.playlists.items[index].images[0] &&
    //     searchMethod.playlists.items[index].images[0].url
    //   ) {
    //     element.style.backgroundImage = `url(${searchMethod.playlists.items[index].images[0].url})`;
    //   }
    // });
    // },





  //   if (accessToken) {
  //     const playlists = await APICtrl.getConnectedUserPlaylists(accessToken);
  
  //     // variables
  //     var inputElement = document.querySelector(
  //       '.search-inner-box-main input[type="text"]'
  //     );
  //     var playlistElement = document.querySelectorAll(".every-result");
  //     var playlistHeading = document.querySelectorAll(".search-result-heading");
  //     var searchList = ["Albums", "Playlists", "Songs"];
  
  //     //  Functions
  //     // Function to update search results
  //     async function updateSearchResults(inputValue) {
  //       var searchMethod;
  
  //       if (inputValue === "") {
  //         playlistHeading.forEach((singleElement, index) => {
  //           singleElement.innerHTML = index !== 0 ? "" : "Trending";
  //         });
  //         playlistElement.forEach((singleElement, index) => {
  //           singleElement.style.marginTop = index !== 0 ? "21px" : "0px";
  //         });
  //         // If the input value is empty, show default search results (e.g., "Sad")
  //         searchMethod = await APICtrl.getConnectSearch(accessToken, "", "track");
  //         UICtrl.displaySearchRecommendation(searchMethod);
  //       } else {
  //         playlistHeading.forEach((singleElement, index) => {
  //           singleElement.innerHTML =
  //             index !== 0 ? searchList[index - 1] : "Trending";
  //         });
  //         playlistElement.forEach((singleElement, index) => {
  //           singleElement.style.marginTop = index !== 0 ? "0px" : "0px";
  //         });
  //         // Otherwise, perform search based on the input value
  //         searchMethod = await APICtrl.getConnectSearch(
  //           accessToken,
  //           inputValue,
  //           "track"
  //         );
  //         UICtrl.displaySearchSongs(searchMethod);
  
  //         searchMethod = await APICtrl.getConnectSearch(
  //           accessToken,
  //           inputValue,
  //           "album"
  //         );
  //         UICtrl.displaySearchAlbums(searchMethod);
  
  //         searchMethod = await APICtrl.getConnectSearch(
  //           accessToken,
  //           inputValue,
  //           "playlist"
  //         );
  //         UICtrl.displaySearchPlaylists(searchMethod);
  //       }
  //       // console.log("input", inputElement);
  //       UICtrl.displaySearchRecommendation(searchMethod);
  
  //       // Reset styles and headings
  //     }
  //     inputElement.addEventListener("keyup", async function (event) {
  //       var inputValue = inputElement.value.trim();
  //       await updateSearchResults(inputValue);
  //     });
  //     document
  //       .querySelector(".navbar-clear-btn")
  //       .addEventListener("click", function () {
  //         inputElement.value = "";
  //         updateSearchResults("");
  //       });
  
  //     // APPController.init();
  //     const userProfile = await APICtrl.getUserProfile(accessToken);
  //     const currentlyPlaying = await APICtrl.getCurrentlyPlaying(accessToken);
  //     const currentArtist = await APICtrl.getArtist(
  //       accessToken,
  //       currentlyPlaying.item.artists[0].id
  //     );
  //     const newReleases = await APICtrl.getNewReleases(accessToken);
  
  //     // UICtrl display methods
  //     UICtrl.displayUserProfile(userProfile);
  //     UICtrl.displayArtistName(currentlyPlaying);
  //     UICtrl.displayCurrentSongName(currentlyPlaying);
  //     UICtrl.displayArtistImage(currentArtist);
  //     UICtrl.displayUserPlaylists(playlists);
  //     UICtrl.searchItemText();
  //     UICtrl.displayNewReleases(newReleases);
  
  
  //     artistData(currentArtist.name);
  //   }
  //   return {
  //     init: function () {
  //       console.log("App is starting");
  //     },
  //   };
  // })(UIController, APIController);




  // const tabs = document.querySelectorAll("#tabs a");
  //     tabs.forEach((tab) => {
  //       tab.addEventListener("click", async function (event) {
  //         event.preventDefault();
  //         tabs.forEach((t) => {
  //           t.classList.remove("active-tab");
  //           const activeDiv = t.parentElement.querySelector(".active");
  //           const hrElement = activeDiv.querySelector("hr");
  //           if (hrElement) {
  //             hrElement.remove();
  //           }
  //         });
  //         // Add 'active-tab' class to the clicked tab
  //         tab.classList.add("active-tab");

  //         // Log the active tab name
  //         console.log("Active Tab:", tab.getAttribute("data-tab"));

  //         // Add hr element to the active tab
  //         const activeDiv = tab.parentElement.querySelector(".active");
  //         const hrElement = document.createElement("hr");
  //         if (tab.getAttribute("data-tab") === "overview") {
  //           hrElement.classList.add(
  //             "w-[45px]",
  //             "h-[2px]",
  //             "mx-auto",
  //             "bg-white",
  //             "border-0",
  //             "rounded",
  //             "mt-2"
  //           );
  //           activeDiv.appendChild(hrElement);
  //         } else if (tab.getAttribute("data-tab") === "sad-songs") {
  //           hrElement.classList.add(
  //             "w-[45px]",
  //             "h-[2px]",
  //             "mx-auto",
  //             "bg-white",
  //             "border-0",
  //             "rounded",
  //             "mt-2"
  //           );
  //           let searchMethod = await APICtrl.getConnectSearch(
  //             accessToken,
  //             inputValue,
  //             "track"
  //           );
  //           UICtrl.displaySearchSongs(searchMethod);

  //           activeDiv.appendChild(hrElement);
  //         } else if (tab.getAttribute("data-tab") === "romantic-songs") {
  //           hrElement.classList.add(
  //             "w-[45px]",
  //             "h-[2px]",
  //             "mx-auto",
  //             "bg-white",
  //             "border-0",
  //             "rounded",
  //             "mt-2"
  //           );
  //           activeDiv.appendChild(hrElement);
  //         } else if (tab.getAttribute("data-tab") === "heartbreaks") {
  //           hrElement.classList.add(
  //             "w-[45px]",
  //             "h-[2px]",
  //             "mx-auto",
  //             "bg-white",
  //             "border-0",
  //             "rounded",
  //             "mt-2"
  //           );
  //           activeDiv.appendChild(hrElement);
  //         } else if (tab.getAttribute("data-tab") === "angry-mood") {
  //           hrElement.classList.add(
  //             "w-[45px]",
  //             "h-[2px]",
  //             "mx-auto",
  //             "bg-white",
  //             "border-0",
  //             "rounded",
  //             "mt-2"
  //           );
  //           activeDiv.appendChild(hrElement);
  //         } else if (tab.getAttribute("data-tab") === "joyful") {
  //           hrElement.classList.add(
  //             "w-[45px]",
  //             "h-[2px]",
  //             "mx-auto",
  //             "bg-white",
  //             "border-0",
  //             "rounded",
  //             "mt-2"
  //           );
  //           activeDiv.appendChild(hrElement);
  //         }
  //       });
  //     });
  

