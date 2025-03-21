import { defineStore } from 'pinia'
import { client, ID, teams } from '../appwrite'
import { useUserStore } from './user'

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    userTeamsObj: {},
  }),
  actions: {
    async init() {
      const user = useUserStore()
      if (!user.current) return
      await this.fetchTeams()
      await this.subscribe()
    },
    async fetchTeams() {
      // returns object with 'total' and 'teams' properties
      this.userTeamsObj = await teams.list()
    },
    async createTeam(name) {
      await teams.create(ID.unique(), name, [])
    },
    async joinTeam(teamId, email) {
      await teams.createMembership(
        teamId,
        [],
        email,
        undefined,
        undefined,
        'http://localhost:5173/accept-invite',
      )
    },

    async subscribe() {
      client.subscribe('teams', async (response) => {
        console.log(response.payload)
        await this.fetchTeams()
      })
    },
  },
})
export const getTeamFromId = (teamId) => {
  return useTeamsStore().userTeamsObj.teams.find((team) => team.$id === teamId)?.name || 'Team not found'
}
