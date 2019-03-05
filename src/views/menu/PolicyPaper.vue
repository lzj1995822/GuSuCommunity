<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/policyPaper"
                    :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: "PolicyPaper",
        data(){
            return {
                formColumns: [],
                queryColumns: [
                    {
                        name: 'organizationId',
                        type: 'string',
                        value: '',
                        visible: false
                    },
                    {
                        des: '标题',
                        name: 'title',
                        type: 'string',
                        value: '',
                        visible: true
                    }
                ],
            }
        },
        methods: {
            
        },
        components: {
            CommonCRUD
        },
        created() {
            this.formColumns = this.$store.state.classInfo.properties;
            this.formColumns.filter(item => item.des == '所属部门')[0].value=JSON.parse(sessionStorage.getItem('userInfo')).organizationId;
            this.queryColumns[0].value = JSON.parse(sessionStorage.getItem('userInfo')).organizationId;
        }
    }
</script>

<style scoped>

</style>
