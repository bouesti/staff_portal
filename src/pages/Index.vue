<template>
  <q-page class="flex flex-center">
    <div>
      <img alt="Bouesti Official Logo" src="~assets/logo.png" style="width: 200px; height: 200px" >
      <div class="flex justify-center">
        <q-spinner-box color="primary" size="2em" />
        <q-spinner-box color="primary" size="2em" />
        <q-spinner-box color="primary" size="2em" />
        <q-spinner-box color="primary" size="2em" />
      </div>
    </div>
  </q-page>
</template>


<script>
export default {
  name:'PageIndex',
  mounted () {
    const _ = this
    setTimeout(() => {
      _.$router.push({name: 'Staff_auth'})
    }, 5000)
  }
}
</script>
