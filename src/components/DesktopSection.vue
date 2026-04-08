<script setup lang="ts">
import { Trash2, Folder, FileText, Users } from 'lucide-vue-next'
import Pasta from './UI/pastas.vue'
import EducationModal from './modals/EducationModal.vue'
import ExperienceModal from './modals/ExperienceModal.vue'
import ProjectsModal from './modals/ProjectsModal.vue'
import ContactModal from './modals/ContactModal.vue'

const emit = defineEmits<{
  goHome: []
  openModal: [name: string]
  closeModal: [name: string]
  pushModal: [name: string]
  popModal: []
  replaceModal: [name: string]
}>()

defineProps<{
  currentModal: string | null
  mainModal: string | null
  modalStack: string[]
}>()

const handleOpenModal = (name: string) => {
  console.log('DesktopSection: abrindo modal', name)
  emit('openModal', name)
}

const handleCloseModal = (name: string) => {
  console.log('DesktopSection: fechando modal', name)
  emit('closeModal', name)
}
</script>

<template>
  <div class="min-h-screen text-white p-10">
    <h1 class="text-5xl font-bold border-l-8 pl-5 mb-6">
      Desktop Kali 1.0.9a - DaviDev
    </h1>

    <div
      class="bg-[url('../assets/images/wpp.png')] bg-cover flex bg-center h-[70vh] w-auto mr-50 ml-50 mt-20 border-2 border-white pl-10 pt-10">
      <div>
        <Pasta :icon="Trash2" @click="$emit('goHome')">Lixeira</Pasta>
        <Pasta :icon="Folder" @click="handleOpenModal('modal1')" :filled="true">Educação</Pasta>
        <Pasta :icon="Folder" @click="handleOpenModal('modal2')" :filled="true">Experiência</Pasta>
        <Pasta :icon="Folder" @click="handleOpenModal('modal3')" :filled="true">Projetos</Pasta>
        <a href="/CurriculoDaviRamos.pdf" download>
          <Pasta :icon="FileText">Curriculo.pdf</Pasta>
        </a>
        <Pasta :icon="Users" @click="handleOpenModal('modal4')">Contatos</Pasta>
      </div>

      <!-- Educação Modal (normal) -->
      <EducationModal 
        v-if="mainModal === 'modal1'" 
        :isOpen="mainModal === 'modal1'"
        @update:isOpen="handleCloseModal('modal1')" 
      />

      <!-- Experience Modal (pode empilhar) -->
      <ExperienceModal 
        v-if="mainModal === 'modal2'" 
        :isOpen="mainModal === 'modal2'"
        :modalStack="modalStack"
        @update:isOpen="handleCloseModal('modal2')"
        @pushModal="(name) => emit('pushModal', name)"
        @popModal="() => emit('popModal')"
      />

      <!-- Projects Modal (pode substituir filhos) -->
      <ProjectsModal 
        v-if="mainModal === 'modal3'" 
        :isOpen="mainModal === 'modal3'"
        :modalStack="modalStack"
        @update:isOpen="handleCloseModal('modal3')"
        @pushModal="(name) => emit('pushModal', name)"
        @popModal="() => emit('popModal')"
        @replaceModal="(name) => emit('replaceModal', name)"
      />

      <!-- Contatos Modal (normal) -->
      <ContactModal 
        v-if="mainModal === 'modal4'" 
        :isOpen="mainModal === 'modal4'"
        @update:isOpen="handleCloseModal('modal4')" 
      />
    </div>
  </div>
</template>