// document.addEventListener("DOMContentLoaded", () => {
//   const sections = document.querySelectorAll(".section");

//   sections.forEach((section, index) => {
//     section.addEventListener("wheel", (event) => {
//       event.preventDefault();

//       if (event.deltaY > 0 && index < sections.length - 1) {
//         // Scroll down
//         sections[index + 1].scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       } else if (event.deltaY < 0 && index > 0) {
//         // Scroll up
//         sections[index - 1].scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//     });
//   });
// });
