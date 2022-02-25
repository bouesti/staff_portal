<template>
    <q-page>
        <div class="sticky_header bg-white shadow-2 q-pa-sm">
            <q-btn no-caps rounded flat color="primary" icon="mdi-chevron-left" label="Back" @click="$router.go(-1)" />
        </div>
        <div class="q-my-lg q-px-lg">
            <q-card>
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-4">
                            <img v-if="currentStaff.displayImage ? currentStaff.displayImage.length : false" :src="currentStaff.displayImage" alt="Staff Image" style="width: 100%; height: 300px;" :style="$q.screen.lt.sm ? 'border-radius: 10px 10px 0px 0px;' : 'border-radius: 10px 0px 0px 10px;'" />
                            <img v-else src="~assets/logo.png" alt="Bouesti Logo" style="width: 100%;" :style="$q.screen.lt.sm ? 'border-radius: 10px 10px 0px 0px;' : 'border-radius: 10px 0px 0px 10px;'" />
                        </div>
                        <div class="col-12 col-sm-8 col-md-6">
                            <div>
                                <q-list bordered separator>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label overline> Full Name </q-item-label>
                                            <q-item-label> {{ currentStaff.surname + ' ' + currentStaff.otherNames }} </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <a :href="`mailto:${currentStaff.email}`" rel="noopener noreferrer">
                                        <q-item clickable v-ripple>
                                                <q-item-section>
                                                    <q-item-label overline> Email </q-item-label>
                                                    <q-item-label> {{ currentStaff.email }} </q-item-label>
                                                </q-item-section>
                                        </q-item>
                                    </a>
                                    <q-separator />
                                    <a :href="`tel:${currentStaff.phone}`" rel="noopener noreferrer">
                                        <q-item clickable v-ripple>
                                                <q-item-section>
                                                    <q-item-label overline> Phone Number </q-item-label>
                                                    <q-item-label> {{ currentStaff.phone }} </q-item-label>
                                                </q-item-section>
                                        </q-item>
                                    </a>
                                    <q-separator />
                                    <q-item clickable v-ripple v-if="currentStaff.designation">
                                        <q-item-section>
                                            <q-item-label overline> Designation </q-item-label>
                                            <q-item-label> {{ currentStaff.designation }} </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-ripple v-else>
                                        <q-item-section>
                                            <q-item-label overline> Institution Details </q-item-label>
                                            <q-item-label > {{ currentStaff.college }} | {{ currentStaff.school }} | {{ currentStaff.department }} </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
            <q-separator spaced="40px" />
            <div class="q-my-md"></div>

            <div class="row q-px-md q-col-gutter-lg">
                <div class="col-12 col-sm-6">
                    <q-card>
                        <q-card-section v-if="!currentStaff.cvLink.length">
                            <div class="text-center">
                                <div>
                                    <img src="~assets/img/cv.png" :style="$q.screen.lt.sm ? 'width: 100%;' :'width: 50%;'" />
                                    <div class="text-grey text-h6 q-mb-sm"> {{ currentStaff.title }} {{ currentStaff.surname }} has not uploaded Cv yet. </div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section v-else>
                            <div class="text-grey text-h5 q-mb-md"> Download {{ currentStaff.title }} {{ currentStaff.surname }}'s Cv </div>
                            <div>
                                <a :href="currentStaff.cvLink" no-opener target="_blank" >
                                    <q-btn  no-caps rounded color="primary" icon="mdi-file" label="View Cv" />
                                </a>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-12 col-sm-6">
                    <q-card>
                        <q-card-section v-if="!currentStaff.pubLink.length">
                            <div class="text-center">
                                <div>
                                    <img src="~assets/img/author.png" :style="$q.screen.lt.sm ? 'width: 100%;' :'width: 50%;'" />
                                    <div class="text-grey text-h6 q-mb-sm"> {{ currentStaff.title }} {{ currentStaff.surname }} has not uploaded Publication Link yet. </div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section v-else>
                            <div class="text-grey text-h5 q-mb-md"> Visit {{ currentStaff.title }} {{ currentStaff.surname }}'s Google Scholar </div>
                            <div>
                                <a :href="currentStaff.pubLink" no-opener target="_blank" >
                                    <q-btn  no-caps rounded color="primary" icon="mdi-google" label="Visit Google Scholar" />
                                </a>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <!--  -->
            <div class="q-my-md"></div>
            <!-- <q-card>
                <q-card-section v-if="!currentStaff.cvLink.length">
                    <div class="text-center">
                        <div>
                            <img src="~assets/img/cv.png" :style="$q.screen.lt.sm ? 'width: 100%;' :'width: 50%;'" />
                            <div class="text-grey text-h6 q-mb-sm"> {{ currentStaff.title }} {{ currentStaff.surname }} has not uploaded Cv yet. </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section v-else>
                    <div class="text-grey text-h4 q-mb-md"> Download {{ currentStaff.title }} {{ currentStaff.surname }}'s Cv </div>
                    <div>
                        <a :href="currentStaff.cvLink" no-opener target="_blank" >
                            <q-btn  no-caps rounded color="primary" icon="mdi-cloud-download-outline" label="Download Cv" />
                        </a>
                    </div>
                </q-card-section>
            </q-card> -->
            <div class="q-my-md"></div>
            <!-- <q-card>
                <q-card-section>
                    <div class="text-grey text-h4 q-mb-md"> Publications </div>
                </q-card-section>
                <q-card-section>
                    <div v-if="!currentStaff.publications.length" class="text-center">
                        <div>
                            <img src="~assets/img/author.png" :style="$q.screen.lt.sm ? 'width: 100%;' :'width: 50%;'"  />
                            <div class="text-grey text-h6 q-mb-sm"> {{ currentStaff.title }}. {{ currentStaff.surname }} has no publications on this profile. </div>
                        </div>
                    </div>
                    <div v-else class="row q-col-gutter-lg q-mt-sm">
                        <div class="col-xs-12 col-sm-6 col-md-4" v-for="pub in currentStaff.publications" :key="pub.id">
                            <a :href="pub.pubLink" :title="pub.title" target="_blank" nofollow>
                                <q-card class="my-card" v-ripple>
                                    <img :src="pub.image" height="250">

                                    <q-card-section>
                                         <q-list>
                                            <q-item>
                                                <q-item-section>
                                                    <q-item-label lines="2" class="text-h6 text-bold text-grey">
                                                        {{ pub.title }}
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-card-section>
                                    <q-separator inset />
                                    <q-card-section class="q-pt-none">
                                        <q-list>
                                            <q-item>
                                                <q-item-section>
                                                    <q-item-label lines="2">
                                                        {{ pub.abstract }}
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-card-section>
                                </q-card>
                            </a>
                        </div>
                    </div>
                </q-card-section>
            </q-card> -->
        </div>
    </q-page>
</template>

<style scoped>
    a, a:visited {
        color: black;
    }
</style>

<script>
import db from 'src/boot/firebase.js'
import { doc, getDoc } from "firebase/firestore";
import { mapGetters } from 'vuex'
import { Loading, QSpinnerGears } from 'quasar'
export default {
    name: 'Single-Staff-Page',
    computed: {
        ...mapGetters('staff', ['getStaff'])
    },
    data () {
        return {
            currentStaff: {
                title: '',
                surname: '',
                displayImage: null,
                otherNames: '',
                email: '',
                phone: '',
                designation: '',
                college: '',
                school: '',
                department: '',
                cvLink: '',
                pubLink: '',
                publications: []
            }
        }
    },
    mounted() {
        const _ = this
        const currentStaffId = _.$route.params.id
        Loading.show({
            spinner: QSpinnerGears,
            // other props
        })
        // Once you get the ID, make a request to Firebase
        // Reason being that, a staff might simply add his link to the profile.
        // Meaning that visitors won't go through the index page, where the normal request to firebase was made.
        _.getCurrentStaff(currentStaffId)
    },
    methods: {
        async getCurrentStaff (id) {
            const _ = this
            // _.currentStaff = _.getStaff.filter((staff) => staff.id === id)[0]
            const docRef = doc(db, "allStaff", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                _.currentStaff = docSnap.data()
                Loading.hide()
            } else {
                // doc.data() will be undefined in this case
                _.notifyAlert('negative', 'mdi-information', 'Can\'t load Staff, you will be redirected to staff. page', 'center')
                setTimeout(() => {
                    Loading.hide()
                    _.$router.push({name: 'View_Staff'})
                }, 2000)
                // Use a preloader here
            }
        },
         notifyAlert (type, icon, msg, position) {
            const _ = this
            _.$q.notify({
                type: type,
                icon: icon,
                message: msg,
                position: position,
                time: 1000
            })
        }
    }
}
</script>