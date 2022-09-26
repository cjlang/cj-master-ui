import $ from 'jquery'
import { store } from '@/store'
/**
 * window管理工具类
 */
const utils = {

    getDesktopSize () {
        return {
            height : store.state.window.desktopHeight,
            width : store.state.window.desktopWidth
        }
    },
    /**
     * 
     * @returns 
            menuCode:'system',
            menuName: '系统设置', 
            layerX: 120, 
            layerY: 300, 
            urlPath: ''
            component:''
            width:960
            minWidth:960
            height:600,
            minHeight:800
            sysWindow:true,
            icon:'',
            iconColor: '#00FF00',
            imgOrIcon: 'image',
            imgUrl: require('@/assets/image/app/contrl.png'),
            iframe: false,
            iframeUrl: '',
            span:8
     */
    getActiveWindow(){
        let temp = store.state.window.winBox.filter(function (item) {
            return item.menuCode == store.state.window.currentActivemenuCode
        })
        if(temp.length>0){
            let win=JSON.parse(JSON.stringify(temp[0]));
            win.winWidth=$("#"+win.WinId).width()
            win.winHeight=$("#"+win.WinId).height()
            return win
        }else
        {
            return {}
        }
    },
    
}
export default utils
