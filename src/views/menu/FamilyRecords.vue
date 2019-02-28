<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/familyRecords" :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>

    </section>
</template>

<script>
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

        },
        components: {
            CommonCRUD
        }
    };
</script>

<style scoped>

</style>
