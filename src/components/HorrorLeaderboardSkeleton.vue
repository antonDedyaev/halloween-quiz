<script setup lang="ts">
interface ILeaderboardSkeletonProps {
  itemsAmount: number
}

defineProps<ILeaderboardSkeletonProps>()
</script>

<template>
  <ul class="leaderboard-skeleton-list">
    <li
      v-for="n in itemsAmount"
      :key="n"
      class="leaderboard-skeleton-item shimmer"
    ></li>
  </ul>
</template>

<style scoped lang="scss">
.leaderboard-skeleton-list {
  display: flex;
  flex-direction: column;
  //gap: 20px;
  list-style-type: none;
  padding-top: 20px;
  padding-bottom: 40px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.leaderboard-skeleton-item {
  height: 80px;
  background: rgba(255, 0, 0, 0.1);
  margin: 10px;
  padding: 15px 0;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

@include shimmer-animation;
</style>
