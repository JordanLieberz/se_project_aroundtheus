class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this.nameEl = document.querySelector(nameSelector);
    this.aboutEl = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userName = this.nameEl.textContent;
    const userAbout = this.aboutEl.textContent;
    return { name: userName, about: userAbout };
  }
  setUserInfo({ name, about }) {
    this.nameEl.textContent = name;
    this.aboutEl.textContent = about;
    console.log(name, about);
  }
}
export default UserInfo;
