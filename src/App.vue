<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import HeroSection from '@/components/HeroSection.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import VenuesSection from '@/components/VenuesSection.vue'
import WhatToDoSection from '@/components/WhatToDoSection.vue'
</script>

<template>
  <div class="min-h-screen overflow-x-clip bg-[var(--color-page-bg)]">
    <HeroSection />
    <CountdownTimer />
    <TimelineSection />
    <WhatToDoSection />
    <VenuesSection />
    <AppFooter />
  </div>
</template>
