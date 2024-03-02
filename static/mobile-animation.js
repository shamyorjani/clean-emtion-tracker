

document.addEventListener("DOMContentLoaded", function () {
let mobileCurrentSectionIndex = 0;

// Set up the Intersection Observer
const mobileObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When the target section comes into view
        mobileCurrentSectionIndex = Array.from(mobileSections).indexOf(entry.target);
        animateSlide();
      }
    });
  },
  { threshold: 0.5 }
);

// Observe the last section
mobileObserver.observe(mobileSections[mobileSections.length - 1]);

// Listen for wheel events
document.addEventListener(
  "wheel",
  (event) => {
    event.cancelable && event.preventDefault();
    const isScrollingDown = event.deltaY > 0;

    if (isScrollingDown && mobileCurrentSectionIndex < mobileSections.length - 1) {
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
    } else if (!isScrollingDown && mobileCurrentSectionIndex > 0) {
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
    }
    resetStylesIfNeeded(mobileCurrentSectionIndex);
    //   console.log(currentSectionIndex);
  },
  { passive: false }
);
})