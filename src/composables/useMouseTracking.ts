import { ref, computed, onMounted } from 'vue'

export function useMouseTracking() {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const targetX = ref(0)
  const targetY = ref(0)
  const isInside = ref(false)

  const lerp = (start: number, end: number, t: number) => {
    return start + (end - start) * t
  }

  const handleMove = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    targetX.value = e.clientX - rect.left
    targetY.value = e.clientY - rect.top
    isInside.value = true
  }

  const handleLeave = () => {
    isInside.value = false
  }

  const animate = () => {
    mouseX.value = lerp(mouseX.value, targetX.value, 0.15)
    mouseY.value = lerp(mouseY.value, targetY.value, 0.15)
    requestAnimationFrame(animate)
  }

  const maskStyle = computed(() => {
    const radius = isInside.value ? 100 : 0

    return {
      WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mouseX.value}px ${mouseY.value}px, black 60%, transparent 100%)`,
      maskImage: `radial-gradient(circle ${radius}px at ${mouseX.value}px ${mouseY.value}px, black 60%, transparent 100%)`,
    }
  })

  onMounted(() => {
    animate()
  })

  return {
    handleMove,
    handleLeave,
    maskStyle
  }
}
