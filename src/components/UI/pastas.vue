<script setup>
import { Folder } from 'lucide-vue-next'

const props = defineProps({
  icon: {
    type: Object,
    default: Folder
  },
  filled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="pasta mb-5 gap-2 group cursor-pointer w-30">
    <component 
      :is="icon"
      size="50"
      class="transition-colors duration-200 text-white group-hover:text-gray-300"
      :fill="filled ? 'currentColor' : 'none'"
      :stroke="filled ? 'none' : 'currentColor'"
    />
    <slot />
  </div>
</template>