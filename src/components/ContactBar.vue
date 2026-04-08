<script setup lang="ts">
import { Github, Linkedin } from 'lucide-vue-next'
</script>

<template>
  <div class="fixed bottom-5 right-10 z-50">
    <div class="flex gap-4 items-center">
      <span class="text-white">
        daviramos1703@gmail.com
      </span>
      <div>
        <a href="https://github.com/davizin-ra" target="_blank">
          <Github class="w-6 h-6 text-white hover:text-gray-300" />
        </a>
      </div>

      <a href="https://www.linkedin.com/in/daviratt/" target="_blank">
        <Linkedin class="w-6 h-6 text-white hover:text-gray-300" />
      </a>
    </div>
  </div>
</template>
