import JwtDecode from "jwt-decode";

export default class User {
  static from(token) {
    try {
      let obj = JwtDecode(token);
      return new User(obj);
    } catch (_) {
      return null;
    }
  }

  constructor({ user_id, admin, email, profile_slug }) {
    this.id = user_id; // eslint-disable-line camelcase
    this.admin = admin;
    this.email = email;
    this.profile_slug = profile_slug;
  }

  get isAdmin() {
    return this.admin;
  }
}
