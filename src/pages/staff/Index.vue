<template>
    <q-page class="flex flex-center">
        <div class="auth_card">
            <div class="text-h2 text-bold text-primary q-pl-md"> Login </div>
            <div class="q-pa-md">
                <div class="q-gutter-y-md column">
                    <q-input color="primary" type="email" filled v-model="email" label="Email:">
                        <template #append>
                            <q-icon name="email" />
                        </template>
                    </q-input>

                    <q-input color="primary" :type="isPwd ? 'password' : 'text'" filled v-model="password" label="Password">
                        <template #append>
                            <q-btn flat round color="primary" :icon="isPwd ? 'mdi-eye-off' : 'mdi-eye'" @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                    <div>
                        <q-btn no-caps flat rounded class="text-primary" @click="$router.push({name: 'Staff_forgot_password'})"> Forgot password? </q-btn>
                    </div>
                    <div class="text-center" style="width: 100%">
                        <q-btn no-caps color="primary" style="width: 70%" :loading="isLoading" @click="login()">
                            <template #loading>
                                <q-spinner-ball />
                            </template>
                            Login
                        </q-btn>
                    </div>
                    <div class="q-mt-lg text-center text-grey">
                        Don't have an Account?
                        <q-btn no-caps flat rounded color="primary" @click="$router.push({name: 'Staff_signup'})"> Register </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import db from 'src/boot/firebase.js'
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { mapActions } from 'vuex';
export default {
    name: 'Staff_Index_page',
    data () {
        return {
            email: '',
            password: '',
            isPwd: true,
            isLoading: false
        }
    },
    mounted () {
        setTimeout(() => {
            localStorage.clear()
        }, 2000)
    },
    methods: {
        ...mapActions('staff', ['LOAD_CURRENT_USER']),
        login () {
            const _ = this
            if(!_.email.trim().length || !_.password.trim().length) {
                _.notifyAlert('negative', 'mdi-information', 'Please Complete Fields', 'bottom')
                return
            }
            _.isLoading = true
            const auth = getAuth();
            signInWithEmailAndPassword (auth, _.email, _.password)
            .then((userCredential) => {
                _.isLoading = false
                // Signed in 
                const user = userCredential.user;
                return user;
            })
            .then((user) => {
                const unsub = onSnapshot(doc(db, "allStaff", user.uid), (doc) => {
                    // Loading Current Staff Data to the Vuex State
                    _.LOAD_CURRENT_USER(doc.data())
                    _.notifyAlert('info', 'mdi-access-point', 'Successful', 'bottom')
                    _.$router.push({name: 'Dashboard'})
                })
            })
            .catch((error) => {
                _.isLoading = false
                const errorCode = error.code;
                const errorMessage = error.message;
                // _.notifyAlert('negative', 'mdi-alert', errorMessage, 'bottom')
                _.notifyAlert('negative', 'mdi-alert', 'Invalid email & password', 'bottom')
                // .. Add a notification alert here
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
}
</script>
