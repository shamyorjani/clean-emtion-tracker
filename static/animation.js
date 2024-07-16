// fade effect animation on start up load
document.addEventListener("DOMContentLoaded", function () {
  // Get the paragraph element
  var animatedText = document.getElementById("sia-album-text");
  var animatedPlayer = document.getElementById("top-audio-player");
  var animatedPlaylistToggler = document.getElementById("playlist-toggler");
  var animatedBackground = document.getElementById("fullscreen-animator");
  var navbarEllipsis = document.querySelector(".dropdownBtn");
  var searchInput = document.querySelector(".search_input");

  // Add the animate-once class to trigger the animation on page load
  animatedText.classList.add("animate-once");
  animatedPlayer.classList.add("animate-once");
  animatedPlaylistToggler.classList.add("animate-toggler");
  animatedBackground.classList.add("background-fade");

  navbarEllipsis.addEventListener("click", function () {
    // Move the animatedDiv back to the right
    if (animatedDiv.style.right == "0%") {
      animatedDiv.style.right = "-100%";
    }
  });

  searchInput.addEventListener("focus", function () {
    // Move the animatedDiv back to the right
    if (animatedDiv.style.right == "0%") {
      animatedDiv.style.right = "-100%";
    }
  });

  setTimeout(function () {
    animatedBackground.classList.add("hidden");
  }, 1500);

  const sections = document.querySelectorAll(".section");
  const mobileSections = document.querySelectorAll(".mobile-section");
  const animatedDiv = document.querySelector("#playlist-container");
  animatedDiv.style.right = "-100%";
  const moveBackButton = document.querySelector("#playlist-toggler");
  const rightNavigation = document.querySelector(".right-navigation-container");
  const profileName = document.querySelector("#profile-name-container");
  const bottomLeftPlayer = document.querySelector(".left-media-player");
  var animatedBackground = document.getElementById("fullscreen-animator");

  // Query for the .artist-upper-name, .album-upper-img, and .playlist-upper-name elements
  const artistNames = document.querySelectorAll(".album-upper-image-playlist");
  const playlistNames = document.querySelectorAll(".upper-image-artist");
  const singleSong = document.querySelectorAll(".album-img-container");

  // For each element, add a click event listener
  [...artistNames, ...playlistNames, ...singleSong].forEach((element) => {
    element.addEventListener("click", () => {
      simulateScroll("up");
    });
  });

  const albumImages = document.querySelectorAll(".album-upper-image");
  albumImages.forEach((element) => {
    element.addEventListener(
      "click",
      () => {
        console.log(
          "clicked album element element elementelementelementelementelementelementelement" +
            element
        );
        simulateScroll("up", { passive: false });
      },
      { passive: false }
    );
  });

  const emotionsBtn = document.getElementById("emotions_btn");
  emotionsBtn.addEventListener("click", () => {
    simulateScroll("down");
  });

  function simulateScroll(direction) {
    // Create a new event object
    const event = {
      deltaY: direction === "down" ? 1 : -1,
      cancelable: true,
      preventDefault: function () {},
    };

    // Call the customScroll function with the event object
    customScroll(event, { passive: false });
  }

  let currentSectionIndex = 0;

  // Set up the Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When the target section comes into view
          currentSectionIndex = Array.from(sections).indexOf(entry.target);
          animateSlide();
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe the last section
  observer.observe(sections[sections.length - 1]);

  // Listen for wheel events
  const playlistMainContainer = document.querySelector(
    ".playlist-main-container"
  );

  playlistMainContainer.addEventListener("mouseenter", () => {
    document.removeEventListener("wheel", customScroll);
  });

  playlistMainContainer.addEventListener("mouseleave", () => {
    document.addEventListener("wheel", customScroll);
  });

  function customScroll(event) {
    // Add your custom scrolling logic here
    // This function is called when scrolling is allowed
    if (
      event.cancelable &&
      !event.defaultPrevented &&
      !event.defaultPrevented
    ) {
      event.preventDefault();
    }

    const isScrollingDown = event.deltaY > 0;

    if (isScrollingDown && currentSectionIndex < sections.length - 1) {
      // Scroll down to the end of the current section
      if (
        sections[currentSectionIndex].scrollHeight -
          sections[currentSectionIndex].scrollTop ===
        sections[currentSectionIndex].clientHeight
      ) {
        // If at the end of the current section, move to the next section
        currentSectionIndex++;
        sections[currentSectionIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // If not at the end, continue scrolling within the current section
        sections[currentSectionIndex].scrollBy(
          0,
          sections[currentSectionIndex].clientHeight
        );
      }
    } else if (!isScrollingDown && currentSectionIndex > 0) {
      // Scroll up to the end of the previous section
      if (sections[currentSectionIndex].scrollTop === 0) {
        // If at the top of the current section, move to the previous section
        currentSectionIndex--;
        sections[currentSectionIndex].scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        // If not at the top, continue scrolling within the current section
        sections[currentSectionIndex].scrollBy(
          0,
          -sections[currentSectionIndex].clientHeight
        );
      }
    }
    resetStylesIfNeeded(currentSectionIndex);
  }

  // Attach the wheel event listener initially
  document.addEventListener("wheel", customScroll);

  // Listen for button click event
  moveBackButton.addEventListener("click", () => {
    // Move the animatedDiv back to the right
    if (animatedDiv.style.right == "0%") {
      animatedDiv.style.right = "-100%";
    } else {
      animatedDiv.style.right = "0%";
    }
  });

  function animateSlide() {
    // Slide the div from right to left
    animatedDiv.style.right = "0%";
    // Show the button after sliding
    // moveBackButton.style.right = "20px";
  }
  function resetStylesIfNeeded(sectionIndex) {
    console.log("rest section index " + sectionIndex);
    // Check if in the first section
    if (sectionIndex === 0) {
      rightNavigation.classList.remove("right-navigation-slide");
      setTimeout(function () {
        profileName.style.opacity = "1";
      }, 200);
      bottomLeftPlayer.classList.remove("bottom-player-fade");
      animatedText.classList.remove("animate-once");
      animatedText.classList.add("animate-from-up-to-down");
      //   animatedDiv.classList.remove("playlist-container-fade");
    } else {
      rightNavigation.classList.add("right-navigation-slide");
      profileName.style.opacity = ".1";
      bottomLeftPlayer.classList.add("bottom-player-fade");
      animatedDiv.classList.add("playlist-container-fade");
      animatedText.classList.remove("animate-from-up-to-down");
      animatedText.classList.remove("animate-once");
      //   setTimeout(() => {
      //   }, 700);
    }
  }
  // Get the scrollable div element
  var scrollableDiv = document.getElementById("albums-bottom-section");

  // Add an event listener to the scrollable div
  scrollableDiv.addEventListener("wheel", function (event) {
    // Calculate the amount to scroll based on the wheel delta
    var delta = event.deltaY || event.detail || event.wheelDelta;
    var scrollAmount = delta > 0 ? 50 : -50; // You can adjust the scroll amount as needed

    // Calculate the maximum scroll height for the div
    var maxScrollHeight =
      scrollableDiv.scrollHeight - scrollableDiv.clientHeight;

    // Check if the scrollable div has reached the top
    if (scrollableDiv.scrollTop === 0 && scrollAmount < 0) {
      // Allow default document scrolling behavior
      document.body.style.overflow = "hidden";
    } else {
      // Check if the scrollable div has reached the bottom
      if (scrollableDiv.scrollTop === maxScrollHeight && scrollAmount > 0) {
        // Allow default document scrolling behavior
        document.body.style.overflow = "hidden";
      } else {
        // Scroll the div
        scrollableDiv.scrollTop += scrollAmount;

        // Prevent the default behavior to avoid unexpected scrolling of the entire page
        event.preventDefault();

        // Stop the propagation of the wheel event to prevent the document's wheel event listener from executing
        event.stopPropagation();
      }
    }
  });

  document.addEventListener("touchstart", function (event) {
    startY = event.touches[0].clientY;
  });

  document.addEventListener("touchmove", function (event) {
    event.preventDefault();
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;

    const mobileAlbumsMain = document.querySelector(".mobile-albums-main");
    const maxScrollHeight =
      mobileAlbumsMain.scrollHeight - mobileAlbumsMain.clientHeight;

    if (deltaY > 0 && mobileAlbumsMain.scrollTop > 0) {
      // Scrolling up within the container
      mobileAlbumsMain.scrollBy(0, -deltaY);
    } else if (deltaY < 0 && mobileAlbumsMain.scrollTop < maxScrollHeight) {
      // Scrolling down within the container
      mobileAlbumsMain.scrollBy(0, -deltaY);
    }

    // Update the start position for the next move
    startY = currentY;
  });

  // animatedText.classList.add("animate-once");
  //   let scrolled = false;

  //   window.addEventListener("scroll", function () {
  //     // Check if the user has started scrolling
  //     if (!scrolled) {
  //       // Set scrolled to true to prevent repeated scrolling
  //       scrolled = true;

  //       // Scroll to the bottom section with a slower and smoother effect
  //       const bottomSection = document.getElementById("bottom-section");
  //       window.scrollTo({
  //         top: bottomSection.offsetTop,
  //         behavior: "smooth",
  //         duration: 2000, // Adjust the duration in milliseconds (1000ms = 1s)
  //       });
  //     }
  //   });
});
// end of animation -->
