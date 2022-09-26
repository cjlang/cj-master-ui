<template>
    <div>
        <el-button type="primary" @click="refrashData()">重新加载数据</el-button>
        <el-divider content-position="left">this.$store.state.window.currentActiveWindowPath</el-divider>
        <span>{{currentActiveWindowPath}}</span>
        <el-divider content-position="left">this.$store.state.window.winBox</el-divider>
        <pre id="data_info" v-html="winBox"></pre>
        <el-divider content-position="left">this.$store.state.window.routes</el-divider>
        <pre id="data_info" v-html="routes"></pre>
    </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    props: {
        WinId: {
            type: String,
            default: 'W0'
        }
    },
    data() {
        return {
            winBox: '',
            routes: '',
            currentActiveWindowPath: ''

        }
    },
    created() {
        this.refrashData();

        EventBus.$on('system-info-refrash', data => {
            this.refrashData();
        });
    },
    methods: {
        refrashData() {
            this.winBox = this.$tools.pretifyJson(this.$store.state.window.winBox, true);
            this.routes = this.$tools.pretifyJson(this.$store.state.window.routes, true);
            this.currentActiveWindowPath = this.$tools.pretifyJson(this.$store.state.window.currentActiveWindowPath, true);
        }
    }
}
</script>
<style scoped lang="scss">
#data_info {
    width: 100%;
    font-size: 16px;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.string {
    color: green;
}

.number {
    color: darkorange;
}

.boolean {
    color: blue;
}

.null {
    color: magenta;
}

.key {
    color: red;
}
</style>