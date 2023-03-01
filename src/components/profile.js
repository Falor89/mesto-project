export{ profile, profileUserName, profileUserAbout, profileUserAvatar, profileUserAvatarButton, renderProfileInfo}
const profile = document.querySelector('.profile');
const profileUserName = profile.querySelector('.profile__title');
const profileUserAbout = profile.querySelector('.profile__subtitle');
const profileUserAvatar = profile.querySelector('.profile__avatar');
const profileUserAvatarButton = profile.querySelector('.profile__button-avatar')

function renderProfileInfo(userInfo) {
  profileUserName.textContent = userInfo.name;
  profileUserAbout.textContent = userInfo.about;
  profileUserAvatar.src = userInfo.avatar
}
