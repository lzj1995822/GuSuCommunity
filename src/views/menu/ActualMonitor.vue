<template>
    <section style="display: flex;height: 700px">
        <div style="flex: 1">
            <el-input
                placeholder="输入关键字进行过滤"
                size="large"
                v-model="filterText"
                style="margin: 12px">
            </el-input>
            <el-tree
                :data="treeData"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
                :highlight-current="true"
                ref="tree"
                style="margin: 0 12px"
                @node-expand="showChildren">
            </el-tree>
        </div>
        <div style="flex: 3;margin: 12px 5px">
            <object classid="clsid:9ECD2A40-1222-432E-A4D4-154C7CAB9DE3" id="spv"  width="95%" height="100%;"></object>
        </div>
    </section>
</template>

<script>
    import md5 from '@/utils/md5';
    export default {
        name: "ActualMonitor",
        data() {
            return {
                treeData: [],
                filterText: ''
            }
        },
        watch: {
            filterText(val) {
                if (!val) {
                    this.loadTreeData();
                }
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            showChildren(obj, node) {
                if (obj.children[0].label !== '加载中...') {
                    return;
                }
                this.$http("post", '/identity/camera/list', {regionUuid: obj.id}, false).then(
                    data => {
                        obj.children = data.map(item => {
                           return {
                               id: item.cameraUuid,
                               label: item.cameraName,
                               name: item.cameraName
                           }
                        })
                    }
                );
            },
            filterNode(value, data) {
                if (!value) {
                    this.loadTreeData();
                    return true;
                }
                return data.name.indexOf(value) !== -1;
            },
            handleNodeClick(obj) {
                if (obj.children) {
                    return;
                }
                this.initVideoDialogVue(obj.id);
            },
            loadTreeData() {
                this.$http('post', '/identity/projectRegion/list', false).then(
                    data => {
                        if (this.$store.state.projectName) {
                            this.filterText = this.$store.state.projectName;
                            data.forEach((item) => {
                                if (item.name === this.filterText) {
                                    this.treeData.push({ id: item.regionUuid, label: item.name, name: item.name,children: [{label: '加载中...', name: ''}]});
                                }
                            })
                        } else {
                            data.forEach(item => {
                                this.treeData.push({ id: item.regionUuid, label: item.name, name: item.name,children: [{label: '加载中...', name: ''}]});
                            });
                        }
                        this.$store.commit('getProjectName', '');
                        let spv = document.getElementById('spv');
                        this.initSpvx(spv);
                        this.setLocalParam(spv);
                    }
                )
            },
            initVideoDialogVue(cameraUuid) {
                let time = new Date().getTime();
                const IP_PORT = "http://122.97.218.162:18080";
                const APP_KEY = "a592d676";
                const opUserUuid = 'c26a811c141a11e79aeeb32ef95273f2';
                // const netZoneUuid = 'f5816cf43fcc41d880d9f636fa8bc443';
                const netZoneUuid = '5b994421aced4e2d9a76179e8cc70734';
                let self = this;
                $.ajax({
                    url: IP_PORT + "/openapi/service/vss/preview/getPreviewParamByCameraUuid?token=" + self.getSinglePreviewToken(time, cameraUuid),
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        appkey: APP_KEY,
                        time: time,
                        pageNo: 1,
                        pageSize: 10,
                        opUserUuid: opUserUuid,
                        cameraUuid: cameraUuid,
                        netZoneUuid: netZoneUuid
                    }),
                    success: function (xml) {
                        self.startPreview(xml.data);
                    }
                })
            },
            initSpvx(spv) {
                let ret = spv.MPV_Init(1);
                if (ret !== 0) {
                    alert("单路预览初始化失败");
                }
            },
            setLocalParam(spv) {
                let xml = '<?xml version="1.0" encoding="UTF-8"?> ' +
                    '<localParam> ' +
                    '<width>600</width> ' +
                    '<height>500</height> ' +
                    '<picType>1</picType> ' +
                    '<capturePath>C:\\Hikvision</capturePath> ' +
                    '<recordSize>2</recordSize> ' +
                    '<recordPath>C:\\Hikvision</recordPath> ' +
                    '<limitPreviewTime>1800</limitPreviewTime> ' +
                    '</localParam>';
                let ret = spv.MPV_SetLocalParam(xml);
                if (ret !== 0) {
                    alert("单路预览设置本地参数失败");
                }
            },
            startPreview(xml) {
                let spv = document.getElementById('spv');
                spv.MPV_SetPlayWndCount(1);
                spv.MPV_StartPreview(xml);
            },
            getSinglePreviewToken(time, uuid) {
                const APP_KEY = "a592d676";
                const SECRET = "69681c3587194a50a2b11f1335ad6f41";
                const opUserUuid = 'c26a811c141a11e79aeeb32ef95273f2';
                const netZoneUuid = 'f5816cf43fcc41d880d9f636fa8bc443';
                let uri = "/openapi/service/vss/preview/getPreviewParamByCameraUuid";
                let strParam = {
                    appkey: APP_KEY,
                    time: time,
                    pageNo: 1,
                    pageSize: 10,
                    opUserUuid: opUserUuid,
                    cameraUuid: uuid,
                    netZoneUuid: netZoneUuid
                };
                return this.genToken(uri, JSON.stringify(strParam), SECRET);
            },
            genToken(uri, strParam, mySecret) {
                let srcStr = uri + strParam + mySecret;
                return md5.hex_md5(srcStr).toUpperCase();
            }
        },
        mounted() {
            this.loadTreeData();
        }
    }
</script>

<style scoped>

</style>
