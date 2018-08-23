<template>
  <div>
    <h1>test</h1>
    <ul>
      <li v-for="addon in addons" :key="addon.name">
        <ul>{{ addon.name }}</ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {checkUpdateableAddons} from '../src/checkUpdateableAddons.js'

export default {
  name: 'app',
  data() {
    return {
      addons: [],
    }
  },
  created: function() {
    console.log(checkUpdateableAddons)
    checkAddonUpdates().then(val => {
      this.addons = val
    })
  },
}
</script>
