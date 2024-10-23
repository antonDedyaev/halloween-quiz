<script setup lang="ts">
interface IHorrorLeaderboardItemProps {
  place: number
  item: {
    name: string
    score: number
    time: number
    tries: number
  }
}

defineProps<IHorrorLeaderboardItemProps>()

function getFormattedTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `0${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
</script>

<template>
  <li class="horror-leaderboard-item" :class="{ top: place === 1 }">
    <span class="user-rank">{{ place }}.</span>
    <span class="user-name">{{ item.name }}</span>
    <span class="user-score">{{ item.score }}</span>
    <span class="user-time">{{ getFormattedTime(item.time) }}</span>
    <span class="user-tries">{{ item.tries }}</span>
  </li>
</template>

<style scoped lang="scss">
.horror-leaderboard-item {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr 1fr;
  gap: 20px;
  background: rgba(255, 0, 0, 0.1);
  margin: 10px;
  padding: 15px 0;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;

  &.top {
    background: radial-gradient(
      circle at center,
      rgba(100, 0, 0, 0.9),
      rgba(80, 0, 0, 0.8)
    );
    box-shadow:
      0 0 10px rgba(255, 255, 0, 0.6),
      0 0 15px rgba(255, 0, 0, 0.8);
  }

  .user {
    &-rank,
    &-name,
    &-score,
    &-time,
    &-tries {
      color: var(--white);
      font-size: 2em;
      text-align: left;
    }

    &-score,
    &-time,
    &-tries {
      text-align: center;
    }

    &-rank {
      padding-left: 20px;
    }
  }
}
</style>
