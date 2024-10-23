<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import HorrorButton from '@/components/HorrorButton.vue'
import CheckIcon from '@/components/CheckIcon.vue'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUsers } from '@/composables/useUsers'
import { playSound } from '@/utils/playSound'
import SkullIcon from '@/assets/icons/skull.svg'
import GrassIcon from '@/assets/icons/grass.svg'
import BatsIcon from '@/assets/icons/bats.svg'

const { setUser, purgeUser } = useUsers()
const userName = ref('')
const isUserIntroduced = ref(false)
const isAcceptButtonDisabled = computed(() => !userName.value.length)

async function handleConfirmName() {
  try {
    isUserIntroduced.value = true
    await playSound('/audio/werewolf.mp3', 0.2)
    const userRef = await addDoc(collection(db, 'quiz-users'), {
      name: userName.value,
      score: 0,
      answers: 0,
      time: 0,
      tries: 0,
    })
    setUser({
      id: userRef.id,
      username: userName.value,
    })
  } catch (e) {
    console.error('Error adding user: ', e)
  }
}

onMounted(async () => {
  await purgeUser()
})
</script>

<template>
  <div class="introduction-page">
    <div class="introduction-page__decorations">
      <BatsIcon data-speed="3" class="introduction-page__decoration" />
      <SkullIcon data-speed="12" class="introduction-page__decoration" />
      <GrassIcon data-speed="-7" class="introduction-page__decoration bottom" />
    </div>
    <div v-if="!isUserIntroduced" class="introduction-page__header">
      <h1>Приветствую, мешок с костями</h1>
      <div class="introduction-page__input">
        <div class="introduction-page__username">
          <label for="username" class="spooky-label">Назови свое имя</label>
          <input
            v-model="userName"
            type="text"
            id="username"
            class="spooky-input"
            placeholder="Меня зовут..."
          />
        </div>
        <HorrorButton
          :disabled="isAcceptButtonDisabled"
          size="s"
          @click="handleConfirmName"
        >
          <CheckIcon
            :width="30"
            :height="30"
            :disabled="isAcceptButtonDisabled"
          />
        </HorrorButton>
      </div>
    </div>
    <div v-else class="introduction-page__header">
      <h2>Рад встрече, {{ userName }} !</h2>
      <p>Если любишь ужасы, жми на кнопку</p>
      <HorrorButton size="xl" @click="$router.push({ name: 'quiz' })">
        Начнем
      </HorrorButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.introduction-page {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--background);

  &__decoration {
    position: absolute;
    z-index: 3;
  }

  &__decoration:nth-child(1) {
    top: 2%;
    left: 0;
    height: 40%;
    width: 40%;
  }

  &__decoration:nth-child(2) {
    top: 10%;
    right: -45%;
    height: 40%;
    width: 100%;
  }

  &__decoration:nth-child(3) {
    left: 0;
    right: 0;
    bottom: -200px;
    width: 100%;
  }

  &__header {
    margin-top: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: var(--main);
    text-align: center;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    z-index: 5;
  }

  &__input {
    display: flex;
    align-items: flex-end;
    gap: 20px;
  }

  &__username {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    position: relative;
  }

  .spooky-label {
    font-family: 'Creepster', cursive;
    font-size: 1.8rem;
    color: var(--red);
    text-shadow: 0 0 10px var(--orange);
    margin-bottom: 10px;
    transition: transform 0.2s ease;
  }

  .spooky-input {
    font-family: 'Creepster', cursive;
    font-size: 1.2rem;
    color: var(--white);
    background-color: #222;
    border: 2px solid var(--red);
    border-radius: 10px;
    padding: 10px;
    width: 250px;
    text-align: center;
    box-shadow: 0 0 15px rgba(255, 140, 0, 0.6);
    outline: none;
    transition:
      box-shadow 0.3s ease,
      background-color 0.3s ease;
  }

  .spooky-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-style: italic;
  }

  .spooky-input:hover {
    background-color: #333;
    box-shadow: 0 0 25px rgba(255, 69, 0, 0.8);
  }

  .spooky-input:focus {
    background-color: var(--dark);
    box-shadow: 0 0 30px rgba(255, 69, 0, 1);
  }

  .spooky-label:hover {
    transform: scale(1.1);
    text-shadow:
      0 0 15px var(--orange),
      0 0 30px var(--orange);
  }

  &__controls {
    display: flex;
    gap: 15px;
  }

  .username-banner {
    font-family: 'Creepster', cursive;
    font-size: 1.5rem;
    color: var(--white);
    background-color: var(--jet-black);
    border: 2px solid var(--red);
    border-radius: 10px;
    padding: 15px 30px;
    text-shadow: 0 0 5px var(--orange);
    box-shadow: 0 0 20px rgba(255, 69, 0, 0.6);
  }

  @keyframes flicker {
    0%,
    10%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
      opacity: 1;
    }
    20%,
    24%,
    55% {
      opacity: 0.4;
    }
  }

  .spooky-input {
    animation: flicker 2s infinite;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20%,
    60% {
      transform: translateX(-5px);
    }
    40%,
    80% {
      transform: translateX(5px);
    }
  }

  .spooky-input:focus {
    animation: shake 0.3s ease-in-out;
  }
}
</style>
