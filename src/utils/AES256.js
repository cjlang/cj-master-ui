import CryptoJS from 'crypto-js'

// 默认的 KEY 与 iv
const KEY = CryptoJS.enc.Utf8.parse('uB1BxcavPH25Kb284d7NTjFWlxE5GuQa')
const IV = CryptoJS.enc.Utf8.parse('b518Gq0MXK2Q3Vxc')

// 加密
export function encrypt(word) {
  const key = KEY
  const iv = IV
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

// 解密
export function decrypt(word) {
  const key = KEY
  const iv = IV
  var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
