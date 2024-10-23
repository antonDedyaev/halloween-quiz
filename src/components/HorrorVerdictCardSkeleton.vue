<template>
  <div class="verdict-card-skeleton">
    <div class="verdict-card-skeleton__image shimmer"></div>
    <h2 class="verdict-card-skeleton__title shimmer"></h2>
    <p class="verdict-card-skeleton__text shimmer"></p>
  </div>
</template>

<style lang="scss" scoped>
.verdict-card-skeleton {
  background-color: var(--jet-black);
  border: 2px solid var(--dark);
  padding: 20px;
  box-shadow:
    0 0 30px rgba(255, 0, 0, 0.8),
    0 0 50px rgba(255, 0, 0, 0.6);
  text-align: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  width: 30%;
  height: 55%;
  position: relative;
  border-radius: 8px;
  animation: pulse 1.5s infinite ease-in-out;

  &__image,
  &__title,
  &__text {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    margin: 10px 0;
    overflow: hidden;
  }

  &__image {
    height: 80%;
  }

  &__title {
    height: 5%;
    margin: 10px 0;
  }

  &__text {
    height: 10%;
  }
}

@keyframes pulse {
  0% {
    background-color: rgba(255, 255, 255, 0.1);
  }
  50% {
    background-color: rgba(255, 255, 255, 0.2);
  }
  100% {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

@include shimmer-animation;
</style>
