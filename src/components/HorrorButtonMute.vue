<script setup lang="ts">
import HorrorIcon from '@/components/HorrorIcon.vue'
import { ref } from 'vue'

interface IEmit {
  (e: 'toggleMute'): void
}

const emit = defineEmits<IEmit>()

const isMuted = ref(false)

function toggleMute() {
  isMuted.value = !isMuted.value
  emit('toggleMute')
}
</script>

<template>
  <button class="mute-button" @click="toggleMute">
    <HorrorIcon v-show="isMuted" name="mute" color="#ff8c00" size="26" />
    <HorrorIcon v-show="!isMuted" name="unmute" color="#ff8c00" size="26" />
  </button>
</template>

<style scoped lang="scss">
body {
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.mute-button {
  background-color: var(--charcoal);
  border: 2px solid var(--dim-gray);
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
  position: relative;
  transition:
    transform 0.2s ease,
    box-shadow 0.3s ease;
}

.mute-button:hover {
  box-shadow: 0 0 30px rgba(255, 0, 0, 1);
  transform: scale(1.1);
}

.mute-button:active {
  box-shadow: 0 0 20px rgba(0, 255, 0, 1);
}

.mute-icon {
  color: white;
  font-size: 30px;
  text-shadow: 0 0 10px red;
  transition: text-shadow 0.3s ease;
}

.mute-button:hover .mute-icon {
  text-shadow:
    0 0 20px red,
    0 0 30px red;
}

.mute-button:active .mute-icon {
  text-shadow:
    0 0 15px green,
    0 0 25px green;
}
</style>
