import Cookies from 'vue-cookie'
import { store } from '@/store'

const TokenKey = window.global.tokenKey||store.state.sys.tokenKey;
const SidKey = window.global.sidKey||store.state.sys.sidKey;
export function getTokenKey() {
  return TokenKey
}

export function getToken() {
  const token = Cookies.get(TokenKey)
  return token == null ? sessionStorage.getItem(TokenKey) : token
}

export function setToken(token) {
  sessionStorage.setItem(TokenKey, token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem(TokenKey)
  return Cookies.delete(TokenKey)
}

export function getSidKey() {
  return SidKey
}

export function getSid() {
  const sid = Cookies.get(SidKey)
  return sid == null ? sessionStorage.getItem(SidKey) : sid
}

export function setSid(sid) {
  sessionStorage.setItem(SidKey, sid)
  return Cookies.set(SidKey, sid)
}

export function removeSid() {
  sessionStorage.removeItem(SidKey)
  return Cookies.delete(SidKey)
}

export function getUserInfo() {
  const userInfo = store.state.sys.userInfo
  return userInfo == '' ? JSON.parse(sessionStorage.getItem("userInfo")) : userInfo
}

export function setUserInfo(userinfo) {
  sessionStorage.setItem("userInfo", JSON.stringify(userinfo))
  store.commit('sys/set_userInfo', userinfo);
}

export function removeUserInfo() {
  sessionStorage.removeItem("userInfo")
}