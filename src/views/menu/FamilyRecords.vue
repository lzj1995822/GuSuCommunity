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
