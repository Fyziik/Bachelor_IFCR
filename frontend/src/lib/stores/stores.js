import { writable } from 'svelte/store'

export const displayDeviceState = writable(false)
export const loggedInUser = writable({ data: { username: null } })
