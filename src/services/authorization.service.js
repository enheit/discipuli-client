import jsonwebtoken, { verify } from 'jsonwebtoken';

class Authorization {
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getProfile() {
    return jsonwebtoken.decode(Authorization.getToken());
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static clearToken() {
    localStorage.removeItem('token');
  }

  static checkToken() {
    const token = localStorage.getItem('token');
    try {
      verify(token, 'secretKey');

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default Authorization;
