import { defineStore } from 'pinia'
import { LIST_STATUS } from '@/constant'

export const appStore = defineStore({
  id: 'app',
  state: () => ({
    defaultImage: '' as string,
    searchQuery: '' as string,
    hotList: [] as any[],
    hotStatus: LIST_STATUS.LOADING as LIST_STATUS,
    recommendList: [] as any[],
    recommendStatus: LIST_STATUS.LOADING as LIST_STATUS,
  }),
  getters: {
    searchList: (state): Array<any> => {
      const allList = [...state.hotList, ...state.recommendList]
      let list = [];
      if (state.searchQuery) {
        list = allList.filter(item => {
          const hasName = item['im:name']['label'].toLowerCase().includes(state.searchQuery.toLowerCase())
          const hasSummary = item['summary']['label'].toLowerCase().includes(state.searchQuery.toLowerCase())
          return hasName || hasSummary
        })
      }
      return list;
    },
  },
  actions: {},
})

