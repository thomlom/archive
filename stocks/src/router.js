import Vue from 'vue'
import Router from 'vue-router'

import AllStocks from './components/AllStocks'
import StockDetail from './components/StockDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'stock-app',
      component: AllStocks
    },
    {
      path: '/:symbol',
      name: 'stock-detail',
      component: StockDetail,
      props: true
    }
  ]
})
