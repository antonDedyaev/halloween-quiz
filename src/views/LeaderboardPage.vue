<script setup lang="ts">
import Leaderboard from '@/components/HorrorLeaderboard.vue'
import { onBeforeMount, ref } from 'vue'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'

interface IUser {
  name: string
  score: number
  time: number
  tries: number
}
const usersList = ref<IUser[]>([])
const isUsersListLoading = ref(false)
async function getUsersList() {
  isUsersListLoading.value = true
  try {
    const users = collection(db, 'quiz-users')
    const q = query(users, orderBy('score', 'desc'), orderBy('tries', 'asc'))
    const docs = await getDocs(q)

    docs.forEach(doc => {
      const resultsData = doc.data() as IUser
      usersList.value.push(resultsData)
    })
  } catch (err) {
    console.error(err)
  } finally {
    isUsersListLoading.value = false
  }
}

onBeforeMount(async () => {
  await getUsersList()
})
</script>

<template>
  <div class="leaderboard-page">
    <Leaderboard :users="usersList" :is-loading="isUsersListLoading" />
  </div>
</template>

<style scoped lang="scss">
.leaderboard-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 50px 0;
  background: var(--background);
}
</style>
