<template>
    <div class="common-crud">
        <div class="common-query">
            <el-form :inline="true" :model="queryForm" ref="form" class="demo-form-inline" label-width="75px">
                <el-form-item v-for="item in queryFormColumns" :key="item.des" :label="item.des">
                    <el-input v-model="queryForm[item.name]" v-if="item.type === 'string'"></el-input>
                    <el-select v-model="queryForm[item.name]" v-else-if="item.type === 'select'">
                        <el-option v-for="opItem in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
                    </el-select>
                    <el-radio-group v-if="item.type === 'radio'" v-model="queryForm[item.name]" style="width: 178px" >
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                    <el-date-picker v-if="item.type === 'date'"
                                    v-model="queryForm[item.name]"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 178px">
                    </el-date-picker>
                </el-form-item>
                <el-button v-if="queryFormColumns.length > 0" @click="query" type="primary" size="mini" icon="el-icon-search">搜索</el-button>
            </el-form>
        </div>
        <div class="handler-btn">
            <el-button type="primary" plain @click="add">新增</el-button>
            <el-button type="success" plain @click="edit">编辑</el-button>
            <el-button type="danger" plain @click="deleteRow">删除</el-button>
            <slot name="header-btn" :selected="selected"></slot>
        </div>
        <p class="clear-float">&nbsp;</p>
        <el-table :data="tableData" v-loading="loading" border
                  ref="table"
                  @row-click="rowClick"
                  :header-cell-style="{'background-color': '#fafafa','color': 'rgb(80, 80, 80)','border-bottom': '1px rgba(64, 158, 255, .7) solid'}"
                  @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55"
                align="center">
            </el-table-column>
            <el-table-column v-for="item in columns" :key="item.name" :prop="item.name" :label="item.des"
                             :width="item.width || ''" :formatter="item.formatter" align="center"></el-table-column>
        </el-table>
        <el-pagination style="text-align: right;margin-top: 20px;"
                       :total="pageable.total" :current-page.sync="pageable.currentPage" :page-size.sync="pageable.pageSize"
                       @current-change="currentChange" @size-change="sizeChange" layout="total, sizes, prev, pager, next">
        </el-pagination>
        <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="50%"
        align="left"
        :modal-append-to-body='false'
        :before-close="handleClose">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="100px">
            <el-form-item v-for="item in formColumns" :key="item.des" :label="item.des">
                <el-input v-model="form[item.name]" v-if="item.type === 'string'" :disabled="item.disabled"></el-input>
                <el-select v-model="form[item.name]" v-else-if="item.type === 'select'" filterable :disabled="item.disabled">
                    <el-option v-for="opItem in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
                </el-select>
                <el-radio-group v-if="item.type === 'radio'" v-model="form[item.name]" :disabled="item.disabled" style="width: 178px" >
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <el-date-picker v-if="item.type === 'date'"
                                v-model="form[item.name]"
                                type="date"
                                :disabled="item.disabled"
                                placeholder="选择日期"
                                style="width: 178px">
                </el-date-picker>
                <!--预留富文本编辑-->
                <el-upload
                    v-else-if="item.type === 'img'"
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
    import reqType from '@/api/reqType';
    export default {
        name: 'CommonCRUD',
        props: {
            // 表格字段显示配置
            columns: Array,
            // 请求根路径，对应后台Controller @RequestMapping注解的值
            apiRoot: String,
            // 表单字段
            formColumns: Array,
            // 查询字段集
            queryFormColumns: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            sortColumns: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data () {
            return {
                // 表格数据
                tableData: [],
                // 加载样式
                loading: false,
                pageable: {
                    total: 0,
                    currentPage: 1,
                    pageSize: 10
                },
                dialogVisible: false,
                form: {},
                imgUrl: '',
                selected: [],
                queryForm: {}
            };
        },
        computed: {
            path() {
                return `${this.apiRoot}/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`;
            }
        },
        methods: {
            rowClick(row) {
                this.$refs.table.toggleRowSelection(row)
            },
            validateRows() {
                if (this.selected.length !== 1) {
                    this.$message({
                        type: 'warning',
                        message: this.selected.length > 1 ? '仅能选择一行记录' : '请选择一行记录'
                    });
                    return false;
                }
            },
            currentChange(value) {
                let path = `${this.apiRoot}/page?page=${value - 1}&size=${this.pageable.pageSize}`;
                this.loadTableData(path)
            },
            sizeChange(value) {
                let path = `${this.apiRoot}/page?page=0&size=${value}`;
                this.loadTableData(path)
            },
            // 获取表格数据
            loadTableData (path) {
                this.loading = true;
                this.$http(reqType.POST, path, this.queryForm, false).then(
                    data => {
                        this.tableData = data.content;
                        this.pageable.total = data.totalElements;
                        this.loading = false;
                    }
                ).catch(res => {
                    this.loading = false;
                });
            },
            add() {
                this.dialogVisible = true;
                this.form = {};
                this.formColumns.forEach((item) => {
                    if (item.value) {
                        this.form[item.name] = item.value;
                    }
                });
            },
            edit() {
                if (this.validateRows()) {
                    return;
                }
                this.form = Object.assign({}, this.selected[0]);
                this.dialogVisible = true;
            },
            deleteRow() {
                if (this.validateRows()) {
                    return;
                }
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.$http(reqType.DELETE, `${this.apiRoot}/${this.selected[0].id}id`).then(_ => {
                            this.loadTableData(this.path);
                        });
                    })
                    .catch(_ => {});
            },
            submit () {
                let type = this.form.id ? reqType.PUT : reqType.POST;
                let path = `${this.apiRoot}/${this.form.id ? this.form.id + 'id' : ''}`;
                this.$http(type, path, Object.assign({}, this.form)).then(() => {
                    this.dialogVisible = false;
                    let path = `${this.apiRoot}/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`;
                    this.loadTableData(path);
                    this.from = {};
                });
            },
            handleClose (done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.from = {};
                        done();
                    })
                    .catch(_ => {});
            },
            handleAvatarSuccess (res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleSelectionChange(val) {
                this.selected = val;
            },
            defaultRequestConfig(path) {
                this.queryFormColumns.forEach((item) => {
                    if (item.value) {
                        this.queryForm[item.name] = item.value;
                    }
                });
                this.sortColumns.forEach((item) => {
                    path += `&sort=${item.name},${item.type}`;
                });
            },
            query() {
                this.pageable.currentPage = 1;
                this.pageable.pageSize = 10;
                let path = `${this.apiRoot}/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`;
                this.loadTableData(path);
            }
        },
        created () {
            let path = `${this.apiRoot}/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`;
            this.defaultRequestConfig(path);
            this.loadTableData(path);
        }
    };
</script>

<style scoped>
    .common-crud {
        width: 95%;
        margin: 1% 2.5%;
    }
    .btn-right {
        float: right;
    }
    .clear-float {
        clear: both;
        height: 10px;
    }
    .handler-btn {
        float: left;
    }
    .common-query {
        float: right;
    }
</style>
<style>
    .common-query .el-form--inline .el-form-item {
        margin: 0;
    }
    .common-query i {
        font-size: 12px;
    }
</style>
