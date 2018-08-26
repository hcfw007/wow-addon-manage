<template>
  <div>
    <h1>WoW Addon Manage</h1>
    <h5 v-if="addons.length < 1">Loading...</h5>
    <ul class="main-list" v-else>
      <li class="main-list-item">
        <div class="title">Addon Title</div>
        <div class="addon-version">Latest Version</div>
        <div class="game-version">Game Version</div>
        <div class="update-time">Update Date</div>
        <div class="update">Update</div>
      </li>
      <li v-for="addon in addons" :key="addon.name" class="main-list-item">
        <div class="title">{{ addon.name }}</div>
        <div class="addon-version">{{ filterVersion(addon.latestVersion) }}</div>
        <div class="game-version">{{ filterVersion(addon.gameVersion) }}</div>
        <div class="update-time">{{ getTime(addon.uploadTimeStamp) }}</div>
        <div class="update">Up-To-Date</div>
      </li>
    </ul>
  </div>
</template>

<script>
import checkUpdateableAddons from '../src/checkUpdateableAddons.js'

export default {
  name: 'app',
  data() {
    return {
      addons: [],
    }
  },
  created: function() {
    checkUpdateableAddons().then(val => {
      console.log(val)
      this.addons = val
    })
  },
  methods: {
    getTime: function(stamp) {
      return new Date(stamp).toLocaleDateString()
    },
    filterVersion: function(version) {
      return version.replace(/[a-zA-Z]/g,"")
    },
  },
}
</script>
<style>
div.title {
  width: 30%
}
div.game-version {
  width: 15%;
}
div.addon-version {
  width: 15%;
}
div.update-time {
  width: 20%;
}
div.update {
  width: 10%
}
.main-list {
  list-style: none;
}
.main-list-item {
  display: block;
  width: 100%;
}
.main-list-item>div {
  display: inline-block;
}
</style>
