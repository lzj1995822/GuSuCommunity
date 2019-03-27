<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/business"
                    :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: "Business",
        data(){
            return {
                formColumns: [],
                queryColumns: [
                    {
                        des: '企业名称',
                        name: 'name',
                        type: 'string',
                        value: '',
                        visible: true,
                    }
                ]
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
