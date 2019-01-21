<template>
    <section>
        <CommonCRUD :columns="$store.state.classInfo.properties" apiRoot="/identity/sysClass" :formColumns="$store.state.classInfo.properties"></CommonCRUD>
    </section>
</template>
<script>
    import CommonCRUD from '@/components/CommonCRUD';
export default {
    name: 'ClassConfig',
    data() {
        return {

        }
    },
    components: {
        CommonCRUD
    }
}
</script>
<style>

</style>
