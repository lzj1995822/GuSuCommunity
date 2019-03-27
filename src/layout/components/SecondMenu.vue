<template>
	<div class="second-menu">
        <div class="second-menu-div"  v-if="item.meta.icon" v-for="item in children" @click="$router.push({name: item.name})">
            <img :src="item.meta.icon" alt="">
        </div>
        <div class="second-menu-div"  v-if="!item.meta.icon" v-for="item in children" @click="$router.push({name: item.name})">
            <img :src="item.meta.icon" alt="">
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
        margin: 2% auto;
    }
    .second-menu-div {
        cursor: pointer;
        margin: 20px 30px;
        display: inline-block;
    }
    .second-menu-div img {
        width: calc(100vw/1920*283*.9);
        height: calc(100vw/1920*221*.9);
    }

</style>
