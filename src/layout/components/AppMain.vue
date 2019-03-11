<template>
    <section class="app-main" style="min-height: 100%;">
        <transition name="fade">
            <keep-alive :include="cachedViews">
                <router-view v-if="this.$route.path.split('/').length > 2"></router-view>
                <second-menu v-else></second-menu>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
import SecondMenu from './SecondMenu';
export default {
    name: 'AppMain',
    computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews
        },
        key() {
            return this.$route.fullPath
        }
    },
    components: {
        SecondMenu
    }
}
</script>
<style>
    .app-main {
        padding-bottom: 30px;
    }
</style>
