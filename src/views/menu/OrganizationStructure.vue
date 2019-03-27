<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/organizationStructure" :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import LookUp from '@/lookup';
    import { tansfer } from "../../lookup/transfer";
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'OrganizationStructure',
        created(){
            this.formColumns = this.$store.state.classInfo.properties
            this.handleSelectOptions();
            this.departmentOptios(JSON.parse(sessionStorage.getItem('userInfo')).organizationId);
            this.queryColumns[0].value = JSON.parse(sessionStorage.getItem('userInfo')).organizationId;
        },
        data() {
            return {
                queryColumns:[
                    {
                        name: 'departmentId',
                        type: 'string',
                        value: '',
                        visible: false
                    },
                    {
                        des: '姓名',
                        name: 'name',
                        type: 'string',
                        visible :true
                    }
                ]
            }
        },

        methods: {
            handleSelectOptions() {
                let  items = [
                    ['sex', 'Sex']
                ].forEach(item => {
                        this.formColumns.filter(sub => sub.name === item[0])[0].options = LookUp[item[1]]
                    }
                )
                tansfer(this.formColumns);
            },
            departmentOptios(org){
                    this.formColumns.filter(item => item.name === 'departmentId')[0].value = org;
                }

        },
        components: {
            CommonCRUD
        }
    };
</script>

<style scoped>

</style>
