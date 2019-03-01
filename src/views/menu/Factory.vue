<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/factory"
                    :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: "Factory",
        data(){
            return {
                formColumns: [],
                queryColumns: [
                    {
                        des: '厂房名称',
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
