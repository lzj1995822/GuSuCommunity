<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/sysMail"
                    :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import { tansfer } from '@/lookup/transfer';
    import LookUp from '@/lookup'
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: "Mail",
        data(){
            return {
                formColumns: [],
                queryColumns: [
                    {
                        des: '工号',
                        name: 'mailId',
                        type: 'string',
                        value: '',
                        visible: true,
                    },
                    {
                        des: '姓名',
                        name: 'mailName',
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
                    ['mailSex', 'Sex']
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
