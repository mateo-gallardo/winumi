export default class Platform {
  static isWindows() {
    try {
      return navigator.appVersion.indexOf('Win') !== -1;
    } catch (error) {
      return false;
    }
  }
}
