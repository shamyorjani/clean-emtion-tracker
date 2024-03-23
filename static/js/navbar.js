var inputElement = document.querySelector(
  '.search-inner-box-main input[type="text"]'
);

function displayUserProfile(userProfile) {
  const userProfileContainer = document.querySelector(
    "#profile-name-container"
  );
  userProfileContainer.innerHTML = ""; // Clear existing content

  const profileItem = document.createElement("div");
  profileItem.setAttribute("class", "flex items-center");
  if (userProfile.images) {
    profileItem.innerHTML = `
              <img src="${userProfile.images[0].url}" class="profile-image" alt="Profile Image">
              
              <a href="${userProfile.external_urls.spotify}" id="profile-name" class= "text-[#bdc0c0]">${userProfile.display_name}</a>
              `;
  }
  userProfileContainer.appendChild(profileItem);
  //   console.log(userProfile);
}
