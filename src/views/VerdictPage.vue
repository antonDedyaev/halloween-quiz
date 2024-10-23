<script setup lang="ts">
import HorrorVerdictCard from '@/components/HorrorVerdictCard.vue'
import { verdicts } from '@/store/quizDB'
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { getWordForm } from '@/utils/decline'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import HorrorVerdictCardSkeleton from '@/components/HorrorVerdictCardSkeleton.vue'
import { useUsers } from '@/composables/useUsers'
import WebIcon from '@/assets/icons/web.svg'
import SpiderIcon from '@/assets/icons/spider.svg'

interface IVerdict {
  name: string
  image: string
  description: string
}

interface IResults {
  answers: number
  score: number
  time: number
  tries: number
}

const verdictsData = Object.freeze({
  victim: {
    name: verdicts.poor.name,
    image: verdicts.poor.image,
    description: verdicts.poor.description,
  },
  survivor: {
    name: verdicts.satisfactory.name,
    image: verdicts.satisfactory.image,
    description: verdicts.satisfactory.description,
  },
  hunter: {
    name: verdicts.good.name,
    image: verdicts.good.image,
    description: verdicts.good.description,
  },
  master: {
    name: verdicts.excellent.name,
    image: verdicts.excellent.image,
    description: verdicts.excellent.description,
  },
})

const { currentUser } = useUsers()
const userResults = ref<IResults>({
  answers: 0,
  score: 0,
  time: 0,
  tries: 0,
})
const userVerdict = ref<IVerdict | null>(null)
const isVerdictLoading = ref(false)

function parallax(event: MouseEvent) {
  document.querySelectorAll('.verdict-page__decoration').forEach(shift => {
    const speed = shift.getAttribute('data-speed')
    if (speed) {
      const mouseX = (window.innerWidth - event.pageX * Number(speed)) / 100
      const mouseY = (window.innerHeight - event.pageY * Number(speed)) / 100
      ;(shift as HTMLElement).style.transform =
        `translateX(${mouseX}px) translateY(${mouseY}px)`
    }
  })
}

function getFormattedTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  if (minutes > 0) {
    return `${minutes} ${minutes > 1 ? 'минуты' : 'минуту'}
    ${seconds} ${getWordForm(seconds, 'секунду', 'секунды', 'секунд')}`
  } else {
    return `${seconds} ${getWordForm(seconds, 'секунду', 'секунды', 'секунд')}`
  }
}

async function getUserResults(userId: string) {
  isVerdictLoading.value = true
  try {
    const userRef = doc(db, 'quiz-users', userId)
    const fetchedUser = await getDoc(userRef)
    return fetchedUser ? fetchedUser.data() : null
  } catch (err) {
    console.error(err)
  } finally {
    isVerdictLoading.value = false
  }
}

onBeforeMount(async () => {
  const results = await getUserResults(currentUser.value?.id ?? '')
  if (results) {
    userResults.value = results as IResults
  }
  if (userResults.value.answers < 5) {
    userVerdict.value = verdictsData.victim
  } else if (userResults.value.answers >= 5 && userResults.value.answers < 10) {
    userVerdict.value = verdictsData.survivor
  } else if (
    userResults.value.answers >= 10 &&
    userResults.value.answers < 15
  ) {
    userVerdict.value = verdictsData.hunter
  } else {
    userVerdict.value = verdictsData.master
  }
})

onMounted(() => {
  window.addEventListener('mousemove', parallax)
})

onUnmounted(() => {
  removeEventListener('mousemove', parallax)
})
</script>

<template>
  <div class="verdict-page">
    <div class="verdict-page__header">
      <h2>Твой результат:</h2>
      <p v-if="userResults">
        {{ userResults.answers }}
        {{
          getWordForm(
            userResults.answers,
            'правильный',
            'правильных',
            'правильных',
          )
        }}
        {{ getWordForm(userResults.answers, 'ответ', 'ответа', 'ответов') }}
        за {{ getFormattedTime(userResults.time) }}
      </p>
    </div>
    <div class="verdict-page__decorations">
      <WebIcon data-speed="3" class="verdict-page__decoration" alt="Паутина" />
      <WebIcon data-speed="-3" class="verdict-page__decoration" alt="Паутина" />
      <SpiderIcon data-speed="3" class="verdict-page__decoration" alt="Паук" />
    </div>
    <HorrorVerdictCard
      v-if="!isVerdictLoading && userVerdict"
      :image="userVerdict?.image"
      :name="userVerdict?.name"
      :verdict="userVerdict?.description"
    />
    <HorrorVerdictCardSkeleton v-else />
  </div>
</template>

<style lang="scss">
.verdict-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  background: var(--background);

  &__header {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--main);
    text-align: center;
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    z-index: 5;

    p {
      font-size: 28px;
      color: var(--green);
    }
  }

  &__decoration {
    position: absolute;
    z-index: 3;
  }

  &__decoration:nth-child(1) {
    top: 0;
    left: -15%;
    height: 500px;
    width: 650px;
  }

  &__decoration:nth-child(2) {
    bottom: 0;
    height: 500px;
    width: 650px;
    right: -25%;
  }

  &__decoration:nth-child(3) {
    top: -5%;
    right: 20%;
  }

  @media screen and (min-width: 1600px) {
    &__decoration:nth-child(1) {
      top: 0;
      left: -8%;
    }

    &__decoration:nth-child(2) {
      bottom: 0;
      right: -12%;
    }
  }
}
</style>
