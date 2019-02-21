<template>
    <section>
        <CommonCRUD :queryFormColumns="queryColumns" :addBtnVis="false" :editBtnVis="false" :delBtnVis="false":columns="$store.state.classInfo.properties" apiRoot="/identity/sysLoginLog"
                    :formColumns="formColumns">
        </CommonCRUD>
        <!--<CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/sysClass" :formColumns="$store.state.classInfo.properties"></CommonCRUD>-->
    </section>
</template>

<script>
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'SysLoginLog',
        data() {
            return {
                formColumns: [],
                queryColumns:[
                    {
                        des: '开始时间',
                        name: 'loginTime',
                        type: 'date'
                    },
                    {
                        des: '结束时间',
                        name: 'loginTime',
                        type: 'date'
                    },
                    {
                        des: '姓名',
                        name: 'userName',
                        type: 'string'
                    }

                ]
            }
        },
        methods: {

        },
        components: {
            CommonCRUD
        },
        created() {
            this.formColumns = this.$store.state.classInfo.properties;


        }
    }
</script>

<style scoped>

</style>
