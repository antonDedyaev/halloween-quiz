<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import { playSound } from '@/utils/playSound'

interface IHorrorTimerProps {
  isAnswerSelected: boolean
  isLastQuestion: boolean
}

interface IEmit {
  (e: 'resetTimer'): void
}

const props = defineProps<IHorrorTimerProps>()
const emit = defineEmits<IEmit>()

const totalSeconds = 20
const timeLeft = ref(totalSeconds)
const timerInterval = ref<NodeJS.Timeout | null>(null)
const isTimeUp = ref(false)

function startTimer() {
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval.value!)
      isTimeUp.value = true
    }
  }, 1000)
}

function resetTimer() {
  if (timerInterval.value) {
    clearInterval(timerInterval?.value)
  }
  setTimeout(() => {
    timeLeft.value = totalSeconds
    emit('resetTimer')
    startTimer()
  }, 2000)
}

watch(timeLeft, newValue => {
  if (newValue === 0) {
    playSound('/audio/dracula.mp3')
    if (props.isLastQuestion) {
      emit('resetTimer')
    } else {
      resetTimer()
    }
  }
})

watch(
  () => props.isAnswerSelected,
  val => {
    if (val && !props.isLastQuestion) {
      resetTimer()
    }
    if (timerInterval.value && val && props.isLastQuestion) {
      clearInterval(timerInterval.value)
    }
  },
)

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (timeLeft.value % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
})
</script>

<template>
  <div class="horror-timer" v-if="!isTimeUp">
    <h2 class="horror-timer__count">
      {{ formattedTime }}
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.horror-timer {
  display: flex;
  justify-content: center;
  align-items: center;

  &__count {
    font-size: 2rem;
    color: var(--red);
    text-shadow:
      0 0 10px #000,
      0 0 20px var(--red),
      0 0 30px var(--red);
    animation: flicker 1.5s infinite alternate;
  }

  &__time-up {
    color: red;
    text-align: center;
    font-size: 2rem;
  }
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
