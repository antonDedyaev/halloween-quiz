<script lang="ts" setup></script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition v-if="route.meta.isWithTransition" name="creepy-fade">
      <div class="page" :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
    <div class="page" :key="route.name" v-else>
      <component :is="Component" />
    </div>
  </router-view>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
.creepy-fade-enter-active,
.creepy-fade-leave-active {
  transition:
    opacity 1s,
    filter 0.3s;
}

.creepy-fade-enter {
  opacity: 0;
  filter: grayscale(100%);
}

.creepy-fade-enter-to {
  opacity: 1;
  filter: grayscale(0%);
}

.creepy-fade-leave-to {
  opacity: 0;
  filter: grayscale(100%);
}
</style>
