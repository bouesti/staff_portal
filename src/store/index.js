import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";


// import example from './module-example'
import staff from './staff'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      staff
    },
    plugins: [createPersistedState()],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
