import { onMounted, onUnmounted } from "vue";
import Lenis from "@studio-freight/lenis";

export function useLenisScroll() {
  let lenis: Lenis | null = null;

  onMounted(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let locked = false;
    let lastScrollPosition = 0;
    let scrollThreshold = 50;
    let isSnapping = false;

    const secondSection = document.getElementById("second");
    if (!secondSection) return;

    lenis.on("scroll", ({ scroll, direction }: { scroll: number; direction: number }) => {
      if (locked || isSnapping) return;

      const screen = window.innerHeight;
      const scrollDelta = Math.abs(scroll - lastScrollPosition);

      if (scrollDelta < scrollThreshold) return;

      // scroll pra baixo
      if (direction === 1 && scroll < screen * 0.5) {
        locked = true;
        isSnapping = true;

        lenis?.scrollTo(secondSection, { duration: 1.2 });

        setTimeout(() => {
          locked = false;
          isSnapping = false;
        }, 1300);
      }

      // scroll pra cima
      if (direction === -1 && scroll > screen * 0.5 && scroll < screen * 1.2) {
        locked = true;
        isSnapping = true;

        lenis?.scrollTo(0, { duration: 1.2 });

        setTimeout(() => {
          locked = false;
          isSnapping = false;
        }, 1300);
      }

      lastScrollPosition = scroll;
    });
  });

  onUnmounted(() => {
    lenis?.destroy();
  });
}