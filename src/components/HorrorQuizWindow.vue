<script setup lang="ts">
import HorrorQuizQuestion from '@/components/HorrorQuizQuestion.vue'
import { horrorQuiz as questions } from '@/store/quizDB'
import { computed, ref } from 'vue'
import HorrorTimer from '@/components/HorrorTimer.vue'
import HorrorButtonMute from '@/components/HorrorButtonMute.vue'
import { useRouter } from 'vue-router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUsers } from '@/composables/useUsers'
import { playSound } from '@/utils/playSound'

interface IEmit {
  (e: 'muteSound'): void
}

defineEmits<IEmit>()

const { currentUser } = useUsers()
const router = useRouter()
const questionCounter = ref(0)
const correctAnswersCounter = ref(0)
const totalUserTime = ref(0)
const isAnswerSelected = ref(false)
const isLastQuestion = computed(
  () => questionCounter.value === questions.length - 1,
)

async function finishQuiz() {
  await saveUserScore()
  await playSound('/audio/ghost-breath.mp3')
  await router.push({ name: 'verdict' })
}
async function goToNextQuestion() {
  if (isLastQuestion.value) {
    await finishQuiz()
  }
  questionCounter.value++
  isAnswerSelected.value = false
}

async function handleSelectAnswer(answer: string) {
  if (answer === questions[questionCounter.value].correctAnswer) {
    correctAnswersCounter.value++
  }
  isAnswerSelected.value = true

  if (isLastQuestion.value) {
    await saveUserScore()
    await playSound('/audio/ghost-breath.mp3')
    await router.push({ name: 'verdict' })
  }
}

function addTimeToTotal(time: number) {
  totalUserTime.value += time
}

function calculateScore(
  numOfAnswers: number,
  timeTaken: number,
  tries: number,
) {
  const normalizedScore = (numOfAnswers / 15) * 100
  const normalizedTime = ((300 - timeTaken) / 300) * 100
  const normalizedTries = (1 / tries) * 100
  if (normalizedScore === 0) {
    return 0
  }
  return Math.round(
    0.5 * normalizedScore + 0.2 * normalizedTime + 0.2 * normalizedTries,
  )
}

async function saveUserScore() {
  try {
    if (currentUser.value) {
      const currentUserDoc = doc(db, 'quiz-users', currentUser.value.id)
      const userDocSnapshot = await getDoc(currentUserDoc)
      const userTime = Math.round(totalUserTime.value)
      const userTries = userDocSnapshot.data()?.tries + 1
      await updateDoc(currentUserDoc, {
        score: calculateScore(correctAnswersCounter.value, userTime, userTries),
        answers: correctAnswersCounter.value,
        time: userTime,
        tries: userTries,
      })
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="quiz-window">
    <div class="quiz-window__header">
      <HorrorButtonMute @toggle-mute="$emit('muteSound')" />
      <HorrorTimer
        :is-answer-selected="isAnswerSelected"
        :is-last-question="isLastQuestion"
        @reset-timer="goToNextQuestion"
      />
      <div class="question-counter">
        {{ questionCounter + 1 }} / {{ questions.length }}
      </div>
    </div>
    <HorrorQuizQuestion
      :question="questions[questionCounter]"
      :is-next-question="!isAnswerSelected"
      @select-answer="handleSelectAnswer"
      @sum-up-taken-time="addTimeToTotal"
    />
  </div>
</template>

<style scoped lang="scss">
.quiz-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 550px;
  padding: 20px 30px;
  background-color: var(--jet-black);
  border: 2px solid var(--dim-gray);
  box-shadow:
    0 0 15px var(--red),
    0 0 25px var(--red);
  color: var(--white);
  text-align: center;
  border-radius: 10px;
  z-index: 1000;

  .quiz-window__header {
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .question-counter {
      font-size: 24px;
      color: var(--red);
      text-shadow:
        0 0 1px var(--red),
        0 0 2px var(--red);
    }

    .question-next-arrow {
      font-size: 28px;
      cursor: pointer;
      color: var(--red);
      text-shadow:
        0 0 5px var(--red),
        0 0 10px var(--red);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.4);
      }

      &.disabled {
        pointer-events: none;
        color: var(--dim-gray);
        text-shadow: none;
      }
    }

    h3 {
      font-size: 24px;
      margin-bottom: 20px;
      color: var(--red);
      text-shadow:
        0 0 1px var(--red),
        0 0 2px var(--red);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
