<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div> 
                    <span class="text-h2 text-bold"> Hello {{ getUser.surname }} </span>,
                    <div class="text-h6 text-grey q-my-lg" style="width: 600px; max-width: 100%;">
                        Welcome to BOUESTI Document upload,
                        please read the below instructions on how to format your document before uploading the details.
                        Thanks
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <q-separator spaced="40px" />
        <div class="row q-px-md q-col-gutter-lg">
            <div class="col-12 col-sm-6">
                <q-card class="q-pb-lg">
                        <q-card-section>
                            <div class="text-h5 text-grey text-bold"> Curriculum Vitae </div>
                        </q-card-section>
                        <q-card-section>
                            <div>
                                <q-list bordered separator>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label> Link to your Google Drive </q-item-label>
                                            <q-item-label caption>
                                                For efficiency purpose, please upload file to your Google Drive, and paste link the url here.
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <div class="row q-col-gutter-md">
                                <div class="col-12">
                                    <q-input filled v-model="newUploadCvLink" color="primary" label="Link to Resource" />
                                </div>
                                <div class="col-12 text-center">
                                    <q-btn no-caps color="primary" style="width: 70%" :loading="isLoadingNewCv" @click="uploadNewCv">
                                        <template #loading>
                                            <q-spinner-ball />
                                        </template>
                                        Upload Cv
                                    </q-btn>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
            </div>
            <div class="col-12 col-sm-6">
                <q-card class="q-pb-lg">
                        <q-card-section>
                            <div class="text-h5 text-grey text-bold"> Publication Link </div>
                        </q-card-section>
                        <q-card-section>
                            <div>
                                <q-list bordered separator>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label> Link to your Google Scholar Account </q-item-label>
                                            <q-item-label caption>
                                                For efficiency purpose, please upload publications to your Google Scholar, and paste link the url here.
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <div class="row q-col-gutter-md">
                                <div class="col-12">
                                    <q-input filled v-model="newUploadPubLink" color="primary" label="Link to Google Scholar" />
                                </div>
                                <div class="col-12 text-center">
                                    <q-btn no-caps color="primary" style="width: 70%" :loading="isLoadingNewPub" @click="uploadNewPub">
                                        <template #loading>
                                            <q-spinner-ball />
                                        </template>
                                        Upload Publication Link
                                    </q-btn>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
            </div>
        </div>
        <!--  -->
        <div class="q-my-lg"> </div>
        <!-- <div class="row q-col-gutter-md q-ml-md q-my-md">
            <div class="">
                <q-btn no-caps rounded :outline="currentDoc != 'cv'" color="primary" label="Curriculum Vitae" @click="switchDoc('cv')" />
            </div>
            <div class="">
                <q-btn no-caps rounded :outline="currentDoc != 'pub'" color="primary" label="Publication" @click="switchDoc('pub')" />
            </div>
        </div> -->
        <!-- <div>
            <div class="row q-col-gutter-lg">
                <div v-if="currentDoc == 'cv'" class="col-12 col-md-8">
                    <q-card class="q-pb-lg">
                        <q-card-section>
                            <div class="text-h4 text-grey text-bold"> Curriculum Vitae </div>
                        </q-card-section>
                        <q-card-section>
                            <div>
                                <q-list bordered separator>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label> Select Format </q-item-label>
                                            <q-item-label caption>
                                                Please select the file format, might be an Image, PDF, WORD or PPT.
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label> Link to your Google Drive </q-item-label>
                                            <q-item-label caption>
                                                For efficiency purpose, please upload file to your Google Drive, and then paste the url here.
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <div class="row q-col-gutter-md">
                                <div class="col-12">
                                    <q-select filled v-model="cv.fileFormat" color="primary" :options="cv.fileOptions" label="File Format" />
                                </div>
                                <div class="col-12">
                                    <q-input filled v-model="cv.fileLink" color="primary" label="Link to Resource" />
                                </div>
                                <div class="col-12 text-center">
                                    <q-btn no-caps color="primary" style="width: 70%" :loading="isLoadingCv" @click="uploadCv">
                                        <template #loading>
                                            <q-spinner-ball />
                                        </template>
                                        Upload Cv
                                    </q-btn>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div v-if="currentDoc == 'pub'" class="col-12 col-md-8">
                    <q-card>
                        <q-card-section>
                            <div class="text-h4 text-grey text-bold"> Publications </div>
                        </q-card-section>
                        <q-card-section>
                            <div>
                                <q-list bordered separator>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label> Provide Title </q-item-label>
                                            <q-item-label caption>
                                                People would like to know the title of your publication
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label> Provide Abstract </q-item-label>
                                            <q-item-label caption>
                                                Include not more than 150 abstract words of your publication
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label> Header Image </q-item-label>
                                            <q-item-label caption>
                                                Include a header Image, as this helps intrigue people into taking a look at what you published
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label> Link to where it was published </q-item-label>
                                            <q-item-label caption>
                                                Include a link to where ever you had your publication hosted online
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <q-input filled v-model="pub.title" color="primary" label="Title" />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-input filled v-model="pub.fileLink" color="primary" label="Publication Link" />
                                </div>
                                <div class="col-12">
                                    <q-input type="textarea" filled v-model="pub.abstract" color="primary" label="Abstract" />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-file v-model="files" label="Header Image" filled counter clearable accept="image/*" hint="Must be less than 1 MB" >
                                        <template v-slot:prepend>
                                            <q-icon name="attach_file" />
                                        </template>
                                    </q-file>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <img v-if="files" :src="pub.displayImage"  width="100"/>
                                    <img v-else src="../../../assets/img/placeholder.png"  width="100"/>
                                </div>
                                <div class="col-12 text-center">
                                    <q-btn no-caps color="primary" style="width: 70%" :loading="isLoadingPub" @click="uploadPub">
                                        <template #loading>
                                            <q-spinner-ball />
                                        </template>
                                        Upload Publication
                                    </q-btn>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div> -->
    </q-page>
</template>

<script>
import db from 'src/boot/firebase.js'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL   } from "firebase/storage";
import { mapGetters, mapActions } from 'vuex'
import { uid } from 'quasar'
export default {
    name: 'Staff-Upload-Page',
    computed: {
        ...mapGetters('staff', ['getUser'])
    },
    data () {
        return {
            currentDoc: 'cv',
            cv: {
                fileFormat: '',
                fileLink: '',
                fileOptions: ['Word', 'PDF', 'Power Point', 'Image', 'Other']
            },
            isLoadingCv: false,
            pub: {
                title: '',
                abstract: '',
                displayImage: null,
                fileLink: '',
            },
            files: null,
            isLoadingPub: false,
            // Updates starts here, above data will be preserved just in case
            newUploadCvLink: '',
            newUploadPubLink: '',
            isLoadingNewCv: false,
            isLoadingNewPub: false,
        }
    },
    methods: {
        ...mapActions('staff', ['ADD_CV_LINK', 'ADD_PUB_LINK', 'ADD_CV_PUBLICATION']),
        // uploadCv () {
        //     const _ = this
        //     const { fileFormat, fileLink } = _.cv
        //     if(!fileFormat.trim().length || !fileLink.trim().length) {
        //         _.notifyAlert('negative', 'mdi-information', 'Please Complete Fields', 'bottom')
        //         return
        //     }
        //     _.isLoadingCv = true
        //     const userRef = doc(db, "allStaff", _.getUser.id);

        //     updateDoc(userRef, {
        //         cvLink: fileLink
        //     })
        //     setTimeout(() => {
        //         _.ADD_CV_LINK(fileLink)
        //         _.isLoadingCv = false
        //         _.$router.push({name: 'Dashboard'})
        //     }, 5000)
        // },
        /* uploadPub () {
            const _ = this
            const publicationID = uid();
            const author = _.getUser.surname + ' ' + _.getUser.otherNames
            const author_id = _.getUser.id
            const { title, abstract, fileLink } = _.pub
            if(!title.trim().length ||
                !fileLink.trim().length ||
                !abstract.trim().length ||
                !_.files
                ) {
                _.notifyAlert('negative', 'mdi-information', 'Please Complete Fields', 'bottom')
                return
            }
            const fileSize = _.files.size / 1024 / 1024
            if (fileSize >= 1) {
                _.notifyAlert('negative', 'mdi-information', 'Header image must be less than 1 MB', 'bottom')
                return
            }
            _.isLoadingPub = true
            const storage = getStorage();

            Points to the root reference
            const storageRef = ref(storage);

            Points to 'images'
            const imagesRef = ref(storageRef, 'staffPublications');

            Points to 'staffPublications/<publication uid>.jpg'
            Creating the filename using the current publication's UID.
            const fileName = `${publicationID}.jpg`;
            const spaceRef = ref(imagesRef, fileName);
            'file' comes from the Blob or File API
            Create the file metadata
            const metadata = {
                contentType: 'image/jpeg'
            };
            const uploadTask = uploadBytesResumable(spaceRef, _.files, metadata);
            Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                A full list of error codes is available at
                https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        User doesn't have permission to access the object
                        _.notifyAlert('negative', 'mdi-information', 'You do not have permission to access this storage', 'bottom')
                         _.isLoadingPub = false
                        break;
                    case 'storage/canceled':
                        User canceled the upload
                        _.notifyAlert('negative', 'mdi-information', 'You cancelled the upload', 'bottom')
                        _.isLoadingPub = false
                       break;

                    // ...

                    case 'storage/unknown':
                        Unknown error occurred, inspect error.serverResponse
                        _.notifyAlert('negative', 'mdi-information', 'Unknown error, please contact admin', 'bottom')
                         _.isLoadingPub = false
                        break;
                    default:
                        _.isLoadingPub = false
                }
            }, 
                () => {
                    Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const dataObj = {
                            id: publicationID,
                            title: title,
                            abstract: abstract,
                            image: downloadURL,
                            pubLink: fileLink,
                            author: author,
                            author_id: author_id
                        }
                        const userRef = doc(db, "allStaff", _.getUser.id);
                        updateDoc(userRef, {
                            publications: arrayUnion(dataObj)
                            use arrayRemove("east_coast") to delete an obj
                        })
                        The snapshot on the login page will update everything
                        setTimeout(() => {
                            _.ADD_CV_PUBLICATION(dataObj)
                            _.isLoadingPub = false
                            _.$router.push({name: 'Dashboard'})
                        }, 5000)
                    });
                }
            );
        }, */
        
        async uploadNewCv () {
            const _ = this;
            if(!_.newUploadCvLink.trim().length) {
                _.notifyAlert('negative', 'mdi-information', 'Please Complete Field', 'bottom')
                return
            }
            _.isLoadingNewCv = true
            try {
                const userRef = doc(db, "allStaff", _.getUser.id);
    
                await updateDoc(userRef, {
                    cvLink: _.newUploadCvLink
                })
                _.ADD_CV_LINK(_.newUploadCvLink)
                _.isLoadingNewCv = false
                _.$router.push({name: 'Dashboard'})
            } catch (error) {
                _.isLoadingNewPub = false
                _.notifyAlert('negative', 'mdi-information', 'Please Contact Admin', 'bottom')
            }
        },
        async uploadNewPub () {
             const _ = this;
            if(!_.newUploadPubLink.trim().length) {
                _.notifyAlert('negative', 'mdi-information', 'Please Complete Field', 'bottom')
                return
            }
            _.isLoadingNewPub = true
            try {
                const userRef = doc(db, "allStaff", _.getUser.id);
                await updateDoc(userRef, {
                    pubLink: _.newUploadPubLink
                })
                _.ADD_PUB_LINK(_.newUploadPubLink)
                _.isLoadingNewPub = false
                _.$router.push({name: 'Dashboard'})
            } catch (error) {
                _.isLoadingNewPub = false
                _.notifyAlert('negative', 'mdi-information', 'Please Contact Admin', 'bottom')
            }
        },
        switchDoc (val) {
            const _ = this
            _.currentDoc = val
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
    },
    watch: {
        files (input) {
            const _ = this
            // if (input.files && input.files[0]) {
            if (input) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    _.pub.displayImage = e.target.result;
                }

                reader.readAsDataURL(input);
            }
        }
    }
}
</script>