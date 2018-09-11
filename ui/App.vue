<template>
  <div>
    <h1>WoW Addon Manage</h1>
    <span>WoW Path:</span><input type="text" v-model="wowPath" disabled style="width: 500px">
    <div>
      <button @click="selectPath()">Select</button>
      <button @click="updateWowPath()">update</button>
    </div>
    <h5 v-if="!validPath(wowPath)">Invalid WoW Path</h5>
    <div v-else>
      <h5 v-if="addons.length < 1">Loading... or Reloading...</h5>
      <ul class="main-list" v-else>
        <li class="main-list-item">
          <div class="title">Addon Title</div>
          <div class="addon-version">Latest Version</div>
          <div class="game-version">Game Version</div>
          <div class="update-time">Update Date</div>
          <div class="update"><button @click="updateAll()">Update All</button></div>
        </li>
        <li v-for="addon in addons" :key="addon.name" class="main-list-item">
          <div class="title">{{ addon.name }}</div>
          <div class="addon-version">{{ filterVersion(addon.latestVersion) }}</div>
          <div class="game-version">{{ filterVersion(addon.gameVersion) }}</div>
          <div class="update-time">{{ getTime(addon.uploadTimeStamp) }}</div>
          <div class="update" v-if="addon.status == 'up-to-date'">Up-To-Date</div>
          <div class="update" v-if="addon.status == 'updateable'" @click="update(addon)"><button>Update</button></div>
          <div class="update" v-if="addon.status == 'updating'">Updating ...</div>
          <div class="update" v-if="addon.status == 'updated'">Updated</div>
          <div class="update" v-if="addon.status == 'error'">Error<button @click="update(addon)">Try again</button></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import checkUpdateableAddons from '../src/checkUpdateableAddons.js'
import download from '../src/download.js'
import unzip from '../src/unzip.js'
import configControl from '../src/configControl.js'
import fs from 'fs'
const {dialog} = require('electron').remote

export default {
  name: 'app',
  data() {
    return {
      addons: [],
      downloadList: [],
      config: {},
      wowPath: "",
    }
  },
  created: function() {
    this.config = configControl.getConfig()
    if (this.validPath(this.config.wowPath)) {
      this.wowPath = this.config.wowPath
      this.checkAddons()
    }
  },
  methods: {
    selectPath: function() {
      let path = dialog.showOpenDialog({properties: ['openDirectory']})[0]
      if (this.validPath(path)) {
        this.wowPath = path
        this.updateWowPath()
      } else {
        alert("Invalid World of Warcraft Path")
      }
    },
    validPath: function(path) {
      if (path && fs.existsSync(path)) {
        let _path = path.toLowerCase()
        if (_path.indexOf("interface") > -1 && _path.indexOf("addons") > -1) {
          return true
        }
      }
      return false
    },
    checkAddons: function() {
      this.addons = []
      checkUpdateableAddons(this.wowPath).then(val => {
        for (let i in val) {
          if (this.updateable(val[i])) {
            val[i].status = "updateable"
          } else {
            val[i].status = "up-to-date"
          }
        }
        if (val.length == 0) {
          val = [{title: 'cannot find any addon'}]
        }
        this.addons = val
      })
    },
    updateWowPath: function() {
      if (this.validPath(this.wowPath)) {
        let configObj = {
          wowPath: this.wowPath,
        }
        configControl.setConfig(configObj)
        this.checkAddons()
      }
    },
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
        console.log("unzipping", fileName)
        unzip("./temp/" + fileName)
        addon.status = "updated"
      }).catch(err => {
        console.log(err)
        addon.status = "error"
      })
    },
    updateAll: function() {
      for (let i in this.addons) {
        if (this.addons[i].status == "updateable") {
            this.update(this.addons[i])
        }
      }
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
button, .button {
  cursor: pointer;
  align-items: flex-start;
  text-align: center;
  box-sizing: border-box;
  padding: 2px 6px 3px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonface;
}
</style>
