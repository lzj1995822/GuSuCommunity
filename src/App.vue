<template>
    <div id="app">
        <layout></layout>
    </div>
</template>

<script>
import Layout from '@/layout/Layout'
export default {
    name: 'App',
    data () {
        return {
        };
    },
    components: {
        Layout
    },
    methods: {
    }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
