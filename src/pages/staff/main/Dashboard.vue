<template>
    <q-page padding>
        <div class="row q-px-md q-col-gutter-lg">
            <div class="col-12 col-sm-6">
                <q-card>
                    <q-card-section>
                        <div>
                            <div class="text-grey" :class="$q.screen.lt.sm ? 'text-h3': 'text-h4'"> Curriculum Vitae</div>
                        </div>
                        <div v-if="!getUser.cvLink.length" class="text-center">
                            <div>
                                <img src="~assets/img/cv.png" style="width: 100%;" />
                                <div class="text-grey text-h6 q-mb-sm"> Please upload your Curriculum Vitae </div>
                                <q-btn no-caps flat rounded color="primary" label="click here to start" @click="$router.push({name: 'StaffUpload'})" />
                            </div>
                        </div>
                        <div v-else class="q-py-md">
                            <a :href="getUser.cvLink" no-opener type="download" >
                                <q-btn  no-caps rounded color="primary" icon="mdi-cloud-download-outline" label="Download Cv" />
                            </a>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-sm-6">
                <q-card>
                    <q-card-section>
                        <div>
                            <div class="text-grey" :class="$q.screen.lt.sm ? 'text-h3': 'text-h4'"> Publication Link </div>
                        </div>
                        <div v-if="!getUser.pubLink.length" class="text-center">
                            <div>
                                <img src="~assets/img/author.png" style="width: 100%;" />
                                <div class="text-grey text-h6 q-mb-sm"> Please upload your Publication Link </div>
                                <q-btn no-caps flat rounded color="primary" label="click here to start" @click="$router.push({name: 'StaffUpload'})" />
                            </div>
                        </div>
                        <div v-else class="q-py-md">
                            <a :href="getUser.pubLink" no-opener target="_blank" >
                                <q-btn  no-caps rounded color="primary" icon="mdi-google" label="Visit Google Scholar" />
                            </a>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>

        <!--  -->
        <q-separator spaced="40px" />
        <!-- <q-card>
            <q-card-section>
                <div class="flex justify-between">
                    <div class="text-grey" :class="$q.screen.lt.sm ? 'text-h5': 'text-h3' "> Publications </div>
                    <q-btn v-if="sortPublications.length" no-caps outline rounded color="primary" :icon-right="seeMorePublications ? 'mdi-chevron-up' :'mdi-chevron-down'" label="see more" @click="seeMorePublications = !seeMorePublications" />
                </div>
                <div v-if="!sortPublications.length" class="text-center">
                    <div>
                        <img src="~assets/img/author.png" />
                        <div class="text-grey text-h6 q-mb-sm"> You currently do not have any publication linked to your profile </div>
                        <q-btn no-caps flat rounded color="primary" label="click here to start" @click="$router.push({name: 'StaffUpload'})" />
                    </div>
                </div>
                <div v-else class="row q-col-gutter-lg q-mt-sm">
                    <div class="col-xs-12 col-sm-6 col-md-4" v-for="pub in sortPublications" :key="pub.id">
                            <q-card class="my-card">
                                <a :href="pub.pubLink" :title="pub.title" target="_blank" nofollow>
                                    <img :src="pub.image" height="300" style="width: 100%;">
                                </a>
                                <div class="delete_btn">
                                    <q-btn round outline no-caps color="red" icon="mdi-delete" @click="delete_Publication(pub.id)" />
                                </div>
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
                    </div>
                </div>
            </q-card-section>
        </q-card> -->
    </q-page>
</template>

<style scoped>
    a, a:visited {
        color: black;
    }
</style>

<script>
import db from 'src/boot/firebase.js'
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters('staff', ['getUser']),
        // Run a sort algo here to get just few pieces of the user's publications
        // sortPublications () {
        //     const _ = this
        //     let arr = []
        //     if (_.seeMorePublications) {
        //         arr = _.getUser['publications']
        //     } else {
        //         arr =  _.getUser['publications'].filter((pub, index) => {
        //             return index < 6
        //         })
        //     }
        //     return arr
        // }
    },
    data () {
        return {
            seeMorePublications: false
        }
    },
    methods: {
        ...mapActions('staff', ['DELETE_PUBLICATION']),
        delete_Publication (id) {
            const _ = this
            const userId = _.getUser.id
            const dataObj = _.getUser.publications.filter(pub => pub.id === id)[0]
            _.$q.dialog({
                title: 'Confirm',
                message: 'You are about to delete this Publication from your profile',
                ok: {
                    color: 'negative'
                },
                cancel: true,
                persistent: true
            }).onOk(() => {
                // You will delete from
                // 1. FireStore,
                const userRef = doc(db, "allStaff", _.getUser.id);
                updateDoc(userRef, {
                    publications: arrayRemove(dataObj)
                })
                // 2. storageBucket 
                const storage = getStorage();
                // Points to the root reference
                const storageRef = ref(storage);

                // Points to 'images'
                // Create a reference to the file to delete
                const imagesRef = ref(storageRef, `staffPublications/${id}.jpg`);

                // Delete the file
                deleteObject(imagesRef).then(() => {
                // File deleted successfully
                }).catch((error) => {
                // Uh-oh, an error occurred!
                });
                // 3. vuex
                _.DELETE_PUBLICATION(id)
            }).onOk(() => {}).onCancel(() => {}).onDismiss(() => {})
            
        }
    }
}
</script>