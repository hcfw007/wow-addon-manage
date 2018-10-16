<template>
  <div>
    <select name="category" id="category" v-model="category">
      <option value="loading" selected disabled style="display: none">Loading...</option>
      <option v-for="item in categories" v-bind:key="item.name">
    </select>
  </div>
</template>
<script>
export default {
  name: 'AddonList',
  data() {
    return {
      category: 'loading',
      categories: []
    }
  },
  
}
</script>
<style scoped>

</style>

