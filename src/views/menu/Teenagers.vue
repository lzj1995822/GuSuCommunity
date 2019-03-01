<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/teenagers"
                    :formColumns="formColumns">

        </CommonCRUD>
    </section>
</template>

<script>
    import { tansfer } from "../../lookup/transfer";
    import LookUp from '@/lookup';
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: "Teenagers",
        data(){
            return {
                formColumns: []
            }
        },
        methods: {
            handleSelectOptions() {
                let item = this.formColumns.filter(item => item.name === 'politicalStatus')[0];
                item.options = LookUp['PoliticalStatus'];
            }
        },
        components: {
            CommonCRUD
        },
        created() {
            this.formColumns = this.$store.state.classInfo.properties;
            this.handleSelectOptions();
            tansfer(this.formColumns)
        }
    }
</script>

<style scoped>

</style>
