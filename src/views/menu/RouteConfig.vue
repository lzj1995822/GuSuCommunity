<template>
    <section id="route_config">
        <el-tree
            class="filter-tree"
            :data="menu"
            :props="{children: 'children',label: labelHandler}"
            :highlight-current="true"
            default-expand-all
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :render-content="renderContent">
        </el-tree>

        <el-dialog title="路由配置" :visible.sync="handlerVis" width="30%" align="left">
            <el-form :model="handlerForm" class="dialog-form">
                <el-form-item v-for="item in classInfo.properties" :label="item.des" :prop="item.name" :inline="true" label-width="100px">
                    <el-input v-model="handlerForm[item.name]" type="text" size="small"></el-input>
                </el-form-item>
                <el-form-item :inline="true" style="text-align: right">
                    <el-button size="mini" type="primary" @click="submit">提交</el-button>
                    <el-button size="mini" type="danger"  @click="">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </section>
</template>

<script>
    export default {
        name: "RouteConfig",
        data() {
            return {
                menu: [],
                handlerVis: false, // 操作框显示控制标志
                handlerForm: {}, //操作表单
                classInfo: {}, //对应实体类信息
            }
        },
        created() {
            this.menu = this.$store.state.menuList;
            this.classInfo = this.$store.state.classInfo;
        },
        methods: {
            /**
             * 过滤节点
             * @param value
             * @param data
             * @returns {boolean}
             */
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            /**
             * 处理渲染的树label值
             * @param data
             * @returns {*}
             */
            labelHandler(data) {
               return data.meta.title;
            },
            /**
             * 树节点的内容区的渲染 Function
             * @param h
             * @param node
             * @param data
             * @param store
             * @returns {*}
             */
            renderContent(h, {node, data, store}) {
                return (
                    <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                            <el-button size="mini" type="text" on-click={() => this.append(data)}>
                                <icon name="plus" scale="2.5"/>
                            </el-button>
                            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>
                                <icon name="minus" scale="2.5"/>
                            </el-button>
                        </span>
                    </span>
                );
            },
            /**
             * 添加
             * @param data
             */
            append(data) {
                this.handlerVis = true;
                this.handlerForm.parentId = data.id;
                console.log(data, "chenzz")
            },
            submit() {
                this.$http("POST", `/identity/sysRoutes/`, Object.assign({},this.handlerForm)).then(data => {
                    console.log(data)
                })
            }
        }
    }
</script>

<style>
.filter-tree {
    font-size: 14px;
}
#route_config {
    padding: 20px 0 0 20px;
    width: 40%;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.dialog-form {
    padding-right: 50px;
}

.btn-right {
    float: right;
}
</style>
