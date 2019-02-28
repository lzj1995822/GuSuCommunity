<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/populationRecords" :formColumns="formColumns"></CommonCRUD>
    </section>
</template>

<script>
    import LookUp from '@/lookup';
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'PopulationRecords',
        data() {
            return {

            }
        },
        created(){
            this.formColumns = this.$store.state.classInfo.properties
            this.handleSelectOptions();
        },
        methods: {
            handleSelectOptions() {
                let item = this.formColumns.filter(item => item.name === 'politicalStatus')[0];
                item.options = LookUp.PoliticalStatus;
            }
        },
        components: {
            CommonCRUD
        }
    };
</script>

<style scoped>

</style>
