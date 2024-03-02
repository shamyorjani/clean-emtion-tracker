let mobileCurrentSectionIndex = 0;
let startY;

// Set up the Intersection Observer
const mobileObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When the target section comes into view
        mobileCurrentSectionIndex = Array.from(mobileSections).indexOf(
          entry.target
        );
        animateSlide();
      }
    });
  },
  { threshold: 1 }
);

// Observe the last section
mobileObserver.observe(mobileSections[mobileSections.length - 1]);

// Listen for touch events for scrolling
document.addEventListener(
  "touchstart",
  (event) => {
    startY = event.touches[0].clientY;
  },
  { passive: true }
);

document.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;

    // Adjust the logic to move in the opposite direction of the user's movement
    if (deltaY > 0 && mobileCurrentSectionIndex > 0) {
      // Scroll up to the end of the previous section
      if (mobileSections[mobileCurrentSectionIndex].scrollTop === 0) {
        // If at the top of the current section, move to the previous section
        mobileCurrentSectionIndex--;
        mobileSections[mobileCurrentSectionIndex].scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        // If not at the top, continue scrolling within the current section
        mobileSections[mobileCurrentSectionIndex].scrollBy(
          0,
          -mobileSections[mobileCurrentSectionIndex].clientHeight
        );
      }
    } else if (
      deltaY < 0 &&
      mobileCurrentSectionIndex < mobileSections.length - 1
    ) {
      // Scroll down to the end of the current section
      if (
        mobileSections[mobileCurrentSectionIndex].scrollHeight -
          mobileSections[mobileCurrentSectionIndex].scrollTop ===
        mobileSections[mobileCurrentSectionIndex].clientHeight
      ) {
        // If at the end of the current section, move to the next section
        mobileCurrentSectionIndex++;
        mobileSections[mobileCurrentSectionIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // If not at the end, continue scrolling within the current section
        mobileSections[mobileCurrentSectionIndex].scrollBy(
          0,
          mobileSections[mobileCurrentSectionIndex].clientHeight
        );
      }
    }
    resetStylesIfNeeded(currentSectionIndex);
    startY = currentY;
  },
  { passive: false }
);
