<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/familyRecords" :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>

    </section>
</template>

<script>
    import LookUp from '@/lookup';
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'FamilyRecords',
        data() {
            return {
                queryColumns:[
                    {
                        des: '党员家庭',
                        name: 'partyFamily',
                        type: 'checkbox'
                    },
                    {
                        des: '退伍军人家庭',
                        name: 'veteranFamily',
                        type: 'checkbox'
                    },
                    {
                        des: '困难家庭',
                        name: 'hardFamily',
                        type: 'checkbox'
                    },
                    {
                        des: '残疾家庭',
                        name: 'disabledFamily',
                        type: 'checkbox'
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
                this.formColumns.forEach(item => {
                    if(item.transferType === 'lookup') {
                        item.formatter = (row, cell,val,index) => {
                            return LookUp[item.lookupKey].filter(subitem => subitem.value === val)[0].label;
                        }
                    }
                });
            }
        },
        components: {
            CommonCRUD
        }
    };
</script>

<style scoped>

</style>
