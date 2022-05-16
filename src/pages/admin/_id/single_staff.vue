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
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label overline> Title </q-item-label>
                                            <q-item-label> {{ currentStaff.title }} </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
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
                                    <q-item >
                                        <q-item-section>
                                            <q-item-label overline> Status </q-item-label>
                                            <q-item-label v-if="currentStaff.designation"> {{ currentStaff.designation }} </q-item-label>
                                            <q-item-label v-else> {{ currentStaff.academicStatus }} </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <!-- <a :href="`https://orcid.org/${currentStaff.orcidNum}`" target="_blank" rel="noopener noreferrer" v-if="currentStaff.staffStatus.toLowerCase() == 'academic'"> -->
                                    <a :href="`https://orcid.org/${currentStaff.orcidNum}`" target="_blank" rel="noopener noreferrer" v-if="currentStaff.staffStatus.toLowerCase() == 'academic' && currentStaff.orcidNum">
                                        <q-item clickable v-ripple>
                                            <q-item-section>
                                                <q-item-label overline> Orcid Number </q-item-label>
                                                <q-item-label > {{ currentStaff.orcidNum }} </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </a>
                                    <q-separator />
                                    <!-- <a :href="`https://publons.com/researcher/${currentStaff.publonNum ? currentStaff.publonNum : ''}`" target="_blank" rel="noopener noreferrer" v-if="currentStaff.staffStatus.toLowerCase() == 'academic'"> -->
                                    <a :href="`https://publons.com/researcher/${currentStaff.publonNum ? currentStaff.publonNum : ''}`" target="_blank" rel="noopener noreferrer" v-if="currentStaff.staffStatus.toLowerCase() == 'academic' && currentStaff.publonNum">
                                        <q-item clickable v-ripple>
                                            <q-item-section>
                                                <q-item-label overline> Publon Number </q-item-label>
                                                <q-item-label > {{ currentStaff.publonNum }} </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </a>
                                    <q-separator />
                                    <a v-if="currentStaff.website" :href="`${currentStaff.website}`" target="_blank" rel="noopener noreferrer">
                                        <q-item clickable v-ripple>
                                            <q-item-section>
                                                <q-item-label overline> Personal Website </q-item-label>
                                                <q-item-label> {{ currentStaff.website }} </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </a>
                                    <q-separator />
                                    <q-item v-if="currentStaff.staffStatus.toLowerCase() == 'academic'">
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
            <div class="q-my-md"></div>
            <div class="q-my-md"></div>
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
                academicStatus: '',
                college: '',
                school: '',
                staffStatus: '',
                department: '',
                cvLink: '',
                pubLink: '',
                website: '',
                orcidNum: '',
                publonNum: '',
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