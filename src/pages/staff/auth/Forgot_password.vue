<template>
    <q-page class="flex flex-center">
        <div class="auth_card">
            <div class="text-h2 text-bold text-primary q-pl-md"> Forgot Password </div>
            <div class="q-pa-md">
                <div class="q-gutter-y-md column">
                    <q-input color="primary" type="email" filled v-model="email" label="Institutional Email:">
                        <template #append>
                            <q-icon name="email" />
                        </template>
                    </q-input>
                    <div class="text-center" style="width: 100%">
                        <q-btn no-caps color="primary" style="width: 50%" :loading="isLoading" @click="requestResetEmail()">
                            <template #loading>
                                <q-spinner-ball />
                            </template>
                            Request Reset Email
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
import { getAuth, sendPasswordResetEmail , updatePassword } from "firebase/auth";
export default {
    name: 'Forgot_Password',
    data () {
        return {
            email: '',
            isLoading: false,
        }
    },
    methods: {
        requestResetEmail () {
            const _ = this
            if(!_.email.trim().length) {
                _.notifyAlert('negative', 'mdi-alert', 'Please provide your institutional email' , 'bottom')
                return
            }
            _.isLoading = true
            const auth = getAuth();
            sendPasswordResetEmail(auth, _.email)
            // sendPasswordResetEmail(auth, 'g.ikwegbu@gmail.com')
            .then(() => {
                // Password reset email sent!
                _.isLoading = false
                _.notifyAlert('info', 'mdi-information', `A reset mail has been sent to ${_.email}` , 'bottom')
                _.$router.push({name: 'Staff_auth'})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                _.isLoading = false
                _.notifyAlert('negative', 'mdi-alert', 'Please contact Admin' , 'bottom')
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
    }
}
</script>