<script setup lang="ts">
import { playSound } from '@/utils/playSound'

interface IHorrorButtonProps {
  size?: string
  disabled?: boolean
}
defineProps<IHorrorButtonProps>()

let currentSoundSource: AudioBufferSourceNode | null = null
function playButtonPressSound() {
  playSound('/audio/bone-crack.mp3', 0.1).then(source => {
    currentSoundSource = source
  })
  stopSound()
}

function stopSound() {
  if (currentSoundSource) {
    currentSoundSource.stop()
    currentSoundSource = null
  }
}
</script>

<template>
  <div class="button-container">
    <button
      class="button"
      :class="[{ disabled: disabled }, size]"
      @click="playButtonPressSound"
    >
      <slot />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: center;
}

.button {
  font-family: 'Creepster', cursive;
  font-size: 1.5rem;
  color: var(--white);
  background-color: var(--jet-black);
  border: 2px solid var(--red);
  border-radius: 10px;
  padding: 15px 30px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.6);
  transition: all 0.1s ease;
  z-index: 5;

  &.s {
    padding: 4px 8px;
  }

  &.m {
    padding: 8px 10px;
    width: 200px;
  }

  &.xl {
    width: 380px;
  }

  &:hover {
    background-color: var(--dark);
    color: var(--red);
    box-shadow:
      0 0 30px rgba(255, 140, 0, 1),
      0 0 15px var(--red);
    transform: translateY(-5px);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 0 10px rgba(255, 69, 0, 0.3);
  }

  &.disabled {
    pointer-events: none;
    background-color: var(--charcoal);
    color: var(--dim-gray);
    border-color: var(--dim-gray);
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
