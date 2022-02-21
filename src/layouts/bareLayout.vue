<template>
  <q-layout>
    <div class="row full_height">
      <div class="col-sm-5 bg-primary flex flex-center" :class="$q.screen.lt.sm ? 'hidden' : ''">
          <div>
              <div class="text-center">
                  <img src="~assets/logo.png" alt="Bouesti Logo" />
              </div>
              <div class="text-white text-h3 text-center q-mt-lg"> BOUESTI </div>
              <div class="text-white text-h3 text-center q-mt-lg bouesti"> Staff Portal </div>
          </div>
      </div>
      <div class="col-sm-7 col-xs-12" :class="$q.screen.gt.sm? 'q-px-lg' : ''" >
        <q-page-container>
          <transition enter-active-class="animated slideInDown" leave-active-class="animated fadeOut" appear :duration="1000" >
              <router-view class="layout-view"></router-view>
          </transition>
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script>
import db from 'src/boot/firebase.js'
import { collection, query, onSnapshot } from "firebase/firestore";
import { mapActions } from 'vuex'
export default {
    name: 'Staff-Auth-Layout',
    mounted () {
      const _ = this
      _.listen_to_staff()
      _.load_bouesti_structures()
      _.load_bouesti_staff_title()

    },
    methods: {
      ...mapActions('staff', ['LOAD_BOUESTI_STRUCTURES', 'LOAD_BOUESTI_STAFF_TITLE', 'STAFF_ACTION']),
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
