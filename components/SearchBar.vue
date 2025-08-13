<template>
    <div class="search-wrap flex justify-between">
    <input
        :placeholder="placeholder"
        v-model="inputValue" 
        @input="onInput"   
        @keyup.enter="handleSearch"
        class="search-input bg-[#FEFEFE] placeholder-[#AFAFAF] 
        border border-[#B0B0B0] focus:outline-none focus:border-primaryPoint
        px-4 py-3 rounded-[8px] w-full max-lg:max-w-[800px]
        max-sm:rounded-tr-none max-sm:rounded-br-none "
    />
    <button
        @click="handleSearch"
        class="bg-primaryPoint py-2 px-4 max-sm:py-1 max-sm:px-2 rounded-lg hover:bg-primary500 focus:outline-none
        max-sm:rounded-tl-none max-sm:rounded-bl-none"
    >
        <img
        src="../assets/img/search.png"
        alt="검색 아이콘"
        class="hidden max-sm:block h-8 w-8 object-contain box-content"
        />
        <span class="text-[#EDF3FF] max-sm:hidden whitespace-nowrap">검색</span>
    </button>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        placeholder: {
            type: String,
            default: '제목을 검색하세요',
        },
        modelValue: {
            type: String,
            default: '',
        }
    })

    const emit = defineEmits(['search', 'update:modelValue'])

    const inputValue = ref(props.modelValue)

    // props.modelValue가 바뀌면 inputValue 업데이트 (optional)
    watch(() => props.modelValue, (newVal) => {
        inputValue.value = newVal
    })

    // onInput에서 바로 emit 하지 말고 내부 상태만 변경
    function onInput(event) {
        inputValue.value = event.target.value;
        emit('update:modelValue', inputValue.value);
    }

    // 엔터키 또는 버튼 클릭 시에만 검색 이벤트 발생
    function handleSearch() {
        emit('search', inputValue.value)
    }
</script>

<style scoped>
.search-input {
        width: 100%;
}
.search-wrap {
    gap: 0.4rem;
}

/* max-xl: px-5 (1.25rem = 20px) */
@media (max-width: 639.9px) {
    .search-input {
        height: 50px;
        border-top-right-radius: 0px ;
        border-bottom-right-radius: 0px;
    }
    .search-wrap {
        gap: 0px;
    }
}

</style>
