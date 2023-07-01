// AuthService.js
import Cookies from "js-cookie";
import { axiosInstance } from "./axiosInstance";

export default class AuthService {
  static async authenticate(username, password) {
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      if (res.status === 200) {
        const token = res.data.token;
        Cookies.set("auth", token, {
          expires: 1,
          secure: true,
          sameSite: "none",
        });
        // set a cookie named 'auth' which expires in 7 days
        console.log("Cookie after setting: ", Cookies.get("auth"));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static signout() {
    Cookies.remove("auth"); // remove the 'auth' cookie when signing out
  }

  static getToken() {
    return Cookies.get("auth");
  }
}
