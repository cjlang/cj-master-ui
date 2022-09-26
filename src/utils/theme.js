import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'
import { store } from '@/store'

let curColor = window.global.themeDefault||store.state.sys.themeColor
export function changeThemeColor (newColor) {
  var options = {
    newColors: [...forElementUI.getElementUISeries(newColor)]
  }
  return client.changer.changeColor(options, Promise)
    .then(() => {
      curColor = newColor
      localStorage.setItem('theme_color', curColor)
    })
}
export function initThemeColor () {
  let savedColor = localStorage.getItem('theme_color')||window.global.themeDefault||store.state.sys.themeColor
  if (savedColor) {
    curColor = savedColor
    changeThemeColor(savedColor)
  }else
  {
    changeThemeColor(curColor)
  }
}
