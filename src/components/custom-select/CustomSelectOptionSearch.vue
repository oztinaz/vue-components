<script setup lang="ts">
import StringInput from '@/components/inputs/StringInput.vue'

const searchQuery = defineModel<string>({
  required: true
})
</script>

<template>
  <div class="search">
    <StringInput placeholder="Search options" v-model="searchQuery" />
  </div>
</template>

<style scoped>
.search {
  border-bottom: 1px solid var(--c-extra-light-grey);
  padding: 10px;
}
</style>
