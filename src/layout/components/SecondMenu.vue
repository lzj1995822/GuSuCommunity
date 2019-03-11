<template>
	<div class="second-menu">
        <div class="second-menu-div" v-for="item in children" @click="$router.push({name: item.name})">
            {{item.name}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "SecondMenu",
        computed: {
            children() {
                return this.$store.state.menuList.filter(item => item.path === this.$route.path)[0].children;
            }
        },
        watch: {
            '$route.name' : function () {
                let matched = this.$route.matched;
                this.$store.commit("getClassInfo", matched[matched.length-1].meta.classInfo);
            }
        },
    }
</script>

<style scoped>
    .second-menu {
        width: 80%;
        margin: 5% auto;
    }
    .second-menu-div {
        cursor: pointer;
    }
</style>
