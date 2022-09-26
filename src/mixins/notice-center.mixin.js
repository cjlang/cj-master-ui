import EventBus from '@/utils/eventbus.js'
var noticeCenter = {
    data() {
        return {

        }
    },
    mounted() {
        this.timer = setInterval(() => {
            this.newMsgNotify();
        }, 1000);
    },
    methods:{
        openNoticePanel(){
            this.ctrl.noticepanel=!this.ctrl.noticepanel;
            if(this.ctrl.noticepanel)
            {
                EventBus.$emit('filter-desktop',true);
            }else
            {
                EventBus.$emit('unfilter-desktop',false);
            }
            EventBus.$emit('close-morefunc',false);
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-startmenu',false);
            EventBus.$emit('close-contextmenu',false);
        },
        newMsgNotify(){
            if(this.$store.state.window.notifyNum>0){
                if(this.$(".btn-notice").hasClass("btn-notice2")){
                    this.$(".btn-notice").removeClass("btn-notice2");
                }else{
                    this.$(".btn-notice").addClass("btn-notice2");
                }
                
            }else
            {
                this.$(".btn-notice").removeClass("btn-notice2");
            }
        }
    },
    beforeDestroy(){
        clearInterval(this.timer);
    }
  }
  export default noticeCenter