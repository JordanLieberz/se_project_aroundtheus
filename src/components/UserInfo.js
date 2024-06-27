class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this.nameEl = document.querySelector(nameSelector);
    this.aboutEl = document.querySelector(aboutSelector);
    this.avatarEl = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userName = this.nameEl.textContent;
    const userAbout = this.aboutEl.textContent.trim();
    return { name: userName, about: userAbout };
  }
  setUserInfo({ name, about }) {
    this.nameEl.textContent = name;
    this.aboutEl.textContent = about;
    console.log(name, about);
  }

  setAvatar(link) {
    this.avatarEl.src = link;
  }
}
export default UserInfo;
