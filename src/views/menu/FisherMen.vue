<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/fisherMen"
                    :formColumns="formColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import LookUp from '@/lookup';
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: "FisherMen",
        data(){
            return {
                formColumns: []
            }
        },
        methods: {
            handleSelectOptions() {
                let item = this.formColumns.filter(item => item.name === 'idType')[0];
                item.options = LookUp.IdType;
            }
        },

        components: {
            CommonCRUD
        },
        created() {
            this.formColumns = this.$store.state.classInfo.properties;
            this.handleSelectOptions();
        }
    }
</script>

<style scoped>

</style>
