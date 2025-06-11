import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { ArtlogoVueUIKit } from '@artlogo-co/ui-kit'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(ArtlogoVueUIKit({
    tusEndpoint: import.meta.env.VITE_TUS_ENDPOINT || '',
  }))
})