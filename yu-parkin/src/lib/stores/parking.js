import { ID, Query } from 'appwrite'
import { databases } from '../appwrite'
import { reactive } from 'vue'
import { useTeamsStore } from './teams'

const DATABASE_ID = import.meta.env.VITE_PROD_DATABASE_ID
const PARKING_COLLECTION_ID = import.meta.env.VITE_PARKING_COLLECTION_ID
export const parking = reactive({
  current: [],
  async init() {
    // inits and fetches user teams
    const teamsStore = useTeamsStore()
    await teamsStore.init()
    const teamIds = teamsStore.userTeamsObj.teams.map((team) => team.$id)
    if (teamIds.length === 0) return // if user has no teams, no need to fetch parkings
    console.log('Teams: ', teamsStore.userTeamsObj.teams)
    const response = await databases.listDocuments(DATABASE_ID, PARKING_COLLECTION_ID, [
      Query.orderDesc('$createdAt'),
      Query.contains('team-id', teamIds),
      Query.limit(10),
    ])
    this.current = response.documents
  },
  async add(parking) {
    const response = await databases.createDocument(
      DATABASE_ID,
      PARKING_COLLECTION_ID,
      ID.unique(),
      parking,
    )
    this.current = [response, ...this.current].slice(0, 10)
  },
  async remove(id) {
    console.log('Deleting document with ID', id)
    await databases.deleteDocument(DATABASE_ID, PARKING_COLLECTION_ID, id)
    this.current = this.current.filter((parking) => parking.$id !== id)
    await this.init() // Refetch ideas to ensure we have 10 items
  },
})
