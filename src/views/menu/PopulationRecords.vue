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
                let  items = [
                    ['politicalStatus', 'PoliticalStatus'],
                    ['education', 'Education'],
                    ['married', 'TrueFalse'],
                    ['sex', 'Sex']
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
