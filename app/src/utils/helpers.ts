import jwtDecode from "jwt-decode";
import { TOKEN } from "./constants";

export const setToken = (token: string) => {
  return localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const decodeToken = (token: string) => {
  return jwtDecode(token);
};

export const removeToken = () => {
  return localStorage.removeItem(TOKEN);
};
