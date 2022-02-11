<template>
    <q-page padding class="flex flex-center">
        <q-card style="" :style="$q.screen.gt.sm ? 'max-width: 80vw' : 'width: 100%'">
            <q-card-section>
                <div class="text-center">
                    <q-avatar  size="300px" font-size="52px">
                        <!-- <img src="../../../assets/logo.png"> -->
                        <img :src="getDp">
                        <div class="inline bg-amber rounded-borders cursor-pointer" style="max-width: 300px" >
                                <div class="fit flex flex-center text-center non-selectable q-pa-md">
                                    <q-btn fab color="primary" icon="mdi-camera-enhance-outline" class="absolute" style="bottom: 0; right: 12px; transform: translateY(-50%);" />
                                </div>

                                <q-menu touch-position >
                                    <div class="row q-col-gutter-md q-pa-sm">
                                        <div class="col-12">
                                            <q-file v-model="displayImage" label="Select Image" filled clearable counter accept="image/*" />
                                        </div>
                                        <div class="col-12 text-center">
                                            <q-btn v-close-popup no-caps rounded color="primary" label="Upload" style="width: 80%;" @click="updateDP()" />
                                        </div>
                                    </div>
                                </q-menu>
                            </div>
                    </q-avatar>
                </div>
            </q-card-section>
            <q-card-section>
                <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6">
                        <q-input color="primary" type="text" filled v-model="surname" label="Surname" readonly />
                    </div>
                    <div class="col-12 col-sm-6">
                        <q-input color="primary" type="text" filled v-model="otherNames" label="Other Names" readonly />
                    </div>
                    <div class="col-12 col-sm-6">
                        <q-input color="primary" type="email" filled v-model="email" label="Institutional Email" readonly />
                    </div>
                    <div class="col-12 col-sm-6">
                        <q-input color="primary" type="tel" filled v-model="phone" label="Phone Number" readonly />
                    </div>
                    <div class="col-12">
                        <q-input filled v-model="designation" color="primary" label="Designation"  readonly />
                    </div>
                    <div class="col-12">
                        <q-input filled v-model="college" color="primary" label="College"  readonly />
                    </div>
                    <div class="col-12">
                        <q-input filled v-model="school" color="primary" label="School"  readonly />
                    </div>
                    <div class="col-12">
                        <q-input filled v-model="department" color="primary" label="Department"  readonly />
                    </div>
                    <div class="col-12 text-center">
                        <q-btn outline rounded no-caps icon-right="mdi-account" color="primary" style="width: 40%;" label="Edit Profile" @click="openEditProfileDialog()" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <!-- Editing Profile Picture Modal Box -->
        <q-dialog v-model="editProfileModal">
            <q-card class="my-card">
                <q-card-section class="flex items-baseline">
                    <div class="text-h4 text-grey"> Edit Profile </div>
                    <q-spinner-audio color="primary" size="20px" />
                </q-card-section>
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-6">
                            <q-input color="primary" type="text" filled v-model="edit_surname" label="Surname"/>
                        </div>
                        <div class="col-12 col-sm-6">
                            <q-input color="primary" type="text" filled v-model="edit_otherNames" label="Other Names"/>
                        </div>
                        <div class="col-12 col-sm-6">
                            <q-input color="primary" type="email" filled v-model="edit_email" label="Institutional Email" readonly/>
                        </div>
                        <div class="col-12 col-sm-6">
                            <q-input color="primary" type="tel" filled v-model="edit_phone" label="Phone Number"/>
                        </div>
                        <div class="col-12">
                            <q-select filled v-model="edit_designation" color="primary" :options="edit_designationOptions" label="Designation" />
                        </div>
                        <div class="col-12">
                            <q-select filled v-model="edit_college" color="primary" :options="collegeOptions" label="College" />
                        </div>
                        <div class="col-12">
                            <q-select filled v-model="edit_school" color="primary" :options="edit_schoolOptions" label="School" />
                        </div>
                        <div class="col-12">
                            <q-select filled v-model="edit_department" color="primary" :options="edit_departmentOptions" label="Department" />
                        </div>
                        <div class="col-12 text-center">
                            <q-btn rounded no-caps color="primary" style="width: 60%;" label="Update" @click="updateProfile()" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import db from 'src/boot/firebase.js'
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL   } from "firebase/storage";
import { mapGetters, mapActions } from 'vuex';
import { Loading, QSpinnerGears } from 'quasar';
export default {
    name: 'Staff-Profile',
    computed: {
        ...mapGetters('staff', ['getUser', 'getBouestiStructure']),
        getDp () {
            const _ = this
            var src = _.getUser.displayImage
            return src.length ? src : require('../../../assets/logo.png')
        },
        collegeOptions () {
            const _ = this
            var keys =  Object.keys(this.getBouestiStructure)
            return keys
        }
    },
    data () {
        return {
            editProfileModal: false,
            surname: '',
            otherNames: '',
            email: '',
            phone: '',
            designation: '',
            college: '',
            school: '',
            department: '',
            displayImage: null,
            edit_surname: '',
            edit_otherNames: '',
            edit_email: '',
            edit_phone: '',
            edit_designation: '',
            edit_college: '',
            edit_school: '',
            edit_department: '',
            edit_designationOptions: [],
            edit_schoolOptions: [],
            edit_departmentOptions: [],
        }
    },
    mounted () {
        const _ = this
        const { surname, otherNames, email, phone, title, college, school, department, designation, displayImage, } = _.getUser;
        _.surname = surname
        _.otherNames = otherNames
        _.email = email
        _.phone = phone
        _.college = college
        _.school = school
        _.department = department
        _.designation = designation
        _.displayImage = displayImage
    },
    methods: {
        ...mapActions('staff', ['UPDATE_STAFF', 'UPDATE_STAFF_DISPLAY_IMAGE']),
        openEditProfileDialog () {
            const _ = this
            _.editProfileModal = !_.editProfileModal
            _.edit_surname = _.surname
            _.edit_otherNames = _.otherNames
            _.edit_email = _.email
            _.edit_phone = _.phone
            _.edit_designation = _.designation
            _.edit_college = _.college
            _.edit_school = _.school
            _.edit_department = _.department
        },
        updateProfile () {
            const _ = this
            _.editProfileModal = true
            const dataObj = {
                surname: _.edit_surname,
                otherNames: _.edit_otherNames,
                email: _.edit_email,
                phone: _.edit_phone,
                designation: _.edit_designation,
                college: _.edit_college,
                school: _.edit_school || _.school,
                department: _.edit_department || _.department,
            }
            const userRef = doc(db, "allStaff", _.getUser.id);

            // Update the user account
            updateDoc(userRef, dataObj)
            _.editProfileModal = false
            _.UPDATE_STAFF(dataObj)
        },
        updateDP () {
            const _ = this
            // Here the file will be sent to firebase storage, then the link will be used to update the staff displayImage
            // 
            Loading.show({
                spinner: QSpinnerGears
            })
            const storage = getStorage();

            // Points to the root reference
            const storageRef = ref(storage);

            // Points to 'images'
            const imagesRef = ref(storageRef, 'staffDisplayImages');

            // Points to 'staffDisplayImages/<staff uid>.jpg'
            // Creating the filename using the current staff's UID.
            const fileName = `${_.getUser.id}.jpg`;
            const spaceRef = ref(imagesRef, fileName);
            // 'file' comes from the Blob or File API
            // Create the file metadata
            /** @type {any} */
            const metadata = {
                contentType: 'image/jpeg'
            };
            const uploadTask = uploadBytesResumable(spaceRef, _.displayImage, metadata);
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        _.notifyAlert('negative', 'mdi-information', 'You do not have permission to access this storage', 'bottom')
                         Loading.hide()
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        _.notifyAlert('negative', 'mdi-information', 'You cancelled the upload', 'bottom')
                         Loading.hide()
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        _.notifyAlert('negative', 'mdi-information', 'Unknown error, please contact admin', 'bottom')
                         Loading.hide()
                        break;
                    default:
                        Loading.hide()
                }
            }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const userRef = doc(db, "allStaff", _.getUser.id);
                        updateDoc(userRef, {
                            displayImage: downloadURL
                        })
                        Loading.hide()
                        // Update the url to the vuex state
                        _.UPDATE_STAFF_DISPLAY_IMAGE(downloadURL)
                    });
                }
            );
           
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
        edit_college (val) {
            const _ = this
            _.edit_school = ''
            _.edit_department = ''
            _.edit_schoolOptions = []
            if (val) {
                var keys = Object.keys(_.getBouestiStructure[val])
                _.edit_schoolOptions = keys
            }
        },
        edit_school (val) {
            const _ = this
            _.edit_departmentOptions = []
            if (val) {
                var values = Object.values(_.getBouestiStructure[_.edit_college][val])
                _.edit_departmentOptions = values
            }
        },
    }
}
</script>