<template>
<svg width="100%" height="100%">
    <Slider x="5" y="5" width="200"/>
</svg>
</template>

<script>
import Slider from './components/Forms/Slider.vue';

export default {
    name: 'App',
    components: {
        Slider
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
