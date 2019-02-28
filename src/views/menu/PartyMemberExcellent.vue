<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/partyMemberExcellent" :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'PartyMemberExcellent',
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
