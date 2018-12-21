<template>
    <div class="common-crud">
        <el-table :data="tableData" v-loading="loading" size="small">
            <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
                             :width="item.width || ''"></el-table-column>
        </el-table>
        <el-pagination :total="pageable.total" :current-page.sync="pageable.currentPage" :page-size.sync="pageable.pageSize"
                       @current-change="loadTableData" @size-change="loadTableData" layout="total, sizes, prev, pager, next">
        </el-pagination>
        <el-dia
    </div>
</template>

<script>
    import reqType from '@/api/reqType';
    export default {
        name: "CommonCRUD",
        props: {
            // 表格字段显示配置
            columns: Array,
            // 请求根路径，对应后台Controller @RequestMapping注解的值
            apiRoot: String,
        },
        data() {
            return {
                // 表格数据
                tableData: [],
                // 加载样式
                loading: false,
                pageable: {
                    total: 0,
                    currentPage: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            // 获取表格数据
            loadTableData() {
                this.loading = true;
                this.$http(reqType.POST, `${this.apiRoot}/pg`, this.pageable).then(
                    data => {
                        this.tableData = data.content;
                        this.pageable.total = data.totalElements;
                        this.loading = false;
                    }
                )
            }
        },
        created() {
            this.loadTableData();
        }
    }
</script>

<style scoped>

</style>
