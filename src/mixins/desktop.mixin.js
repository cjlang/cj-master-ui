import EventBus from '@/utils/eventbus.js'
import {saveUserConfig} from '@/api/userConfig.js'
var desktop = {
    data() {
        return {
            layerX:0,
            layerY:0,
            layerX1:0,
            layerY1:0,
            winBox: [],
            currentMoveApp:''
        }
    },
    mounted() {
        var that=this;
        setTimeout(function(){
            that.ctrl.desktoptaskshow=true;
        },500)
    },
    methods:{
        /**绑定桌面图标拖动事件 */
        bindDraggableAndDroppableEvent(){
            var that=this;
            /**拖动图标，重新布局 */
            this.$(".appicon").draggable({ 
                cancel:".title",grid: [ 1, 1 ],
                containment: ".desktop-panel", 
                scroll: false,
                tolerance: "intersect",
                opacity:1,
                stop: function( event, ui) {
                    this.layerX=ui.position.left
                    this.layerY=ui.position.top
                    let menucode=that.$(this).attr("menuCode");
                    for(let i=0;i<that.desktopMenus.length;i++){
                        if(that.desktopMenus[i].menuCode==menucode)
                        {
                            that.desktopMenus[i].layerX=this.layerX;
                            that.desktopMenus[i].layerY=this.layerY;
                        }
                    }
                    that.$store.commit('window/update_desktop_menu', that.desktopMenus);
                    that.$store.commit('window/update_manualOrderIcon', '1')
                    saveUserConfig({groupName:'system',configName:'manualOrderIcon',configValue:'1'},function(){})
                    that.currentMoveApp=menucode;
                }
            });
            /**拖动到垃圾箱，重叠超过50%以上，就清理掉 */
            this.$(".appicon").droppable({
                drop: function( event, ui ) {
                    if(that.$(this).attr("menuCode")==that.$store.state.sys.recycleBinId)
                    {
                        setTimeout(function(){
                            if(that.currentMoveApp!='')
                            {
                                EventBus.$emit('full-recyclebin',false);
                                that.desktopMenus = that.desktopMenus.filter(function (item) {
                                    return item.menuCode != that.currentMoveApp
                                })
                                that.$store.commit('window/update_desktop_menu', that.desktopMenus);
                                that.$mynotify({title: '提示',message: '菜单【'+that.currentMoveApp+'】已被移出桌面！',duration:1000});
                            }
                        },200);
                    }
                } 
            });
        },
        registerEvent(){
            EventBus.$on('refrash-window',data=>{
                this.winBox =JSON.parse(JSON.stringify(this.$store.state.window.winBox))
            });
            EventBus.$on('filter-desktop',data=>{
                if(this.$store.state.sys.desktopFilter)
                {
                    this.$(".desktop-panel").css('filter','blur(4px)');
                }
            });
            EventBus.$on('unfilter-desktop',data=>{
                this.$(".desktop-panel").css('filter','blur(0px)');
            });
            EventBus.$on('open-window',data=>{
                this.openWin(data)
            });
            EventBus.$on('open-newpage',data=>{
                this.$store.commit('window/update_window_menu_routes_info',data)
                this.$router.push('/home/'+data.urlPath)
            });
            EventBus.$on('open-startmenu',data=>{
                this.ctrl.startpanel=!this.ctrl.startpanel
                EventBus.$emit('show-favoriteapp',this.ctrl.startpanel);
                EventBus.$emit('show-allprogram',this.ctrl.startpanel);
                EventBus.$emit('unfilter-desktop', true);
                
            });
            EventBus.$on('open-contextclearrecyclebin',data=>{
                this.CancleShortCut(data)
            });
            EventBus.$on('open-morefunc',data=>{
                this.ctrl.morefunc=!this.ctrl.morefunc;
            });
            /**隐藏垃圾箱上右键的清除菜单 */
            EventBus.$on('close-contextclearrecyclebin',data=>{
                this.ctrl.contextclearrecyclebinshow=false;
            });
            EventBus.$on('close-startmenu',data=>{
                this.ctrl.startpanel=false;
                EventBus.$emit('show-favoriteapp',false);
                EventBus.$emit('show-allprogram',false);
            });
            EventBus.$on('close-noticecenter',data=>{
                this.ctrl.noticepanel=false;
            });
            EventBus.$on('close-contextmenu',data=>{
                this.ctrl.contexmenushow=false;
            });
            EventBus.$on('close-morefunc',data=>{
                this.ctrl.morefunc=false;
            });
            EventBus.$on('reset-appposition',data=>{
                this.setDesktopMenuAutoPosition();
            });
            EventBus.$on('event-bindDraggableAndDroppableEvent',data=>{
                this.bindDraggableAndDroppableEvent()
            });
            EventBus.$on('send-desktopicon',data=>{
                let menuhas=this.desktopMenus.filter(function (item) {
                    return item.menuCode == data
                  })
                if(menuhas.length==0)
                {
                    let menu=this.$store.state.window.allMenu.filter(function (item) {
                        return item.menuCode == data
                    })
                    this.desktopMenus.push(menu[0]);
                    this.$store.commit('window/update_desktop_menu', this.desktopMenus);
                    this.setDesktopMenuAutoPosition();
                    saveUserConfig({groupName:'system',configName:'desktopMenu',configValue:JSON.stringify(this.desktopMenus)},function(){})
                    this.$notify({title: '提示',message: '已将【'+menu[0].menuName+'】快捷方式到桌面！'});
                    let that=this
                    setTimeout(function(){
                        that.bindDraggableAndDroppableEvent()
                    },1500)
                    
                }else
                {
                    this.$notify({title: '提示',message: '桌面已经存在！'});
                }
                
            });
            EventBus.$on('refrash-desktop-menu',data=>{
                this.desktopMenus=this.$store.state.window.desktopMenu;
                this.setDesktopMenuAutoPosition();
            });
            EventBus.$on('update-bottomtask-color',data=>{
                this.$('.desktop-task').css('background',data)
                this.$store.commit('sys/set_bottomTaskColor',data);
            })
            EventBus.$on('update-noticepanel-color',data=>{
                this.$store.commit('sys/set_noticePanelColor',data);
                this.$('.notice-panel').css('background',data)
            })
            EventBus.$on('update-morefunc-color',data=>{
                this.$store.commit('sys/set_moreFuncColor',data);
                this.$('.morefunc-panel').css('background',data)
            })
        },
        openStartMenu(){
            EventBus.$emit('open-startmenu',true);
            EventBus.$emit('close-morefunc',false);
            if(this.ctrl.startpanel)
            {
                EventBus.$emit('filter-desktop',true);
            }else
            {
                EventBus.$emit('unfilter-desktop',false);
            }
        },
        hiddenContext(){
            this.ctrl.contexmenushow=false;
        },
        clickDeskTop(){
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-startmenu',false);
            EventBus.$emit('close-noticecenter',false);
            EventBus.$emit('close-contextmenu',false);
            EventBus.$emit('close-morefunc',false);
            EventBus.$emit('unfilter-desktop',false);
        },
        ClickDesktopTask(){
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-contextmenu',false);
            EventBus.$emit('filter-desktop',false);
        },
        openContextMenu(e){
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-startmenu',false);
            EventBus.$emit('close-noticecenter',false);
            EventBus.$emit('close-morefunc',false);
            if(this.ctrl.contexmenushow)
            {
                this.ctrl.contexmenushow=false;
                var that=this;
                setTimeout(function(){
                    that.ctrl.contexmenushow=true
                    if(e.layerX>=that.$(".desktop-panel").width()-100)
                    {
                        that.layerX=e.layerX-100;
                    }else
                    {
                        that.layerX=e.layerX;
                    }
                    if(e.layerY>=that.$(".desktop-panel").height()-100)
                    {
                        that.layerY=e.layerY-100;
                    }else
                    {
                        that.layerY=e.layerY;
                    }
                },500);
            }else{
                this.ctrl.contexmenushow=true
                if(e.layerX>=this.$(".desktop-panel").width()-100)
                {
                    this.layerX=e.layerX-100;
                }else
                {
                    this.layerX=e.layerX;
                }
                if(e.layerY>=this.$(".desktop-panel").height()-100)
                {
                    this.layerY=e.layerY-100;
                }else
                {
                    this.layerY=e.layerY;
                }
            }
        },
        openWin (winObj) {
            if(this.$store.state.window.winBox.length>=this.$store.state.window.windowMaxNum)
            {
                EventBus.$emit('change-window-close',this.$store.state.window.winBox[0].WinId);
            }
            if(!this.isCreateWin(winObj))
            {
                this.$store.commit('window/add_window', this.createWin(winObj))
                this.winBox =JSON.parse(JSON.stringify(this.$store.state.window.winBox))
                this.$nextTick(function () {
                    this.InitDraggable()
                })
                if(!winObj.hasOwnProperty("iframe") || winObj.iframe=='0')
                {
                    this.$router.push('/home/'+winObj.urlPath)
                }else
                {
                    this.$router.push({path:'/home/'+winObj.urlPath,query:{iframePath:winObj.iframePath,menuCode:winObj.menuCode}});
                }
            }else
            {   //如果已经创建，那么可能是最小化，那么恢复它即可
                this.winBox =this.$store.state.window.winBox
                let tempwin = this.$store.state.window.winBox.filter(function (item) {
                    return item.menuCode == winObj.menuCode
                })
                if(tempwin.length>0)
                {
                    EventBus.$emit('window-nomal',tempwin[0].WinId);
                }
            }
        },
        createWin (winObj) {
          var num = this.$store.state.window.winIndex
          let desktopHeight=this.$store.state.window.desktopHeight;
          let desktopWidth=this.$store.state.window.desktopWidth;
          //X方向剩余的宽度
          let px=desktopWidth-this.$store.state.sys.windowSize.width;
          //Y方向剩余高度
          let py=desktopHeight-this.$store.state.sys.windowSize.height;
          this.$store.state.sys.windowSize2.forEach(item => {
                if(item.menuCode==winObj.menuCode)
                {
                    if(item.width!='')
                    {
                        px=desktopWidth-item.width;
                    }
                    if(item.height!=''){
                        py=desktopHeight-item.height;
                    }
                }
            });
          //让随机的范围小一点，尽量居中
          let layerX_temp=px>0?Math.round((px/4)+Math.random()*(px/4)):0;
          let layerY_temp=py>0?Math.round((py/4)+Math.random()*(py/4)):0;
          var box = { 
              WinId: 'W' + num, 
              menuCode:winObj.menuCode,
              menuName: winObj.menuName, 
              layerX: layerX_temp, 
              layerY: layerY_temp, 
              ZIndex: num + 20, 
              WinStatus:'NOMAL',
              urlPath: winObj.urlPath,
              component:winObj.component }
            if(winObj.hasOwnProperty("sysWindow")){
                box.sysWindow=winObj.sysWindow;
            }else
            {
                box.sysWindow=false;
            }
          return box
        },
        isCreateWin(winObj)
        {
            var tempwinbox=this.$store.state.window.winBox.filter((item)=>{return item.menuCode==winObj.menuCode})
            if(tempwinbox.length>0)
            {
                EventBus.$emit('active-window',tempwinbox[0].WinId);
                return true;
            }
            return false;
        },
        CancleShortCut(e){
            var that=this;
            if(this.ctrl.contextclearrecyclebinshow)
            {
                this.ctrl.contextclearrecyclebinshow=false;
                setTimeout(function(){
                    that.layerX1=e.X;
                    that.layerY1=e.Y;
                    that.ctrl.contextclearrecyclebinshow=true
                },500);
            }else{

                that.layerX1=e.X;
                that.layerY1=e.Y;
                setTimeout(function(){
                    that.ctrl.contextclearrecyclebinshow=true
                },200);
            }
        },
        OpenMoreFunc(){
            EventBus.$emit('open-morefunc',true);
            EventBus.$emit('close-noticecenter',false);
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-startmenu',false);
            EventBus.$emit('close-contextmenu',false);
        },
        OpenTestFunc(){
            this.$mynotify({title: '标题名称',message: '打开一个新窗口',duration: 0});
        },
        /**做梦图标自动排序 */
        setDesktopMenuAutoPosition(){//根据屏幕高度来变化位置
            //自动排序，归零之前的位置
            if(this.$store.state.window.manualOrderIcon=='0')
            {
                let desktopHeight=this.$store.state.window.desktopHeight;
                let col= Math.ceil((this.desktopMenus.length*100)/desktopHeight);
                let row=Math.floor(desktopHeight/100)
                for(let i=0;i<col;i++){
                    for(let j=0;j<row;j++){
                        let index=(i*row)+j;
                        if(index<this.desktopMenus.length)
                        {
                            this.desktopMenus[index].Inx=index+1;
                            this.desktopMenus[index].layerX=(i*100)+40;
                            this.desktopMenus[index].layerY=100*j+40;
                        }
                    }
                }
            }else{//手动排序

                let desktopHeight=this.$store.state.window.desktopHeight;
                let col= Math.ceil((this.desktopMenus.length*100)/desktopHeight);
                let row=Math.floor(desktopHeight/100)
                for(let i=0;i<col;i++){
                    for(let j=0;j<row;j++){
                        let index=(i*row)+j;
                        if(index<this.desktopMenus.length)
                        {
                            this.desktopMenus[index].Inx=index+1;
                            if(this.desktopMenus[index].layerX=='' || this.desktopMenus[index].layerX=='0')
                            {
                                this.desktopMenus[index].layerX=(i*100)+40;
                            }
                            if(this.desktopMenus[index].layerY=='' || this.desktopMenus[index].layerY=='0')
                            {
                                this.desktopMenus[index].layerY=100*j+40;
                            }
                        }
                    }
                }

            }
        }
    }
  }
  export default desktop