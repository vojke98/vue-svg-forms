<template>
<svg width="100%" height="100%" viewBox="0 0 1000 500">
    <Slider x="5" y="5" width="200" />

    <!-- <Button x="5" y="50" width="100" height="50" /> -->
</svg>
</template>

<script>
import Slider from './components/Forms/Slider.vue';
// import Button from './components/Forms/Button.vue';

export default {
    name: 'App',
    components: {
        Slider,
        // Button
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
