<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

interface Props {
  name: string
  size?: string
  color?: string
}
const props = defineProps<Props>()

const icon = defineAsyncComponent(
  () => import(`../assets/icons/${props.name}.svg`),
)
</script>

<template>
  <component
    v-if="icon"
    :is="icon"
    :style="{
      width: `${size}px` || '24px',
      height: `${size}px` || '24px',
      fill: color || 'currentColor',
    }"
    class="icon"
  />
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
