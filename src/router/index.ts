import { createRouter, createWebHistory } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUsers } from '@/composables/useUsers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quiz',
      component: () => import('../views/QuizPage.vue'),
      meta: { requiresName: false, isWithTransition: true },
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: () => import('../views/IntroductionPage.vue'),
      meta: { isWithTransition: true },
    },
    {
      path: '/verdict',
      name: 'verdict',
      component: () => import('../views/VerdictPage.vue'),
      meta: { requiresTries: true, isWithTransition: false },
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/LeaderboardPage.vue'),
      meta: { isWithTransition: false },
    },
  ],
})

const { currentUser } = useUsers()

async function getCurrentUserData() {
  try {
    if (currentUser.value) {
      const currentUserDoc = doc(db, 'quiz-users', currentUser.value.id)
      const userDocSnapshot = await getDoc(currentUserDoc)
      return userDocSnapshot.data()?.tries
    }
  } catch (err) {
    console.error(err)
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresName)) {
    if (!currentUser.value) {
      next({ name: 'introduction' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresTries)) {
    const tries = await getCurrentUserData()
    if (tries === 0 || !currentUser.value) {
      next(from)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
