<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/fisherMen"
                    :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import { tansfer } from '@/lookup/transfer';
    import LookUp from '@/lookup'
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: "FisherMen",
        data(){
            return {
                formColumns: [],
                queryColumns: [
                    {
                        des: '姓名',
                        name: 'name',
                        type: 'string',
                        value: '',
                        visible: true,
                    }
                ]
            }
        },
        methods: {
            handleSelectOptions() {
                let  items = [
                    ['sex', 'Sex'],
                    ['idType', 'IdType']
                ].forEach(item => {
                        this.formColumns.filter(sub => sub.name === item[0])[0].options = LookUp[item[1]]
                    }
                );

            }
        },
        components: {
            CommonCRUD
        },
        created() {
            this.formColumns = this.$store.state.classInfo.properties;
            this.handleSelectOptions();
            tansfer(this.formColumns);
        }
    }
</script>

<style scoped>

</style>
