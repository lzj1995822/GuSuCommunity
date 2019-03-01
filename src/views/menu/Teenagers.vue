<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/teenagers"
                    :formColumns="formColumns" :queryFormColumns="queryColumns">

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
                formColumns: [],
                queryColumns: [
                    {
                        des: '姓名',
                        name: 'name',
                        type: 'string',
                        value: '',
                        visible: true,
                    },
                    {
                        des: '政治面貌',
                        name: 'politicalStatus',
                        type: 'select',
                        value: '',
                        options: LookUp['PoliticalStatus'],
                        visible: true,
                    },
                ],
            }
        },
        methods: {
            handleSelectOptions() {
                let  items = [
                    ['sex', 'Sex'],
                    ['politicalStatus', 'PoliticalStatus'],
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
