<template>
  <div class="relative z-[110]">
    <nav class="bg-white">
        <div class="bg-white w-full mx-auto fixed">
            <div class="flex justify-between items-center h-16">
                <!-- 왼쪽 영역 -->
                <div class="w-64 pr-36 max-2xl:pr-4 max-2xl:w-40 max-sm:w-36 flex justify-start h-16 items-center gap-2 max-xl:gap-1 max-sm:pr-2 pl-8 max-xl:pl-4">
                    <ul>
                        <li class="flex flex-col items-center">
                            <!-- 스위치 -->
                            <span 
                            class="switch w-11 h-5 bg-gray-300 rounded-full relative cursor-pointer transition-all duration-300"
                            :class="isSidemenuOpen ? 'bg-primaryPoint' : 'bg-gray-300'"
                            @click="$emit('toggle-sidemenu')">
                                <span 
                                    class="dot absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300"
                                    :class="isSidemenuOpen ? 'translate-x-6.5' : 'translate-x-0.5'">
                                </span>
                            </span>
                        </li>
                    </ul>
                    <div class="font-bold text-center text-primaryPoint bg-primaryBg text-lg rounded-[15px] px-3 py-0.5">lms</div>
                </div>

                <!-- 오른쪽 영역 -->
                <div class="flex justify-between items-center w-full">
                    <div class="flex items-center"> 
                        <h1 class="title font-normal paperlogy text-primaryPoint max-md:font-normal rounded-lg pl-6 h1-title max-xl:pl-0 max-sm:text-[20px] tracking-tighter">{{ pageTitle }}</h1>
                    </div>
                    <!-- pc전용 배너 -->
                    <div class="my-div relative flex items-center max-lg:justify-end w-[460px] h-10 border border-[2px] border-gray-200 rounded-xl bg-white banner-border max-md:hidden px-3 justify-between ">
                        <!-- pc전용 문구 변화 -->
                        <div class="flex-1 overflow-hidden z-[700]">
                            <div class="w-full h-full flex items-center banner-container ">
                                <!-- 1. 최근댄스화 주문 -->
                                <div
                                    v-for="(item, idx) in bannerItems"
                                    :key="idx"
                                    class="w-full banner-text text-sm font-semibold transition-opacity duration-500"
                                    :class="{
                                    'opacity-100': idx === currentBannerIndex,
                                    'opacity-0 hidden': idx !== currentBannerIndex
                                    }"
                                >
                                    <div :class="item.user ? 'grid-cols-custom01' : 'grid-cols-no-user'"> 
                                        <span class="text-sm font-semibold truncate">{{ item.date }}<span class="time text-sm font-semibold max-xl:hidden"> | {{ item.time }}</span></span> 
                                        <span class="text-sm font-semibold truncate">{{ item.label }}</span> 
                                        <span class="text-sm text-primaryPoint font-semibold truncate">{{ item.value }}</span> 
                                        <span class="text-sm font-semibold max-xl:hidden truncate" v-if="item.user">{{ item.user }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- 드롭다운 -->
                        <div class="relative flex-shrink-0">
                            <button @click="toggleDropdown" id="dropdownButton" class="text-[13px] text-gray-400 pr-2 max-xl:pr-0">▼</button>
                            <ul 
                                v-show="dropdownOpen" 
                                id="dropdownMenu"
                                class="my-div absolute right-[-14px] max-xl:top-[32px] w-[100%] w-[460px] bg-white z-10 xl:mt-1 bg-white border border-[2px] rounded-xl shadow-lg">
                                <!-- 공통 스타일: grid 4col -->
                                <li v-for="(item, idx) in bannerItems" :key="idx" class="px-4 py-2 hover:bg-[#E7F0FD] cursor-pointer sm:px-4">
                                    <NuxtLink :to="item.link">
                                        <div :class="item.user ? 'grid-cols-custom02' : 'grid-cols-no-user'">
                                            <span class="text-sm font-semibold col-span-1 whitespace-nowrap truncate ">
                                                {{ item.date }} 
                                                <span class="time text-sm font-semibold max-xl:hidden truncate">
                                                    | {{ item.time }}
                                                </span>
                                            </span>
                                            <span class="text-sm font-semibold col-span-1 truncate">{{ item.label }}</span>
                                            <span class="text-sm text-primaryPoint font-semibold col-span-1 truncate">{{ item.value }}</span>
                                            <span class="text-sm font-semibold col-span-1 max-xl:hidden truncate" v-if="item.user" >{{ item.user }}</span>
                                        </div>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 오른쪽 버튼 -->
                    <div 
                    id="right-button" 
                    class="flex gap-2 pr-8 max-xl:pr-4 max-sm:gap-0 items-center">
                        <button 
                            v-if="isLoggedIn"
                            @click="handleLogout" 
                            class="text-sm max-lg:px-3 px-5 py-2.5 text-white bg-primaryPoint rounded-lg hover:bg-[#1E4799] transition lg:block hidden whitespace-nowrap">
                            로그아웃
                        </button>
                        <button @click="$router.back()"
                            v-if="isLoggedIn"
                            class="text-sm max-lg:px-3 px-5 py-2.5 text-[#292929] bg-[#F5F5F5] rounded-lg hover:bg-[#ECECEC] transition-all lg:block hidden whitespace-nowrap">
                            뒤로가기
                        </button>
                        <NuxtLink
                          to="https://newsspiritart.kr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-sm max-lg:px-3 px-5 py-2.5 text-[#292929] bg-[#F5F5F5] rounded-lg hover:bg-[#ECECEC] transition-all lg:block hidden whitespace-nowrap"
                        >
                          홈페이지로 가기
                        </NuxtLink>
                        <NuxtLink 
                            v-if="isLoggedIn" 
                            @click="handleLogout"
                            class="lg:hidden block">
                            <svg width="24" class="w-7 h-7"  height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" alt="로그아웃">
                                <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#292929"/>
                            </svg>
                        </NuxtLink>
                        <NuxtLink to="https://newsspiritart.kr/" class="lg:hidden block">
                            <svg width="24" class="w-7 h-7" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" alt="홈페이지">
                                <path d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z" fill="#292929"/>
                            </svg>
                        </NuxtLink>
                    </div>  
                </div>
            </div>
        </div>
    </nav>
    <!-- 모바일 전용 배너 -->
    <div 
    v-if="visible"
    id="mobile-banner" 
    class="fixed top-[64px] z-[1000] md:hidden w-full bg-primary500 text-white text-sm text-center py-2 px-4 left-0 shadow-md transition-all duration-300 h-[35px]"
    >          
      <div class="relative w-full h-full">
      <!-- <div class="banner-container flex transition-transform duration-300 ease-in-out"> -->
        <div class="banner-container absolute top-0 left-0 w-full h-full flex items-center transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${currentBannerIndex * 100}%)` }">
            <!-- 여기부터 모바일배너 아이템 시작 -->
          <div class="banner-container absolute top-0 left-0 w-full h-full flex items-center transition-transform duration-300 ease-in-out">
            <div            
            v-for="(item, index) in bannerItems"
            :key="index"
            class="banner-item text-white flex-shrink-0 w-full truncate overflow-hidden whitespace-nowrap`">   
              <NuxtLink :to="item.link" class="text-sm"><!-- 댄스화 주문/조회관리 페이지 이동 -->
                <span class="date text-white text-sm truncate">{{ item.date }}</span>
                <span class="text-white text-sm pl-1 truncate">{{ item.label }} | </span>
                <span class="product-name text-white text-sm truncate" v-if="item.value">{{ item.value }}</span>
                <span class="user-name text-white text-sm pl-1 truncate" v-if="item.user">{{ item.user }}</span> 
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="relative w-full h-full">
          <!-- ✕ 버튼 추가 -->
          <button @click="closeBanner" class="absolute left-0 top-1/2 -translate-y-1/2 text-[13px] text-white pl-4 z-[1001]">
          ✕
          </button>
      
          <!-- ▼ 버튼은 오른쪽 -->
          <button class="absolute right-0 top-1/2 -translate-y-1/2 text-[13px] text-white pr-4"
              @click="toggleDropdown" >
              {{ dropdownVisible ? '▲' : '▼' }}
          </button>
        </div>
      </div>
      <!-- 드롭다운 배너 영역 -->
      <div 
        id="mobile-banner-dropdown" 
        class="absolute left-0 w-screen bg-primary500 border-blue-400 mt-1 overflow-hidden transition-all duration-500 ease-in-out"
        :class="{
          'max-h-0 opacity-0': !dropdownVisible,
          'max-h-[300px] opacity-100': dropdownVisible
          }"
        >
      <!-- 배너 내용 -->
        <div 
          v-for="(item, index) in bannerItems"
          :key="`dropdown-${index}`"
          class="banner-item flex-shrink-0 py-1 w-full">
          <NuxtLink :to="item.link" class="text-sm flex items-center justify-center truncate overflow-hidden whitespace-nowrap">
            <span>
              <span class="date text-white text-sm">{{ item.date }}</span>
              <span class="pl-1 text-white text-sm">{{ item.label }} | </span>
              <span v-if="item.value" class="product-name text-white text-sm">{{ item.value }}</span>
              <span v-if="item.user" class="user-name text-white text-sm pl-1">{{ item.user }}</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


// import { useRoute } from 'vue-router';
// import { useAuth } from '../../composables/useAuth'
// import { useCookie } from '#imports';


// const config = useRuntimeConfig() 
// const token = useCookie('auth_token').value
// const auth = await useAuth()
const route = useRoute();

const isLoggedIn = ref(true); 

const isLoginPage = computed(() => route.path === '/');

const dropdownOpen = ref(false)
const currentBannerIndex = ref(0)
let intervalId = null
const visible = ref(true);
const dropdownVisible = ref(false); 

// const bannerItems = ref([])  // 빈 배열로 초기화

// props 정의
const props = defineProps({
  pageTitle: {
    type: String,
    required: true,
    default: '관리자', 
  },
  isSidemenuOpen: { 
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle-sidemenu'])



const toggleDropdown = () => {
  if (window.innerWidth <= 768) { // 모바일
    dropdownVisible.value = !dropdownVisible.value;
  } else { // PC
    dropdownOpen.value = !dropdownOpen.value;
  }
}


// function handleLogout() {
//   auth.logout()
// }


function onClickOutside(event) {
  // PC 드롭다운 요소들
  const dropdownEl = document.getElementById('dropdownMenu')
  const dropdownBtnEl = document.getElementById('dropdownButton')
  
  // 모바일 드롭다운 요소들 (실제 HTML ID와 일치)
  const mobileBannerEl = document.getElementById('mobile-banner')
  const mobileDropdownEl = document.getElementById('mobile-banner-dropdown')
  
  // 모바일과 PC 드롭다운 모두 체크
  const isAnyDropdownOpen = dropdownOpen.value || dropdownVisible.value;

  if (isAnyDropdownOpen) {
    let shouldClose = true;
    
    // PC 드롭다운이 열려있는 경우
    if (dropdownOpen.value && dropdownEl && dropdownBtnEl) {
        if (dropdownEl.contains(event.target) || dropdownBtnEl.contains(event.target)) {
            shouldClose = false;
        }
    }
    
    // 모바일 드롭다운이 열려있는 경우
    if (dropdownVisible.value && mobileBannerEl) {
        if (mobileBannerEl.contains(event.target)) {
            shouldClose = false;
        }
    }
    
    if (shouldClose) {
        dropdownOpen.value = false
        dropdownVisible.value = false
    }
  }
}

onMounted(() => {
    document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', onClickOutside)
})

const bannerItems = ref([
{
    date: '25.01.06',
    time: '00:03:19',
    label: '최근 댄스화 주문',
    value: '연습화 240',
    user: '김일번',
    link: '/admin/shoes',
},
{
    date: '25.01.06',
    time: '00:03:19',
    label: '최근 수강 입금자',
    value: '라틴2종 파티대비A',
    user: '김이번',
    link: '/student',
},
{
    date: '25.01.06',
    time: '00:03:19',
    label: '신규 가입자',
    value: '교원',
    user: '김삼번',
    link: '/user',
},
{
    date: '25.01.06',
    time: '00:03:19',
    label: '최근 공지사항',
    value: '홈페이지 리뉴얼 관련 안내',
    user: '김사번',
    link: '/admin/notice',
},
])




const closeBanner = () => {
    visible.value = false;
    dropdownOpen.value = false; 
    dropdownVisible.value = false;
};

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  fetchBannerItems()

  intervalId = setInterval(() => {
      currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerItems.value.length
  }, 4000)
})


onUnmounted(() => {
    clearInterval(intervalId)
})

// API에서 데이터 가져와서 가공해 bannerItems에 세팅
async function fetchBannerItems() {
  try {
    // const response = await $fetch('/api/admin/dashboard', {
    //   baseURL: config.public.backendUrl,
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    if (!response.result) {
      console.error('대시보드 API 실패:', response);
      return;
    }

    const dashboard = response.data;

    // payment 배열에서 가장 최근(생성일 기준) 데이터 추출
    const latestPayment = dashboard.payment
      ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    // shoes 배열에서 가장 최근 데이터 추출
    const latestShoe = dashboard.shoes
      ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    // notice 배열에서 가장 최근 데이터 추출
    const latestNotice = dashboard.notice
      ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    // users 배열에서 가장 최근 데이터 추출
    const latestUser = dashboard.users
      ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    bannerItems.value = [
      latestPayment ? {
        date: formatDate(latestPayment.created_at, 'YY.MM.DD'),
        time: formatDate(latestPayment.created_at, 'HH:mm:ss'),
        label: '최근 수강 입금자',
        value: latestPayment.course_name || '',
        user: latestPayment.name || '',
        link: '/student',
      } : null,

      latestShoe ? {
        date: formatDate(latestShoe.created_at, 'YY.MM.DD'),
        time: formatDate(latestShoe.created_at, 'HH:mm:ss'),
        label: '최근 댄스화 주문',
        value: latestShoe.title || '',
        user: latestShoe.name || '',
        link: '/admin/shoes',
      } : null,

      latestUser ? {
        date: formatDate(latestUser.created_at, 'YY.MM.DD'),
        time: formatDate(latestUser.created_at, 'HH:mm:ss'),
        label: '신규 가입자',
        value: latestUser.office_id === null ? '일반' : '교원',
        user: latestUser.name || '',
        link: '/user',
      } : null,

      latestNotice ? {
        date: formatDate(latestNotice.created_at, 'YY.MM.DD'),
        time: formatDate(latestNotice.created_at, 'HH:mm:ss'),
        label: '최근 공지사항',
        value: latestNotice.title || '',
        user: '',  // 공지사항에 작성자 필드가 없으니 빈 문자열로
        link: '/admin/notice',
      } : null,
    ].filter(Boolean);

  } catch(e) {
    console.error('배너 데이터 호출 실패', e)
  }
}


// 날짜 포맷 함수 (간단 예시, 라이브러리로 대체 가능)
function formatDate(dateStr, format) {
  const d = new Date(dateStr)
  if (format === 'YY.MM.DD') {
    return d.toISOString().slice(2, 10).replace(/-/g, '.')
  } else if (format === 'HH:mm:ss') {
    return d.toTimeString().slice(0,8)
  }
  return dateStr
}



</script>

<style scoped>
#mobile-banner-dropdown {
  transition: max-height 0.3s ease-in-out;
}
.my-div {
  width: 530px;
}
/* 화면 1535px 이하일 때 */
@media (max-width: 1535px) {
  .my-div {
      width: 500px;
  }
}

/* 화면 1279px 이하일 때 */
@media (max-width: 1279px) {
  .my-div {
      width: 400px;
  }
}

/* 기본 4컬럼 그리드 */
.grid-cols-custom01 {
    display: grid;
    grid-template-columns: 31% 26% 31% 12%;
}    
.grid-cols-custom02 {
    display: grid;
    grid-template-columns: 30% 25% 30% 15%;
}
.grid-cols-no-user {
    display: grid;
    grid-template-columns: 30% 25% 45%;
}

/* 화면 너비 1280px 이하일 때 (max-xl) */
@media (max-width: 1279px) {
  .grid-cols-custom01{
      grid-template-columns: 24% 36% 37% 0%;
  }
  .grid-cols-custom02 {
      grid-template-columns: 22% 36% 38% 0%;
  }
}

@media (max-width: 479.9px) {
  .title {
      font-size: 21px;
      letter-spacing: -1px;
  }
}
</style>