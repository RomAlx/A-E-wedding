<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import { config } from '@/data/config'

const { coupleDisplay, dateShort } = config
</script>

<template>
  <footer class="scroll-section px-4 py-10 text-center">
    <div class="mx-auto max-w-[640px] border-t border-[var(--color-peach)] pt-8">
      <AnimatedReveal
        preset="fade"
        tag="p"
        class="text-lg font-semibold text-[var(--color-text)]"
      >
        {{ coupleDisplay }} · {{ dateShort }}
      </AnimatedReveal>
      <AnimatedReveal
        preset="fade"
        tag="p"
        class="mt-4 text-sm text-[var(--color-text-muted)]"
      >
        with love ♥
      </AnimatedReveal>
    </div>
  </footer>
</template>
