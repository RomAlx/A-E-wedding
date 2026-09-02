<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import MapsAddress from '@/components/MapsAddress.vue'
import MapsButton from '@/components/MapsButton.vue'
import type { RevealPreset } from '@/components/AnimatedReveal.vue'

withDefaults(
  defineProps<{
    name: string
    address: string
    mapUrl: string
    /** Заметка (кофейни) или «Как добраться» (адреса) */
    note?: string
    directions?: string
    preset?: RevealPreset
    cardClass?: string
  }>(),
  {
    preset: 'rise',
  },
)
</script>

<template>
  <AnimatedReveal
    :preset="preset"
    tag="article"
    :class="cardClass"
  >
    <h3 class="text-lg font-semibold text-[var(--color-text)] sm:text-xl">
      {{ name }}
    </h3>
    <MapsAddress :href="mapUrl" class="mt-1 block text-base">
      {{ address }}
    </MapsAddress>
    <p
      v-if="note"
      class="mt-2 text-sm text-[var(--color-text-muted)]"
    >
      {{ note }}
    </p>
    <p
      v-if="directions"
      class="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
    >
      {{ directions }}
    </p>
    <MapsButton :href="mapUrl" class="mt-3" />
  </AnimatedReveal>
</template>
