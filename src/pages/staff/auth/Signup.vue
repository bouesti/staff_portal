<template>
    <q-page class="flex flex-center">
        <div class="auth_card">
            <div class="text-h2 text-bold text-primary q-pl-md"> Register </div>
            <div>
                <q-stepper flat v-model="step" vertical color="primary" animated >
                    <q-step :name="1" title="Personal Info" caption="Provide your personal details here" color="text-grey" icon="settings" :done="step > 1" >
                        <div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <q-select filled v-model="title" color="primary" :options="titleOptions" label="Title" />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-input color="primary" type="text" filled v-model="surname" label="Surname"/>
                                </div>
                                <div class="col-12">
                                    <q-input color="primary" type="text" filled v-model="othername" label="Other Names"/>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-input color="primary" type="email" filled v-model="email" label="Institutional Email"/>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-input color="primary" type="tel" filled v-model="phone" label="Phone Number"/>
                                </div>
                                <div class="col-12">
                                    <q-input color="primary" :type="isPwd ? 'password' : 'text'" filled v-model="password" label="Password">
                                        <template #append>
                                            <q-btn flat round color="primary" :icon="isPwd ? 'mdi-eye-off' : 'mdi-eye'" @click="isPwd = !isPwd" />
                                        </template>
                                    </q-input>
                                </div>
                            </div>
                            <div>
                                <q-stepper-navigation>
                                    <q-btn no-caps outline rounded color="primary" class="q-px-lg" label="Next" @click="step = 2"/>
                                </q-stepper-navigation>
                            </div>
                        </div>

                    </q-step>

                    <q-step :name="2" title="getBouestiStructure Data" caption="Official Data" icon="create_new_folder" :done="step > 2" >
                        <div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12">
                                    <q-select filled v-model="staffStatus" color="primary" :options="staffStatusOptions" label="Select Staff Status" />
                                </div>
                                <q-slide-transition>
                                    <div class="col-12 q-col-gutter-md" v-show="staffStatus == 'Academic'">
                                        <div class="col-12">
                                            <q-select filled v-model="college" color="primary" :options="collegeOptions" label="College" />
                                        </div>
                                        <div class="col-12">
                                            <q-select filled v-model="school" color="primary" :options="schoolOptions" label="School" />
                                        </div>
                                        <div class="col-12">
                                            <q-select filled v-model="department" color="primary" :options="departmentOptions" label="Department" />
                                        </div>
                                    </div>
                                </q-slide-transition>
                                <q-slide-transition>
                                    <div class="col-12 q-col-gutter-md" v-show="staffStatus == 'Non-Academic'">
                                        <div class="col-12">
                                            <q-select filled v-model="designation" color="primary" :options="designationOptions" label="Designation" />
                                        </div>
                                    </div>
                                </q-slide-transition>
                            </div>
                            <div>
                                <q-stepper-navigation>
                                    <q-btn no-caps outline rounded color="primary" class="q-px-lg" label="Prev" @click="step = 1"/>
                                </q-stepper-navigation>
                            </div>
                        </div>
                        <div class="text-center q-mt-lg" style="width: 100%">
                            <q-btn no-caps color="primary" style="width: 70%" :loading="isLoading" @click="register">
                                <template #loading>
                                    <q-spinner-ball />
                                </template>
                                Register
                            </q-btn>
                        </div>
                        <div class="q-mt-lg text-center text-grey">
                        Already have an Account?
                        <q-btn no-caps flat rounded color="primary" @click="$router.push({name: 'Staff_auth'})"> Login </q-btn>
                    </div>
                    </q-step>
                </q-stepper>
            </div>
        </div>
    </q-page>
</template>

<script>
import db from 'src/boot/firebase.js'
import { doc, setDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { mapGetters } from 'vuex';

export default {
    name: 'Signup_page',
    computed: {
        ...mapGetters('staff', ['getBouestiStructure', 'getBouestiStaffTitle', 'getBouestiStaffDesignation']),
        collegeOptions () {
            const _ = this
            var keys =  Object.keys(this.getBouestiStructure)
            return keys
        }
    },
    data () {
        return {
            isPwd: true,
            isLoading: false,
            step: 1,
            staffStatus: 'Academic',
            staffStatusOptions: ['Academic', 'Non-Academic'],
            title: '',
            titleOptions: [],
            surname: '',
            othername: '',
            email: '',
            password: '',
            phone: '',
            designation: '',
            designationOptions: [],
            college: '',
            school: '',
            schoolOptions: [],
            department: '',
            departmentOptions: [],
        }
    },
    mounted() {
        const _ = this
        _.titleOptions = _.getBouestiStaffTitle
        _.designationOptions = _.getBouestiStaffDesignation
    },
    methods: {
        register () {
            const _ = this
            if(!_.email.trim().length ||
                !_.password.trim().length ||
                !_.title.trim().length ||
                !_.surname.trim().length ||
                !_.othername.trim().length ||
                !_.phone.trim().length 
                // Start from here...
               /* || !_.designation.trim().length ||
                !_.college.trim().length ||
                !_.school.trim().length ||
                !_.department.trim().length */ ) {
                _.notifyAlert('negative', 'mdi-information', 'Please Complete Fields', 'bottom')
                return
            }
            // This checks if the staff is Academic
            if (_.staffStatus == "Academic") { 
                if( !_.college.trim().length || !_.school.trim().length || !_.department.trim().length) {
                    console.log(_.staffStatus)
                    _.notifyAlert('negative', 'mdi-information', 'Please Complete Academic Fields', 'bottom')
                    return
                }
                // This checks if the staff is Non-Academic
            } else if( !_.designation.trim().length) {
                _.notifyAlert('negative', 'mdi-information', 'Please Complete Non-Academic Fields', 'bottom')
                return
            }
            _.isLoading = true
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, _.email, _.password)
            .then((userCredential) => {
                // Signed in then creating the users data
                const user = userCredential.user;
                return setDoc(doc(db, "allStaff", user.uid), {
                    id: user.uid,
                    surname: _.surname,
                    otherNames: _.othername,
                    email: _.email,
                    phone: _.phone,
                    title: _.title,
                    staffStatus: _.staffStatus,
                    // The below OR statement is in case the staff is non academic, let them still have the college, school and department field
                    college: _.college || '',
                    school: _.school || '',
                    department: _.department || '',
                    designation: _.designation || '',
                    publications: [],
                    cvLink: '',
                    pubLink: '',
                    displayImage: ''
                    })
            }).then((res) => {
                _.isLoading = false
                _.notifyAlert('info', 'mdi-access-point', 'Successfully Logged In', 'bottom')
                _.$router.push({name: 'Staff_auth'})
            })
            .catch((error) => {
                _.isLoading = false
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                _.notifyAlert('negative', 'mdi-alert', 'Please password must be 6 characters and above', 'bottom')
            });
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
        college (val) {
            const _ = this
            _.school = ''
            _.schoolOptions = []
            if (val) {
                var keys = Object.keys(_.getBouestiStructure[val])
                _.schoolOptions = keys
            }
        },
        school (val) {
            const _ = this
            _.department = ''
            _.departmentOptions = []
            if (val) {
                var values = Object.values(_.getBouestiStructure[_.college][val])
                _.departmentOptions = values
            }
        },
    }
}
</script>