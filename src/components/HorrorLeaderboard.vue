<script setup lang="ts">
import HorrorLeaderboardItem from '@/components/HorrorLeaderboardItem.vue'
import HorrorButton from '@/components/HorrorButton.vue'
import HorrorLeaderboardSkeleton from '@/components/HorrorLeaderboardSkeleton.vue'
import { computed } from 'vue'
import HorrorIcon from '@/components/HorrorIcon.vue'

interface IUser {
  name: string
  score: number
  time: number
  tries: number
}
interface IHorrorLeaderBoardProps {
  users: IUser[]
  isLoading?: boolean
}

const props = defineProps<IHorrorLeaderBoardProps>()

const filteredList = computed(() => {
  return props.users.filter(user => user.tries > 0)
})
</script>

<template>
  <div class="horror-leaderboard">
    <div class="horror-leaderboard__title">
      <HorrorIcon name="evil-pumpkin" size="140" />
      <h2>Лидерборд</h2>
      <div class="horror-leaderboard__btns">
        <HorrorButton
          size="m"
          class="leaderboard-btn"
          @click="$router.push({ name: 'quiz' })"
        >
          Новая попытка
        </HorrorButton>
        <HorrorButton
          size="m"
          class="leaderboard-btn"
          @click="$router.push({ name: 'introduction' })"
        >
          Выход
        </HorrorButton>
      </div>
    </div>
    <div class="horror-leaderboard__header">
      <span class="header-rank">Позиция</span>
      <span class="header-user">Имя</span>
      <span class="header-score">Счет</span>
      <span class="header-time">Время</span>
      <span class="header-tries">Попытки</span>
    </div>
    <ul v-if="!isLoading" class="horror-leaderboard__list">
      <HorrorLeaderboardItem
        v-for="(user, index) in filteredList"
        :key="index"
        :item="user"
        :place="index + 1"
        class="horror-leaderboard__item"
      />
    </ul>
    <HorrorLeaderboardSkeleton :items-amount="5" v-else />
  </div>
</template>

<style scoped lang="scss">
.horror-leaderboard {
  background-color: var(--jet-black);
  border: 2px solid var(--dark);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
  text-align: center;
  width: 900px;
  height: 800px;
  position: relative;
  animation: fadeIn 1s ease-in-out;
  font-family: Vampire, sans-serif;
  overflow: hidden;

  &__title {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    padding: 0 20px;

    h2 {
      color: var(--red);
      font-size: 4.5em;
    }
  }

  &__btns {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr 1fr;
    gap: 20px;
    padding: 10px 0;
    border-bottom: 2px solid var(--dark);
    margin: 0 10px;

    span {
      color: var(--white);
      font-size: 2em;
      text-shadow:
        0 0 5px rgba(255, 165, 0, 0.7),
        0 0 5px rgba(255, 165, 0, 0.5);
      text-align: left;
    }

    .header-rank {
      grid-column: 1 / 2;
    }

    .header-user {
      grid-column: 2 / 3;
    }

    .header-score {
      grid-column: 3 / 4;
    }

    .header-time {
      grid-column: 4 / 5;
    }

    .header-score,
    .header-time,
    .header-tries {
      text-align: center;
    }
  }

  &__list {
    list-style-type: none;
    padding-top: 10px;
    padding-bottom: 40px;
    overflow-y: auto;
    max-height: 80%;
    scrollbar-width: thin;
  }

  @media screen and (min-width: 1920px) {
    width: 1400px;
    height: 1000px;

    &__list {
      padding-bottom: 10px;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
