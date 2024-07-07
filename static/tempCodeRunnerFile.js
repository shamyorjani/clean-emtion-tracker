// function createAudioPlayer() {
//   var audioPlayer;
//   var trackList;
//   var trackListLen;
//   var currentTrack = 0;
//   var isShuffle = false;
//   var isRepeat = false;
//   var informationDivLeft;
//   var informationDivRight;
//   var progressbar;
//   var progressbarWidth;
//   var progressmeter;

//   return {
//     init: init,
//     play: play,
//     pause: pause,
//     stop: stop,
//     toggleShuffle: toggleShuffle,
//     toggleRepeat: toggleRepeat,
//   };

//   function play() {
//     audioPlayer.play();
//   }

//   function pause() {
//     audioPlayer.pause();
//   }

//   function stop() {
//     audioPlayer.pause();
//     audioPlayer.currentTime = 0;
//   }

//   function seeking(e) {
//     var percent = e.offsetX / progressbarWidth;
//     audioPlayer.currentTime = percent * audioPlayer.duration;
//   }

//   function displayTime(seconds) {
//     var minutes = parseInt(seconds / 60);
//     seconds = parseInt(seconds - minutes * 60);
//     return minutes + ":" + seconds;
//   }

//   function updateTime() {
//     informationDivLeft.innerHTML = displayTime(audioPlayer.currentTime);
//     informationDivRight.innerHTML = displayTime(audioPlayer.duration);
//     var percent = audioPlayer.currentTime / audioPlayer.duration;
//     progressmeter.style.width = percent * progressbarWidth + "vw";
//   }

//   function playCurrentTrack() {
//     audioPlayer.pause();
//     audioPlayer.src = trackList[currentTrack].src;
//     audioPlayer.load();
//     audioPlayer.play();
//     updateTime();
//     document.querySelector(".song-title").innerHTML =
//       trackList[currentTrack].title;
//   }

//   function playPrevious() {
//     if (isShuffle) {
//       currentTrack = getRandomTrack();
//     } else if (currentTrack > 0) {
//       currentTrack--;
//     } else {
//       currentTrack = trackListLen - 1;
//     }
//     playCurrentTrack();
//   }

//   function playNext() {
//     if (isShuffle) {
//       currentTrack = getRandomTrack();
//     } else if (currentTrack < trackListLen - 1) {
//       currentTrack++;
//     } else if (isRepeat) {
//       currentTrack = 0;
//     } else {
//       stop();
//       currentTrack = 0;
//     }
//     console.log(currentTrack);
//     playCurrentTrack();
//   }

//   function getRandomTrack() {
//     var randomIndex = Math.floor(Math.random() * trackListLen);
//     return randomIndex;
//   }

//   function toggleShuffle() {
//     isShuffle = !isShuffle;
//   }

//   function toggleRepeat() {
//     isRepeat = !isRepeat;
//   }

//   function init() {
//     var audioPlayers = document.querySelectorAll(".audio-player");
//     for (var i = 0; i < audioPlayers.length; i++) {
//       var playerElement = audioPlayers[i];

//       // trackList = [
//       //   {
//       //     title: "Some misuse of audio equipment",
//       //     src: "./sounds/badsound.mp3",
//       //     type: "audio/mpeg",
//       //   },
//       //   {
//       //     title: "Example speech",
//       //     src: "./sounds/example.mp3",
//       //     type: "audio/mpeg",
//       //   },
//       //   {
//       //     title: "A rendition of the wikipedia random game",
//       //     src: "./sounds/random.mp3",
//       //     type: "audio/mpeg",
//       //   },
//       // ];

//       trackList = [
//         {
//           title: "Some misuse of audio equipment",
//           src: "{{url_for('static',filename='sounds/badsound.mp3')}}",
//           type: "audio/mpeg",
//         },
//         {
//           title: "Example speech",
//           src: "{{url_for('static',filename='sounds/example.mp3')}}",
//           type: "audio/mpeg",
//         },
//         {
//           title: "A rendition of the wikipedia random game",
//           src: "{{url_for('static',filename='sounds/random.mp3')}}",
//           type: "audio/mpeg",
//         },
//       ];

//       trackListLen = trackList.length;
//       audioPlayer = new Audio();
//       audioPlayer.addEventListener("ended", function () {
//         playNext();
//       });
//       audioPlayer.addEventListener("timeupdate", function () {
//         updateTime();
//       });
//       audioPlayer.addEventListener("loadedmetadata", function () {
//         updateTime();
//       });
//       audioPlayer.src = trackList[currentTrack].src;

//       // var stopButton = document.querySelector(".stopBtn");
//       // stopButton.onclick = stop;

//       var playButton = document.querySelector(".playBtn");
//       playButton.onclick = function () {
//         play();
//         checkPlayStatus();
//       };

//       var pauseButton = document.querySelector(".pauseBtn");
//       pauseButton.onclick = function () {
//         pause();
//         checkPlayStatus();
//       };

//       var nextButton = document.querySelector(".nextBtn");
//       nextButton.onclick = playNext;

//       var previousButton = document.querySelector(".previousBtn");
//       previousButton.onclick = playPrevious;

//       var shuffleButton = document.querySelector(".shuffleBtn");
//       shuffleButton.onclick = function () {
//         toggleShuffle();
//         shuffleButton.classList.toggle("active", isShuffle);
//       };

//       var repeatButton = document.querySelector(".repeatBtn");
//       repeatButton.onclick = function () {
//         toggleRepeat();
//         repeatButton.classList.toggle("active", isRepeat);
//       };

//       informationDivLeft = playerElement.querySelector(
//         ".audio-player-info-left"
//       );
//       informationDivRight = playerElement.querySelector(
//         ".audio-player-info-right"
//       );
//       progressbar = playerElement.querySelector(".audio-player-progressbar");
//       // if (progressbar) {
//       progressbar.addEventListener("click", seeking);
//       progressbarWidth = progressbar.offsetWidth;
//       // }
//       progressmeter = playerElement.querySelector(
//         ".audio-player-progressmeter"
//       );
//     }
//     function checkPlayStatus() {
//       if (audioPlayer.paused) {
//         document.querySelector(".pauseBtn").classList.add("hidden");
//         document.querySelector(".playBtn").classList.remove("hidden");
//       } else if (audioPlayer.played) {
//         document.querySelector(".pauseBtn").classList.remove("hidden");
//         document.querySelector(".playBtn").classList.add("hidden");
//       }
//     }
//     playCurrentTrack();
//     checkPlayStatus();
//   }
// }
// // document.addEventListener("DOMContentLoaded", function () {
// //   var player = createAudioPlayer();
// //   player.init();
// // });
