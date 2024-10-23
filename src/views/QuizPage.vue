<script setup lang="ts">
import HorrorButton from '@/components/HorrorButton.vue'
import HorrorModal from '@/components/HorrorModal.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import HorrorQuizWindow from '@/components/HorrorQuizWindow.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useUsers } from '@/composables/useUsers'
import BatIconBig from '@/assets/icons/bat1.svg'
import BatIconMiddle from '@/assets/icons/bat2.svg'
import BatIconSmall from '@/assets/icons/bat3.svg'
import BatIconTiny from '@/assets/icons/bat4.svg'
import SpiderIcon from '@/assets/icons/spider.svg'
import WebIcon from '@/assets/icons/web.svg'

const creepyTune = new Audio('/audio/halloween.mp3')
creepyTune.preload = 'auto'
creepyTune.loop = true

const { currentUser } = useUsers()

const isGameStarted = ref(false)
const isLeaveModalActive = ref(false)

function parallax(event: MouseEvent) {
  document.querySelectorAll('.main-page__decoration').forEach(shift => {
    const speed = shift.getAttribute('data-speed')
    if (speed) {
      const mouseX = (window.innerWidth - event.pageX * Number(speed)) / 100
      const mouseY = (window.innerHeight - event.pageY * Number(speed)) / 100
      ;(shift as HTMLElement).style.transform =
        `translateX(${mouseX}px) translateY(${mouseY}px)`
    }
  })
}

function triggerLeaveModal() {
  isLeaveModalActive.value = !isLeaveModalActive.value
}

function startBackgroundTune() {
  creepyTune.play()
  creepyTune.volume = 0.1
}

function muteBackgroundTune() {
  creepyTune.volume = creepyTune.volume > 0 ? 0 : 0.2
}

function startGame() {
  startBackgroundTune()
  isGameStarted.value = true
}

onMounted(() => {
  window.addEventListener('mousemove', parallax)
})

onUnmounted(() => {
  removeEventListener('mousemove', parallax)
})

onBeforeRouteLeave(() => {
  creepyTune.pause()
})
</script>

<template>
  <div class="main-page">
    <div class="main-page__decorations">
      <BatIconBig data-speed="9" class="main-page__decoration" />
      <BatIconMiddle data-speed="7" class="main-page__decoration" />
      <BatIconSmall data-speed="-10" class="main-page__decoration" />
      <BatIconTiny data-speed="-6" class="main-page__decoration" />
      <SpiderIcon data-speed="-4" class="main-page__decoration" />
      <WebIcon data-speed="3" class="main-page__decoration" />
    </div>
    <HorrorQuizWindow v-if="isGameStarted" @mute-sound="muteBackgroundTune" />
    <template v-else>
      <div class="main-page__header">
        <h2>Сыграем в квиз, {{ currentUser?.username }} ?</h2>
      </div>
      <div class="main-page__options">
        <HorrorButton @click="startGame"> Конечно </HorrorButton>
        <HorrorButton @click="triggerLeaveModal"> Может позже... </HorrorButton>
      </div>
    </template>
  </div>
  <HorrorModal
    v-if="isLeaveModalActive"
    @close="triggerLeaveModal"
    @leave="$router.push({ name: 'introduction' })"
  >
    <template #title> Уже уходишь?! </template>
    <template #default>
      <p class="modal-message">Возвращайся, когда наберешься смелости...</p>
    </template>
  </HorrorModal>
</template>

<style lang="scss" scoped>
.main-page {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 50px;
  width: 100%;
  height: 100%;
  background: center url('/images/Hero.png');
  background-size: cover;

  &__decoration {
    position: absolute;
    z-index: 3;
  }

  &__decoration:nth-child(1) {
    top: 20%;
    left: 15%;
  }

  &__decoration:nth-child(2) {
    top: 60%;
    left: 80%;
  }

  &__decoration:nth-child(3) {
    top: 30%;
    left: 65%;
  }

  &__decoration:nth-child(4) {
    top: 65%;
    left: 40%;
  }

  &__decoration:nth-child(5) {
    top: -5%;
    left: 35%;
  }

  &__decoration:nth-child(6) {
    bottom: 0;
    left: -10%;
    width: 650px;
    height: 500px;
  }

  &__header {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: var(--main);
    text-align: center;
    font-size: 38px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    z-index: 5;
  }

  &__options {
    display: flex;
    justify-content: center;
    gap: 40px;
  }
}

.modal-message {
  color: var(--white);
  margin-bottom: 20px;
  font-size: 1.8rem;
}
</style>
