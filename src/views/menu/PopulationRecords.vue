<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/populationRecords" :formColumns="formColumns"></CommonCRUD>
    </section>
</template>

<script>
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'PopulationRecords',
        data() {
            return {

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
