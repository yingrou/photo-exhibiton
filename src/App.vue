<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import homeHeader from "@/components/homeHeader";
import homeFooter from "@/components/homeFooter";

export default {
  name: 'App',
  components: {
      homeHeader,
      homeFooter,
  }
}
</script>

<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
