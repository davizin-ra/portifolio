<script setup lang="ts">
import Modal from '../../UI/modal.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const handleClose = () => {
  emit('update:isOpen', false)
}
</script>

<template>
  <Modal 
    titulo="Freelancer - Editor de Vídeo" 
    :isOpen="isOpen" 
    @update:isOpen="handleClose"
  >
    <div class="text-white p-6 space-y-6">
      <h1 class="text-3xl font-bold border-l-4 pl-4">Freelancer - Editor de Vídeo</h1>
      
      <div class="space-y-4">
        <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
          <h2 class="text-xl font-semibold">Projetos Realizados:</h2>
          <ul class="mt-2 space-y-2 text-gray-400">
            <li>• Edição de vídeos de gameplay para canal com 50k+ inscritos</li>
            <li>• Criação de thumbnails e motion graphics</li>
            <li>• Edição de vídeos narrativos com storytelling</li>
            <li>• Correção de cor e áudio profissional</li>
          </ul>
        </div>

        <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
          <h2 class="text-xl font-semibold">Ferramentas Utilizadas:</h2>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="px-3 py-1 bg-neutral-800 rounded-full text-sm">Adobe Premiere</span>
            <span class="px-3 py-1 bg-neutral-800 rounded-full text-sm">After Effects</span>
            <span class="px-3 py-1 bg-neutral-800 rounded-full text-sm">Adobe Ilustrator</span>
            <span class="px-3 py-1 bg-neutral-800 rounded-full text-sm">Adobe Photoshop</span>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>