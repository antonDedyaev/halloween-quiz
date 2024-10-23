<script setup lang="ts">
import HorrorButton from '@/components/HorrorButton.vue'
import { onMounted } from 'vue'
import { playSound } from '@/utils/playSound'

interface IEmit {
  (event: 'leave'): void
  (event: 'close'): void
}

defineEmits<IEmit>()

onMounted(() => {
  playSound('/audio/ghost.mp3')
})
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <h2 class="modal__title">
        <slot name="title" />
      </h2>
      <slot />
      <div class="modal__controls">
        <HorrorButton class="confirm-btn" @click="$emit('leave')"
          >Ухожу</HorrorButton
        >
        <HorrorButton class="cancel-btn" @click="$emit('close')"
          >Я передумал</HorrorButton
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__content {
    background-color: #222;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 0 30px rgba(255, 69, 0, 0.8);
    animation: fadeIn 0.5s ease-in;
  }

  &__title {
    font-family: 'Creepster', cursive;
    font-size: 2rem;
    color: var(--red);
    margin-bottom: 15px;
  }

  &__controls {
    display: flex;
    justify-content: center;
    gap: 30px;
  }
}

.close-button {
  font-family: 'Creepster', cursive;
  font-size: 1.5rem;
  color: var(--white);
  background-color: var(--red);
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.6);

  &:hover {
    background-color: var(--orange);
    box-shadow: 0 0 20px rgba(255, 140, 0, 1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
