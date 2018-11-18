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
            :render-content="renderContent"
            >
        </el-tree>
    </section>
</template>

<script>
    export default {
        name: "RouteConfig",
        data() {
            return {
                menu: []
            }
        },
        created() {
            this.menu = this.$store.state.menuList;
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
</style>
