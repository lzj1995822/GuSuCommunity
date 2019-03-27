<template>
    <section>
        <CommonCRUD :columns="formColumns" api-root="identity/partyMember" :formColumns="formColumns" :queryFormColumns="queryColumns">
        </CommonCRUD>
    </section>
</template>

<script>
    import LookUp from '@/lookup';
    import { tansfer } from "../../lookup/transfer";
    import CommonCRUD from '@/components/CommonCRUD';
    export default {
        name: 'PartyMember',
        data() {
            return {
                queryColumns:[
                    {
                        des: '姓名',
                        name: 'userName',
                        type: 'string',
                        visible :true
                    }
                ]
            }
        },
        created(){
            this.formColumns = this.$store.state.classInfo.properties
            this.handleSelectOptions();
        },
        methods: {
            handleSelectOptions() {
                let  items = [
                    ['userSex', 'Sex'],
                    ['education', 'Education'],
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
