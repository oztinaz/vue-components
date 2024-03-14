<script setup lang="ts"></script>

<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<style scoped>
.content {
  background: white;
  border: 1px solid var(--c-grey);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 150px;
  padding: 10px 15px;
}
</style>
