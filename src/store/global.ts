import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    isLoading: false,
    loginModalVisible: false,
  }),
})
