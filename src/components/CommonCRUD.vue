<template>
    <div class="common-crud">
        <el-button class="btn-right" @click="dialogVisible = true;form = {}">新增</el-button>
        <p class="clear-float">&nbsp;</p>
        <el-table :data="tableData" v-loading="loading" border>
            <el-table-column v-for="item in columns" :key="item.name" :prop="item.name" :label="item.des"
                             :width="item.width || ''" :formatter="item.formatter" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <slot></slot>
                    <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
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
            :before-close="handleClose">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="100px">
                <el-form-item v-for="item in formColumns" :key="item.des" :label="item.des">
                    <el-input v-model="form[item.name]" v-if="item.type === 'string'"></el-input>
                    <el-select v-model="form[item.name]" v-else-if="item.type === 'select'">
                        <el-option v-for="opItem in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
                    </el-select>
                    <el-radio-group v-if="item.type === 'radio'" v-model="form[item.name]" style="width: 178px" >
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                    <el-date-picker v-if="item.type === 'date'"
                        v-model="form[item.name]"
                        type="date"
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
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
            formColumns: Array
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
                imgUrl: ''
            };
        },
        methods: {
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
                this.$http(reqType.POST, path, false).then(
                    data => {
                        this.tableData = data.content;
                        this.pageable.total = data.totalElements;
                        this.loading = false;
                    }
                ).catch(res => {
                    this.loading = false;
                });
            },
            edit (row) {
                this.form = Object.assign({}, row);
                this.dialogVisible = true;
            },
            deleteRow (id) {
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.$http(reqType.DELETE, `${this.apiRoot}/${id}id`).then(_ => {
                            this.loadTableData();
                        });
                    })
                    .catch(_ => {});
            },
            submit () {
                let type = this.form.id ? reqType.PUT : reqType.POST;
                let path = `${this.apiRoot}/${this.form.id || ''}id`;
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
            }
        },
        created () {
            let path = `${this.apiRoot}/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`;
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
    }
</style>
