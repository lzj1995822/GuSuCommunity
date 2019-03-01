<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/unionMember" :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import LookUp from '@/lookup';
    import { tansfer } from "../../lookup/transfer";
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'UnionMember',
        created(){
            this.formColumns = this.$store.state.classInfo.properties
            this.handleSelectOptions();
        },
        data() {
            return {
                queryColumns:[
                    {
                        des: '姓名',
                        name: 'name',
                        type: 'string',
                        visible :true
                    }
                ]
            }
        },
        methods: {
            handleSelectOptions() {
                let  items = [
                    ['sex', 'Sex'],
                    ['education', 'Education'],
                    ['married', 'TrueFalse'],
                ].forEach(item => {
                        this.formColumns.filter(sub => sub.name === item[0])[0].options = LookUp[item[1]]
                    }
                )
                tansfer(this.formColumns);
            }
        },
        components: {
            CommonCRUD
        }
    };
</script>

<style scoped>

</style>
