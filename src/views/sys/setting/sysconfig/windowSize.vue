<template>
    <div class="content-panel">
        <div class="title-bar">窗口配置</div>
        <div class="content-panel-10">
            <cj-collapse :Icon='icon.isOverDeskTop' Title="桌面窗体移动" Discript="激活后窗口将可拖出桌面">
                <el-switch v-model="windowConfig.isOverDeskTop" active-color="#409EFF" inactive-color="#CCCCCC"
                    @change="startPureColor" style="position: relative;top:15px;"></el-switch>
            </cj-collapse>
            <cj-collapse :Icon='icon.taskNavMode' Title="任务栏模式" Discript="启用后将仅显示最小化窗口">
                <el-switch v-model="windowConfig.isOverDeskTop" active-color="#409EFF" inactive-color="#CCCCCC"
                    @change="startPureColor" style="position: relative;top:15px;"></el-switch>
            </cj-collapse>
            <cj-collapse :Icon='icon.windowSize' Title="窗口尺寸设置" Discript="正常窗口的大小">
                <div style="position: relative;top:10px;">
                    <el-input v-model="windowConfig.windowWidth" placeholder="宽度" style="width:35%;"></el-input>
                    *
                    <el-input v-model="windowConfig.windowHeight" placeholder="高度" style="width:35%;"></el-input>
                </div>
            </cj-collapse>
            <cj-collapse :Icon='icon.windowMinSize' Title="窗口尺寸设置" Discript="窗口最小尺寸大小">
                <div style="position: relative;top:10px;">
                    <el-input v-model="windowConfig.windowMinWidth" placeholder="宽度" style="width:35%;"></el-input>
                    *
                    <el-input v-model="windowConfig.windowMinHeight" placeholder="高度" style="width:35%;"></el-input>
                </div>
            </cj-collapse>
        </div>
        <div class="title-bar">右键菜单</div>
        <div class="content-panel-20"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            icon: {
                isOverDeskTop: '\uea98',
                taskNavMode: '\ue992',
                windowSize: '\uea0e',
                windowMinSize: '\uece0'
            },
            windowConfig: {
                isOverDeskTop: '0',
                taskNavMode: 'nomal',
                windowWidth: 960,
                windowHeight: 600,
                windowMinWidth: 400,
                windowMinHeight: 400
            }
        };
    },
    created() {

    },
    methods: {

    }
}
</script>
<style scoped lang="scss">

</style>