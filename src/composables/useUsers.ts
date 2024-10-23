import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { computed } from 'vue'

interface IUser {
  id: string
  username: string
}
export function useUsers() {
  const currentUser = computed<IUser | null>(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      return JSON.parse(savedUser)
    }
    return null
  })

  function setUser(user: { id: string; username: string }) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }
  async function purgeUser() {
    try {
      if (currentUser.value) {
        const userRef = doc(db, 'quiz-users', currentUser.value.id)
        const userDocSnapshot = await getDoc(userRef)
        if (userDocSnapshot.data()?.tries === 0) {
          await deleteDoc(userRef)
        }
        localStorage.removeItem('currentUser')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return {
    currentUser,
    setUser,
    purgeUser,
  }
}
