<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import db from 'src/boot/firebase.js'
import { collection, query, onSnapshot } from "firebase/firestore";
import { mapActions } from 'vuex'
export default {
  name: 'AdminLayout',
  mounted () {
      const _ = this
      _.load_bouesti_structures()
      _.load_bouesti_staff_title()
    },
    methods: {
      ...mapActions('staff', ['LOAD_BOUESTI_STRUCTURES', 'LOAD_BOUESTI_STAFF_TITLE']),
      load_bouesti_structures () {
        const _ = this
        const q = query(collection(db, "bouesti_structure"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const obj = {}
          querySnapshot.forEach((doc) => {
            Object.assign(obj, doc.data())
          });
          _.LOAD_BOUESTI_STRUCTURES(obj)
        });
      },
      load_bouesti_staff_title () {
        const _ = this
        const q = query(collection(db, "staff_title"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const obj = {}
          querySnapshot.forEach((doc) => {
            Object.assign(obj, doc.data())
          });
          _.LOAD_BOUESTI_STAFF_TITLE(obj)
        });
      },
    }
}
</script>