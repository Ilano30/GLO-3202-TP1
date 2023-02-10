<template>
  <router-view />
</template>

<script>
import { Dark, Cookies } from 'quasar';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  created() {
    Dark.set(Cookies.get('dark_mode') == 'true' ? true : false);
  },
})
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>
