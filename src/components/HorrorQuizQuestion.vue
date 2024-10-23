<script setup lang="ts">
import HorrorIcon from '@/components/HorrorIcon.vue'
import { computed, ref, watch } from 'vue'
import { shuffle } from '@/utils/shuffle'
import { playSound } from '@/utils/playSound'

interface IQuestion {
  question: string
  answers: string[]
  correctAnswer: string
}
interface IQuizQuestionProp {
  question: IQuestion
  isNextQuestion: boolean
}

interface IEmit {
  (e: 'selectAnswer', answer: string): void
  (e: 'sumUpTakenTime', time: number): void
}

const props = defineProps<IQuizQuestionProp>()
const emit = defineEmits<IEmit>()

const startTime = ref(0)
const finishTime = ref(0)
const selectedAnswer = ref('')
let currentSoundSource: AudioBufferSourceNode | null = null
const shuffledAnswers = computed(() => {
  return shuffle(props.question.answers)
})

function handleSelectAnswer(answer: string) {
  finishTime.value = Date.now()
  playSound('/audio/drop.mp3', 0.3).then(source => {
    currentSoundSource = source
  })
  selectedAnswer.value = answer
  emit('selectAnswer', selectedAnswer.value)
  const timeTaken = (finishTime.value - startTime.value) / 1000
  emit('sumUpTakenTime', timeTaken)
  stopSound()
}

function stopSound() {
  if (currentSoundSource) {
    currentSoundSource.stop()
    currentSoundSource = null
  }
}

watch(
  () => props.isNextQuestion,
  val => {
    if (val) {
      selectedAnswer.value = ''
    }
  },
)

watch(
  () => props.question.question,
  () => {
    startTime.value = Date.now()
  },
  { immediate: true },
)
</script>

<template>
  <div class="quiz-question">
    <p class="quiz-question__text">{{ question.question }}</p>
    <ul class="quiz-question__answers">
      <li
        class="quiz-question__answer"
        :class="[
          { selected: selectedAnswer === answer },
          answer === question.correctAnswer ? 'success' : 'fail',
          { disabled: selectedAnswer },
        ]"
        v-for="answer in shuffledAnswers"
        :key="answer"
        @click="!selectedAnswer && handleSelectAnswer(answer)"
      >
        <span>{{ answer }}</span>
        <HorrorIcon
          v-if="selectedAnswer === answer"
          class="quiz-question__mark"
          size="24"
          :name="answer === question.correctAnswer ? 'pumpkin' : 'skull-small'"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.quiz-question {
  font-family: 'Ustroke', sans-serif;
  font-size: 22px;
  user-select: none;

  &__text {
    font-size: 24px;
    margin-bottom: 15px;
    text-shadow:
      0 0 1px var(--white),
      0 0 5px var(--red);
  }

  &__answers {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  &__answer {
    position: relative;
    padding: 10px;
    margin: 10px 0;
    background-color: var(--charcoal);
    border: 1px solid var(--dim-gray);
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;

    &:hover {
      background-color: var(--dim-gray);
      color: var(--red);
      box-shadow: 0 0 10px var(--red);
    }

    &.selected.success {
      color: green;
      font-weight: bold;
      border: 2px solid var(--green);
      box-shadow: 0 0 10px var(--green);
    }

    &.selected.fail {
      color: red;
      font-weight: bold;
      border: 2px solid var(--red);
      box-shadow: 0 0 10px var(--red);
    }

    &.disabled {
      pointer-events: none;
    }

    span {
      flex: 10;
      align-self: center;
    }

    svg {
      flex: 1;
      margin-left: auto;
    }
  }

  &__mark {
    position: absolute;
    top: 15px;
    right: 20px;
  }
}
</style>
