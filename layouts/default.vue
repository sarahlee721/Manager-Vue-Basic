<template>
  <div id="scroll-container" class="bg-[#F7F7F7] overflow-auto">
    <MainHeader 
        :pageTitle="pageTitle" 
        :isSidemenuOpen="isSidemenuOpen"
        @toggle-sidemenu="toggleSidemenu"/>
    <MainSidemenu   
        v-if="hasClientRendered && !hideLayout"
        :isSidemenuOpen="isSidemenuOpen" 
        :ref="el => {
          if (el?.sideMenuEl?.value) {
            sideMenuRef.value = el.sideMenuEl.value
          }
        }"
        @close="isSidemenuOpen = false"/>
    <div 
        v-if="hasClientRendered"
        id="main-content" 
        class="ml-64 z-[500] max-xl:ml-0 transition-all duration-300 max-w-[1520px]"
        :class="isSidemenuOpen ? 'ml-64' : 'mx-auto'">
        <div class="w-full min-h-screen px-6 pt-[70px] pb-[100px]">
            <NuxtPage />
        </div>
    </div>
    <MainTopBtn/>
  </div>
</template> 

<script setup>

import { useState } from '#app'

const isSidemenuOpen = ref(false)
const hasClientRendered = ref(false)
const pageTitle = useState('pageTitle')
const sideMenuRef = ref(null)
const hideLayout = ref(false)

function updateMenuState() {
  if (hideLayout.value) {
      // 로그인(관리자) 페이지면 무조건 닫힘
      isSidemenuOpen.value = false
      return
  }

  // 로그인 페이지가 아니면 화면 너비에 따라 열고 닫음
  if (window.innerWidth <= 1280) {
      isSidemenuOpen.value = false
  } else {
      isSidemenuOpen.value = true
  }
}

function toggleSidemenu() {
  if (hideLayout.value) return  
  isSidemenuOpen.value = !isSidemenuOpen.value
}


onMounted(() => {
  hasClientRendered.value = true

  if (!pageTitle.value) {
    pageTitle.value = '관리자';
  }
  nextTick(() => {
    updateMenuState()
  })
  updateMenuState()
  window.addEventListener('resize', updateMenuState)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMenuState)
})


</script>

<style scoped>

  /* max-md: 화면 너비가 767.98px 이하일 때 */
  @media (max-width: 767.98px) {
      #main-content {
          padding-top: 30px;
      }
  }
</style>