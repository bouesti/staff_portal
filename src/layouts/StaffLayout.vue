<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>
          {{ getPage }}
        </q-toolbar-title>

        <div class="font-bold">Hi, {{ getUser.surname }}  </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-4" >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding separator>
            <!-- General Link -->
            <div>
                <q-item-label header>General</q-item-label>
                <q-separator  inset class="q-mx-lg" />

                <q-item clickable v-ripple v-close-popup :to="{ name: 'Dashboard' }">
                  <q-item-section avatar>
                    <q-icon name="mdi-monitor-dashboard" />
                  </q-item-section>

                  <q-item-section>
                    My Dashboard
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item clickable v-ripple v-close-popup :to="{ name: 'Profile' }">
                  <q-item-section avatar>
                    <q-icon name="mdi-account-outline" />
                  </q-item-section>

                  <q-item-section>
                    Profile
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item clickable v-ripple v-close-popup :to="{ name: 'StaffUpload' }">
                  <q-item-section avatar>
                    <q-icon name="mdi-cloud-upload-outline" />
                  </q-item-section>

                  <q-item-section>
                  Upload Document
                  </q-item-section>
                </q-item>
              <q-separator inset />
            </div>
            <q-item clickable v-ripple :to="{ name: 'View_Staff' }">
              <q-item-section avatar>
                <q-icon name="mdi-account-group-outline" />
              </q-item-section>

              <q-item-section >
                View Staff Log
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="logUserOut()">
              <q-item-section avatar>
                <q-icon color="red" name="mdi-location-exit" />
              </q-item-section>

              <q-item-section >
                Logout
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="~assets/img/bg.jpg" style="height: 165px">
          <div class="absolute-bottom bg-transparent text-primary text-center">
            <q-avatar size="80px" class="q-mb-sm">
              <img :src="getDp" />
            </q-avatar>
            <div class="text-weight-bold title-font"> {{ getUser.surname }} </div>
            <div> {{ getUser.email }} | {{ getUser.phone }} </div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { mapGetters } from 'vuex'
import { Loading, QSpinnerGears } from 'quasar'
export default {
  name: 'Staff-Layout',
  computed: {
    ...mapGetters('staff', ['getUser']),
    getPage () {
      const _ = this
      var path = _.$route.path
      var pathArr = path.split('/')
      return pathArr[pathArr.length - 1]
    },
    getDp () {
      const _ = this
      var src = _.getUser.displayImage
      return src.length ? src : require('../assets/logo.png')
    }
  },
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  methods: {
    logUserOut () {
      const _ = this
      Loading.show({spinner: QSpinnerGears})
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        localStorage.clear()
        setTimeout(() => {
          Loading.hide()
          _.$router.push({name: 'Staff_auth'})
          localStorage.clear()
        }, 3000)
      }).catch((error) => {
        // An error happened.
        Loading.hide()
      });
    }
  }
}
</script>
