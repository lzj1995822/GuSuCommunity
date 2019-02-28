<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/policyPaper"
                    :formColumns="formColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: "PolicyPaper",
        data(){
            return {
                formColumns: []
            }
        },

        components: {
            CommonCRUD
        },
        created() {
            this.formColumns = this.$store.state.classInfo.properties;
        }
    }
</script>

<style scoped>

</style>
