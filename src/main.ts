import { createApp } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import './style.css'

gsap.registerPlugin(ScrollTrigger)
// Не пересчитывать триггеры при смене адресной строки iOS (визуальный viewport)
ScrollTrigger.config({ ignoreMobileResize: true })

createApp(App).mount('#app')
