<script setup lang="ts">
import PlaceCard from '@/components/PlaceCard.vue'
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import { config, getPlace } from '@/data/config'

const { venues } = config
const venueList = venues.placeIds.map((id) => getPlace(id))
</script>

<template>
  <section id="venues" class="scroll-section px-4 py-10">
    <div class="mx-auto max-w-[640px]">
      <AnimatedReveal
        preset="drift"
        tag="h2"
        class="text-center text-3xl font-semibold text-[var(--color-text)]"
      >
        {{ venues.title }}
      </AnimatedReveal>

      <div class="mt-8 space-y-6">
        <PlaceCard
          v-for="venue in venueList"
          :key="venue.name"
          :name="venue.name"
          :address="venue.address"
          :map-url="venue.mapUrl"
          :directions="'directions' in venue ? venue.directions : undefined"
          preset="drift"
          card-class="rounded-2xl border border-[var(--color-peach)]/60 bg-white/45 px-5 py-4"
        />
      </div>
    </div>
  </section>
</template>
