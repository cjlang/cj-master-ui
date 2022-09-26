<template>
    <div class="content-panel-20 desktop-setting">
        <el-row :gutter="10">
            <el-col :span="6">
                <div class="grid-content">
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>设置1</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>设置1</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>设置1</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>设置1</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                    style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;">
                                </el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送">
                            <el-switch v-model="form.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="活动性质">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                <el-checkbox label="地推活动" name="type"></el-checkbox>
                                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="特殊资源">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="线上品牌商赞助"></el-radio>
                                <el-radio label="线下场地免费"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style scoped lang="scss">
.desktop-setting {
    .grid-content {
        width: 100%;
        height: 100%;
    }

    .setting-item {
        width: 36px;
        width: 100%;
        display: block;

        span {
            width: calc(100% - 36px);
            height: 36px;
            font-size: 16px;
            font-weight: 500;
            color: #444444;
            line-height: 36px;
            float: left;
        }

        i {
            width: 36px;
            height: 36px;
            font-size: 16px;
            font-weight: 500;
            color: #444444;
            line-height: 36px;
            float: right;
        }

        &:hover {
            cursor: pointer;
            background-color: rgba($color: #000000, $alpha: 0.2)
        }
    }
}
</style>