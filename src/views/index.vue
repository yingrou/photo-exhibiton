<template>
  <div>
    <home-header></home-header>
    <home-footer></home-footer>
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
