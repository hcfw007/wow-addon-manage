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
        <div class="update" v-if="addon.status == 'up-to-date'">Up-To-Date</div>
        <div class="update" v-if="addon.status == 'updateable'" @click="update(addon)"><button>Update</button></div>
        <div class="update" v-if="addon.status == 'updating'">{{ updateAni }}</div>
        <div class="update" v-if="addon.status == 'updated'">Updated</div>
        <div class="update" v-if="addon.status == 'error'">Error<button @click="update(addon)">Try again</button></div>
      </li>
    </ul>
  </div>
</template>

<script>
import checkUpdateableAddons from '../src/checkUpdateableAddons.js'
import download from '../src/download.js'
import unzip from '../src/unzip.js'

export default {
  name: 'app',
  data() {
    return {
      addons: [],
      downloadList: [],
      updateAni: "Updating",
    }
  },
  created: function() {
    checkUpdateableAddons().then(val => {
      for (let i in val) {
        if (this.updateable(val[i])) {
          val[i].status = "updateable"
        } else {
          val[i].status = "up-to-date"
        }
      }
      this.addons = val
    })
    function updateAniNextFrame() {
      if (this.updateAni == "Updating...") {
        this.updateAni = "Updating"
      } else {
        this.updateAni += "."
      }
    }
    setInterval(updateAniNextFrame, 1000)
  },
  methods: {
    getTime: function(stamp) {
      return new Date(stamp).toLocaleDateString()
    },
    filterVersion: function(version) {
      return version.replace(/[a-zA-Z]/g,"")
    },
    getNum: function(text){
      return parseInt(text.replace(/[^0-9]/ig,""))
    },
    updateable: function(addon) {
      if (addon.currentVersion) {
        if (this.getNum(addon.currentVersion) != this.getNum(addon.latestVersion)) {
          return true
        }
      } else {
        if (addon.currentTimeStamp < addon.uploadTimeStamp) {
          return true
        }
      }
      return false
    },
    update: function(addon) {
      addon.status = "updating"
      let fileName = addon.name + ".zip"
      download(addon.downloadURL, fileName).then(() => {
        unzip("../temp/" + fileName)
        addon.status = "updated"
      }).catch(err => {
        console.log(err)
        addon.status = "error"
      })
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
