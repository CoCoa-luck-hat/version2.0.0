<script setup>
import layout from "./component/layout.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <layout>
    <router-view v-slot="{ Component }">
      <transition name="Page" mode="out-in">
        <component :is="Component" :key="route.path"></component>
      </transition>
    </router-view>
  </layout>
</template>

<style scoped>
    .Page-enter-active,.Page-leave-active{
        transition: all 0.3s ease;
    }
    .Page-enter-from{
        transform: scale(0.5);
        opacity: 0;
    }
    .Page-enter-to{
        transform: scale(1);
        opacity: 1;
    }
    .Page-leave-from{
        transform: scale(1);
        opacity: 1;
    }
    .Page-leave-to{
        transform: scale(0.5);
        opacity: 0;
    }
</style>    
