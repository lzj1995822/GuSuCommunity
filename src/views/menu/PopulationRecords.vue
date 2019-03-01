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
                let item1 = this.formColumns.filter(item => item.name === 'education')[0];
                item1.options = LookUp.PoliticalStatus;
                 this.formColumns.forEach(item => {
                     console.log(item.transferType);
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
