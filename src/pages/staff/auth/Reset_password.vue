<template>
    <q-page class="flex flex-center">
        <div class="auth_card">
            <div class="text-h2 text-bold text-primary q-pl-md"> Reset Password </div>
            <div class="q-pa-md">
                <div class="q-gutter-y-md column">
                    <q-input color="primary" :type="isPwd ? 'password' : 'text'" filled v-model="password" label="Password">
                        <template #append>
                            <q-btn flat round color="primary" :icon="isPwd ? 'mdi-eye-off' : 'mdi-eye'" @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                    <div class="text-center" style="width: 100%">
                        <q-btn no-caps color="primary" style="width: 50%" :loading="isLoading" @click="resetPassword()">
                            <template #loading>
                                <q-spinner-ball />
                            </template>
                            Reset Password
                        </q-btn>
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
            password: '',
            isLoading: false,
            isPwd: true,
        }
    },
    methods: {
        resetPassword () {
            const _ = this
            if (!_.password.trim().length) {
                _.notifyAlert('negative', 'mdi-alert', 'Please enter new password' , 'bottom')
                return
            }
            _.isLoading = true;
            const auth = getAuth();
            console.log('George this is the auth data from the reset password page', auth)

            const user = auth.currentUser;
            // const newPassword = getASecureRandomPassword();
            const newPassword = _.password;

            updatePassword(user, newPassword).then(() => {
                // Redirect to login
                _.isLoading = false
                _.$router.push({name: 'Staff_auth'})
            }).catch((error) => {
                _.isLoading = false
                const errorMessage = error.message;
                console.log(errorMessage)
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