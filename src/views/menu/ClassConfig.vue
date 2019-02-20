<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/sysClass"
                    :formColumns="$store.state.classInfo.properties">
            <template slot="header-btn" slot-scope="slotProps">
                <!--<p>{{slotProps.selected}}</p>-->
                <el-button type="info" plain @click="showPropertyConfig(slotProps.selected)">属性配置</el-button>
            </template>
        </CommonCRUD>
        <el-dialog
            :title="title"
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            width="70%"
            align="left"
            :modal-append-to-body='false'
            :before-close="handleClose">
            <div>
                <CommonCRUD :columns="propertyColumns" :queryFormColumns="queryColumns" apiRoot="/identity/sysClassProperty"
                            :formColumns="propertyColumns" :sortColumns="sortColumns">
                </CommonCRUD>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import CommonCRUD from '@/components/CommonCRUD';
export default {
    name: 'ClassConfig',
    data() {
        return {
            dialogVisible: false,
            propertyColumns: [
                {
                    name: "classId",
                    type: 'string',
                    des: '所属类ID',
                    width: '300',
                    disabled: true,
                    value: ''
                },
                {
                    name: "name",
                    type: 'string',
                    des: "属性名",
                },{
                    name: "type",
                    type: 'string',
                    des: "数据类型",
                },{
                    name: "length",
                    type: 'string',
                    des: "长度",
                },{
                    name: "des",
                    type: 'string',
                    des: "描述",
                },{
                    name: "sort",
                    type: 'string',
                    des: "排序",
                }
            ],
            sortColumns: [
                {
                    name: 'sort',
                    type: 'asc'
                }
            ],
            queryColumns: [
                {
                    name: 'classId',
                    type: 'string',
                    des: '类ID',
                    value: '',
                }
            ],
            title: ''
        }
    },
    methods: {
        showPropertyConfig(data) {
            if (data.length !== 1) {
                this.$message({
                        type: 'warning',
                        message: data.length > 1 ? '仅能选择一行记录' : '请选择一行记录'
                    });
                return;
            }
            let classId = data[0].id;
            this.queryColumns[0].value = classId;
            this.propertyColumns[0].value = classId;
            this.title = `${data[0].name}类-属性配置`;
            this.dialogVisible = true;
        },
        handleClose (done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
    },
    components: {
        CommonCRUD
    }
}
</script>
<style>

</style>
