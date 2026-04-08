<script setup lang="ts">
import Modal from '../UI/modal.vue'
import SOSModal from './2l/SOS.vue'
import TCCModal from './2l/TCC.vue'
import SNModal from './2l/SN.vue'

defineProps<{
  isOpen: boolean
  modalStack: string[]
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  pushModal: [modalId: string]
  popModal: []
  replaceModal: [modalId: string]  // Novo evento para substituir
}>()

const handleClose = () => {
  emit('update:isOpen', false)
}

// Substitui o filho atual pelo novo
const openChildModal = (childName: string) => {
  console.log('ProjectsModal: substituindo por', childName)
  emit('replaceModal', childName)
}

const handleCloseChild = () => {
  emit('popModal')
}
</script>

<template>
  <div class="w-120">
    <Modal titulo="Projetos" :isOpen="isOpen" @update:isOpen="handleClose">
      <div class="text-white p-6 space-y-6">
        <h1 class="text-3xl font-bold border-l-4 pl-4">Projetos</h1>

        <div class="space-y-4">
          <div @click="openChildModal('sos')"
            class="bg-neutral-900 p-4 rounded-xl border border-neutral-700 cursor-pointer hover:bg-neutral-800 transition-colors">
            <h2 class="text-lg font-semibold">Sistema de Clínica</h2>
            <p class="text-gray-400">Gestão de pacientes e processos administrativos.</p>
          </div>

          <div @click="openChildModal('tcc')"
            class="bg-neutral-900 p-4 rounded-xl border border-neutral-700 cursor-pointer hover:bg-neutral-800 transition-colors">
            <h2 class="text-lg font-semibold">App de Treinos (TCC)</h2>
            <p class="text-gray-400">Foco em acessibilidade para pessoas com deficiência.</p>
          </div>

          <div @click="openChildModal('sn')"
            class="bg-neutral-900 p-4 rounded-xl border border-neutral-700 cursor-pointer hover:bg-neutral-800 transition-colors">
            <h2 class="text-lg font-semibold">Sistema de Notas</h2>
            <p class="text-gray-400">Interface web para registro de notas.</p>
          </div>
        </div>
      </div>
    </Modal>
  </div>
  <div class="ml-10 w-150 h-min">
    <SOSModal v-if="modalStack.includes('sos')" :isOpen="modalStack.includes('sos')"
      @update:isOpen="handleCloseChild" />

    <TCCModal v-if="modalStack.includes('tcc')" :isOpen="modalStack.includes('tcc')"
      @update:isOpen="handleCloseChild" />

    <SNModal v-if="modalStack.includes('sn')" :isOpen="modalStack.includes('sn')" @update:isOpen="handleCloseChild" />
  </div>
</template>