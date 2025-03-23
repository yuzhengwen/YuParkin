// stores/user.js
import { defineStore } from 'pinia'
import { ID } from 'appwrite'
import { account } from '../appwrite'
import router from '@/router'
import { useTeamsStore } from './teams'
import { useToast } from 'primevue'

export const useUserStore = defineStore('user', {
  state: () => ({
    current: null,
  }),
  actions: {
    async updateUser() {
      if (this.current) return
      try {
        this.current = await account.get()
        // initialize teams store if user is logged in
        await useTeamsStore().init()
      } catch (e) {
        console.log(e)
        this.current = null
      }
    },
    async register(email, password, name) {
      await account.create(ID.unique(), email, password, name)
      await this.login(email, password)
      router.push({ name: 'home' })
    },
    async login(email, password) {
      await account.createEmailPasswordSession(email, password)
      await this.updateUser() // Refresh user state

      console.log(`Logged in as ${this.current.name}`)

      // Redirect to the page user was trying to access
      const url = new URL(window.location.href)
      console.log(url.searchParams)
      url.searchParams.has('redirect')
        ? router.push(url.searchParams.get('redirect'))
        : router.push({ name: 'home' })
    },
    async logout() {
      console.log('Logging out')
      await account.deleteSession('current')
      this.current = null
      router.push({ name: 'login' })
    },
  },
})
