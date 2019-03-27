<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/familyRecords" :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>

    </section>
</template>

<script>
    import LookUp from '@/lookup';
    import { tansfer } from "../../lookup/transfer";
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'FamilyRecords',
        data() {
            return {
                queryColumns:[
                    {
                        des: '党员家庭',
                        name: 'partyFamily',
                        type: 'checkbox',
                        visible:true
                    },
                    {
                        des: '退伍军人家庭',
                        name: 'veteranFamily',
                        type: 'checkbox',
                        visible:true
                    },
                    {
                        des: '困难家庭',
                        name: 'hardFamily',
                        type: 'checkbox',
                        visible :true
                    },
                    {
                        des: '残疾家庭',
                        name: 'disabledFamily',
                        type: 'checkbox',
                        visible:true
                    }
                    ]

            }
        },
        created(){
            this.formColumns = this.$store.state.classInfo.properties
            this.handleSelectOptions();
        },
        methods: {
            handleSelectOptions() {
                let  items = [
                    ['basicIncome', 'TrueFalse'],
                    ['masterSex', 'Sex'],
                    ['partyFamily', 'TrueFalse'],
                    ['veteranFamily', 'TrueFalse'],
                    ['disabledFamily', 'TrueFalse'],
                    ['hardFamily', 'TrueFalse']
                ].forEach(item => {
                        this.formColumns.filter(sub => sub.name === item[0])[0].options = LookUp[item[1]]
                    }
                )
                tansfer(this.formColumns);
            }
        },
        components: {
            CommonCRUD
        }
    };
</script>

<style scoped>

</style>
