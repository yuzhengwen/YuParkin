import { Client, Account, Databases, Teams } from 'appwrite'

export const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID) // Replace with your project ID

export const teams = new Teams(client)
export const account = new Account(client)
export const databases = new Databases(client)
export { ID } from 'appwrite'
