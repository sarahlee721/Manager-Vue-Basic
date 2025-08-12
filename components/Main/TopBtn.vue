<template>
    <button id="topButton"
        class="font-bold fixed bottom-5 right-5 bg-[#FEFEFE] border border-[#EFEFEF] text-primaryPoint p-4 rounded-lg shadow-lg hover:bg-primaryBg transition-all z-[800]"
        @click="scrollToTop">
        TOP
    </button>
</template>

<script setup>

let scrollContainer = null

const scrollToTop = () => {
    if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const checkScroll = () => {
    if (scrollContainer) {
        isVisible.value = scrollContainer.scrollTop > 300
    } else {
        isVisible.value = window.scrollY > 300
    }
}



</script>