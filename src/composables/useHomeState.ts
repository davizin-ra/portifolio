import { ref } from 'vue'

export type Section = 'home' | 'desktop'

export function useHomeState() {
  const currentSection = ref<Section>('home')
  const currentModal = ref<string | null>(null)

  const openModal = (name: string) => {
    currentModal.value = name
  }

  const closeModal = (name: string) => {
    if (currentModal.value === name) {
      currentModal.value = null
    }
  }

  const closeAllModals = () => {
    currentModal.value = null
  }

  const goToSection = (section: Section) => {
    currentSection.value = section
  }

  const isModalOpen = (modalName: string) => {
    return currentModal.value === modalName
  }

  return {
    currentSection,
    currentModal,
    openModal,
    closeModal,
    closeAllModals,
    goToSection,
    isModalOpen
  }
}
