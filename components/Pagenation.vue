<template>
  <div class="pagenation flex justify-center items-center mt-4">
    <div class="flex items-center gap-4">
        <!-- 이전 버튼 -->
      <button @click="goToPrev" :disabled="currentPage === 1"
        class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed">
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 max-sm:w-3 max-sm:h-3 fill-[#727272] group-hover:fill-primaryPoint">
            <path
                d="M0.68629 9.89949L10.5858 19.799L12 18.3848L3.51471 9.8995L12 1.41421L10.5858 -6.18172e-08L0.68629 9.89949Z" />
        </svg>
        <span class="group-hover:text-primaryPoint group-hover:font-semibold ml-2 max-sm:hidden">이전</span>
      </button>

      <!-- 페이지 번호들 -->
      <div class="flex gap-4 small-gap">
        <button 
        v-for="page in visiblePages" 
        :key="page" 
        @click="handlePageClick(page, $event)" 
        :class="[
            'w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center font-medium rounded-md',
            currentPage === page
                ? 'bg-primaryPoint text-primaryBg'
                : 'text-[#727272] hover:bg-primaryPoint hover:text-primaryBg focus:bg-primaryPoint focus:text-primaryBg'
        ]">
            {{ page }}
        </button>
      </div>

      <!-- 다음 버튼 -->
      <button @click="goToNext" :disabled="currentPage === totalPages"
        class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed">
        <span class=" group-hover:text-primaryPoint group-hover:font-semibold mr-2 max-sm:hidden">다음</span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 max-sm:w-3 max-sm:h-3 fill-[#727272] group-hover:fill-primaryPoint">
            <path
                d="M11.3137 10.1005L1.41423 0.201019L2.07232e-05 1.61523L8.48529 10.1005L1.68643e-08 18.5858L1.41421 20L11.3137 10.1005Z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>


const windowWidth = ref(0)

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})
const emit = defineEmits(['update:currentPage'])

const handlePageClick = (page, event) => {
  if (page !== props.currentPage) {
    emit('update:currentPage', page)
  }
  // 버튼 포커스 제거 (👈 이게 핵심!)
  event.currentTarget.blur()
}

const goToPrev = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const goToNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
  }
}

onMounted(() => {
  // 브라우저 환경에서만 실행됨
  windowWidth.value = window.innerWidth

  const onResize = () => {
    windowWidth.value = window.innerWidth
  }

  window.addEventListener('resize', onResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
})

// maxVisible 을 너비에 따라 다르게 설정
const maxVisible = computed(() => (windowWidth.value <= 786 ? 5 : 10))

// 최대 10개까지만 표시
const visiblePages = computed(() => {
  const pages = []
  const maxVis = maxVisible.value
  const start = Math.floor((props.currentPage - 1) / maxVis) * maxVis + 1
  const end = Math.min(start + maxVis - 1, props.totalPages)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>

<style scoped>
  .pagenation{
      margin-top: 100px;
  }

  @media (max-width: 1024px) {
    .small-gap{
      gap: 2px;
    }
  }
</style>