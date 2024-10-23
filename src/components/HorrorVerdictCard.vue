<script setup lang="ts">
import HorrorButton from '@/components/HorrorButton.vue'
import { useRouter } from 'vue-router'

interface IHorrorVerdictCardProps {
  image: string
  name: string
  verdict: string
}
defineProps<IHorrorVerdictCardProps>()

const router = useRouter()

function leaveQuiz() {
  localStorage.removeItem('currentUser')
  router.push({ path: 'introduction' })
}
</script>

<template>
  <div class="horror-verdict-card-wrapper">
    <div class="horror-verdict-card">
      <div class="horror-verdict-card__front">
        <img :src="image" alt="Изображение на хэллоуин" class="card-image" />
        <h2 class="card-title">{{ name }}</h2>
        <p class="card-text">{{ verdict }}</p>
      </div>
      <div class="horror-verdict-card__back">
        <img
          src="/images/pumpkin.png"
          alt="Изображение на хэллоуин"
          class="card-image"
        />
        <HorrorButton
          size="xl"
          class="verdict-btn"
          @click="router.push({ path: 'leaderboard' })"
        >
          Лидерборд
        </HorrorButton>
        <HorrorButton
          size="xl"
          class="verdict-btn"
          @click="router.push({ path: '/' })"
        >
          Пройти еще раз
        </HorrorButton>
        <HorrorButton size="xl" class="verdict-btn" @click="leaveQuiz">
          Выйти
        </HorrorButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.horror-verdict-card-wrapper {
  perspective: 1000px;

  .horror-verdict-card {
    width: 450px;
    height: 680px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    cursor: pointer;

    &:hover {
      transform: rotateY(180deg);
    }

    &__front,
    &__back {
      position: absolute;
      padding: 20px;
      backface-visibility: hidden;
      border-radius: 8px;
      background-color: var(--jet-black);
      border: 2px solid var(--dark);
      box-shadow:
        0 0 30px rgba(255, 0, 0, 0.8),
        0 0 50px rgba(255, 0, 0, 0.6);
      text-align: center;
    }

    &__back {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      transform: rotateY(180deg);
    }

    .card {
      &-image {
        width: 100%;
        transition: filter 0.3s;
        border-radius: 5px;
      }

      &-title {
        color: var(--red);
        font-size: 1.8em;
        margin: 10px 0;
      }

      &-text {
        color: var(--orange);
        font-family: 'Vampire', sans-serif;
        font-size: 1.2em;
        font-weight: 400;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
      }
    }

    @media screen and (min-width: 1920px) {
      width: 650px;
      height: 850px;

      .card {
        &-title {
          font-size: 2em;
        }

        &-text {
          font-size: 1.5em;
        }
      }
    }
  }
}
</style>
