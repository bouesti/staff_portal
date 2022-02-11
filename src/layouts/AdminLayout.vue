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
      _.listen_to_staff()
      _.load_bouesti_structures()
    },
    methods: {
      ...mapActions('staff', ['LOAD_BOUESTI_STRUCTURES', 'STAFF_ACTION']),
      listen_to_staff () {
        const _ = this
        const q = query(collection(db, "allStaff"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                // Add an ACTION to add staff to the state
                _.STAFF_ACTION({action: change.type, data: change.doc.data()})
            }
            if (change.type === "modified") {
              // Add an ACTION to update staff to the state
              _.STAFF_ACTION({action: change.type, data: change.doc.data()})
            }
            if (change.type === "removed") {
              // Add an ACTION to remove staff to the state
              _.STAFF_ACTION({action: change.type, data: change.doc.data()})
            }
          });
        });
      },
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
      }
    }
}
</script>