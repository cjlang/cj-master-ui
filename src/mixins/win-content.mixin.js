var desktopIcon = {
    data() {
        return {
        }
    },
    mounted() {
        this.InitDraggable();
    },
    methods:{
        InitDraggable(){
            let that=this
            this.$(".win-content").draggable(
            { 
                cancel:".win-panel",grid: [ 1, 1],
                containment: !that.$store.state.sys.isOverDeskTop?".desktop-panel":'', 
                scroll: false,
                opacity:1,
                start: function( event, ui ) {
                    //that.$("#"+that.$(this).attr("id")+" .win-panel").css("display","none");
                    
                },
                stop: function( event, ui) {
                    //that.$("#"+that.$(this).attr("id")+" .win-panel").css("display","block");
                    that.layerY=ui.position.top
                    that.layerX=ui.position.left
                } 
            });
        }
    }
  }
  export default desktopIcon