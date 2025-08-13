<template>
  <!-- 사이드 메뉴 -->
  <div id="side-menu"
      ref="sideMenuInnerRef"
      class="fixed top-[64px] z-[600] overflow-y-auto scroll-hidden bg-[#FEFEFE] w-64 transition-transform duration-300 h-screen"
      :class="isSidemenuOpen ? 'translate-x-0' : '-translate-x-full'">
      <ul class="p-4 pb-24">
        <li class="py-1">
            <NuxtLink 
                to="/dashboard"
                id="dashboardLink"
                :class="['mainLink flex gap-3 px-4 py-3 rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929]', { focused: isDashboardMenuActive }]">
                <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 3H4C3.44772 3 3 3.44772 3 4V9C3 9.55228 3.44772 10 4 10H9C9.55228 10 10 9.55228 10 9V4C10 3.44772 9.55228 3 9 3Z"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round" />
                    <path
                        d="M20 3H15C14.4477 3 14 3.44772 14 4V9C14 9.55228 14.4477 10 15 10H20C20.5523 10 21 9.55228 21 9V4C21 3.44772 20.5523 3 20 3Z"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round" />
                    <path
                        d="M20 14H15C14.4477 14 14 14.4477 14 15V20C14 20.5523 14.4477 21 15 21H20C20.5523 21 21 20.5523 21 20V15C21 14.4477 20.5523 14 20 14Z"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round" />
                    <path
                        d="M9 14H4C3.44772 14 3 14.4477 3 15V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20V15C10 14.4477 9.55228 14 9 14Z"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round" />
                </svg>
                대시보드
            </NuxtLink>
        </li>
        <li class="py-1">
            <NuxtLink
                to="/guide"
                id="guideLink"
                :class="['mainLink flex gap-3 px-4 py-3 rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929]', { focused: isGuideMenuActive }]">
                <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 4H18C18.5304 4 19.0391 4.19901 19.4142 4.55324C19.7893 4.90748 20 5.38792 20 5.88889V19.1111C20 19.6121 19.7893 20.0925 19.4142 20.4468C19.0391 20.801 18.5304 21 18 21H6C5.46957 21 4.96086 20.801 4.58579 20.4468C4.21071 20.0925 4 19.6121 4 19.1111V5.88889C4 5.38792 4.21071 4.90748 4.58579 4.55324C4.96086 4.19901 5.46957 4 6 4H8"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M8.25 3H15.75C15.8881 3 16 3.11193 16 3.25V5.75C16 5.88807 15.8881 6 15.75 6H8.25C8.11193 6 8 5.88807 8 5.75V3.25C8 3.11193 8.11193 3 8.25 3Z"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M7 11H17" stroke="stroke-current" stroke-width="2" stroke-linecap="round" />
                    <path d="M7 15H17" stroke="stroke-current" stroke-width="2" stroke-linecap="round" />
                </svg>
                공모요강
            </NuxtLink>
        </li>
        <li class="py-1">
            <NuxtLink
                to="/proposer"
                id="proposerLink"
                :class="['mainLink flex gap-3 px-4 py-3 rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929]', { focused: isProposerMenuActive }]">
                <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17 21V19C17 17.9391 16.6313 16.9217 15.9749 16.1716C15.3185 15.4214 14.4283 15 13.5 15H6.5C5.57174 15 4.6815 15.4214 4.02513 16.1716C3.36875 16.9217 3 17.9391 3 19V21"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M10 11C12.2091 11 14 9.20914 14 7C14 4.79086 12.2091 3 10 3C7.79086 3 6 4.79086 6 7C6 9.20914 7.79086 11 10 11Z"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M22 20.9999V18.9999C21.9993 18.1136 21.7044 17.2527 21.1614 16.5522C20.6184 15.8517 19.8581 15.3515 19 15.1299"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M17 3.12988C17.8604 3.35018 18.623 3.85058 19.1676 4.55219C19.7122 5.2538 20.0078 6.11671 20.0078 7.00488C20.0078 7.89305 19.7122 8.75596 19.1676 9.45757C18.623 10.1592 17.8604 10.6596 17 10.8799"
                        stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                신청자
            </NuxtLink>
        </li>
        <li class="py-1 ">
            <NuxtLink
                to="/gallery"
                id="galleryLink"
                :class="['mainLink flex items-center gap-3 px-4 py-3 rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929]', { focused: isGalleryMenuActive }]">
                <svg class="subIconSvg ml-0.5 stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.28613 0.5H15.7139C17.8047 0.5 19.5 2.19534 19.5 4.28613V15.7139C19.5 17.8047 17.8047 19.5 15.7139 19.5H4.28613C2.19534 19.5 0.5 17.8047 0.5 15.7139V4.28613C0.5 2.19534 2.19534 0.5 4.28613 0.5ZM4.42871 10.7861C3.32454 10.7861 2.51174 11.2548 1.96777 11.7334C1.69551 11.973 1.49393 12.2136 1.36035 12.3926C1.34122 12.4182 1.32286 12.442 1.30664 12.4648L1.21387 12.5957V15.7139C1.21387 17.4102 2.58983 18.7861 4.28613 18.7861H15.7139C17.4102 18.7861 18.7861 17.4102 18.7861 15.7139V14.2842L18.0371 14.7129C17.9533 14.7609 17.866 14.8091 17.7754 14.8574C16.7785 15.3894 15.3623 15.9287 13.7139 15.9287C11.4804 15.9285 9.98988 14.5315 8.66309 13.2578C7.29709 11.9465 6.11636 10.7862 4.42871 10.7861ZM4.28613 1.21387C2.58983 1.21387 1.21387 2.58983 1.21387 4.28613V11.3369L1.99316 10.8145C2.60112 10.4067 3.40991 10.0713 4.42871 10.0713C6.3581 10.0714 7.71978 11.3558 8.97852 12.5693C9.03867 12.6273 9.09874 12.6851 9.1582 12.7422C10.508 14.038 11.804 15.2137 13.7139 15.2139C15.2082 15.2139 16.5077 14.7247 17.4395 14.2275C17.9039 13.9797 18.2732 13.7317 18.5254 13.5469C18.546 13.5318 18.566 13.5171 18.585 13.5029L18.7861 13.3525V4.28613C18.7861 2.58983 17.4102 1.21387 15.7139 1.21387H4.28613ZM13.7139 5.07129C15.1733 5.07129 16.3572 6.25445 16.3574 7.71387C16.3574 9.17348 15.1735 10.3574 13.7139 10.3574C12.2545 10.3572 11.0713 9.17334 11.0713 7.71387C11.0715 6.25459 12.2546 5.07152 13.7139 5.07129ZM13.7139 5.78613C12.6491 5.78636 11.7864 6.64908 11.7861 7.71387C11.7861 8.77885 12.6489 9.64235 13.7139 9.64258C14.779 9.64258 15.6426 8.77899 15.6426 7.71387C15.6424 6.64894 14.7788 5.78613 13.7139 5.78613Z" stroke="stroke-current" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                갤러리
            </NuxtLink>
        </li>

        <li class="py-1 relative group ">
          <!-- 관리자 게시판 항목 -->
          <a href="#" id="boardLink"
              :class="['mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] active:text-primaryPoint focus:text-primaryPoint', { focused: isBoardMenuActive }]"
              @click.prevent="toggleMenu('board')">
              <span class="flex items-center gap-3 text-inherit">
                <svg class="subIconSvg stroke-current ml-0.5" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.6277 10.4918C18.6277 10.1322 18.4848 9.78732 18.2306 9.53302C17.9763 9.27873 17.6314 9.13586 17.2717 9.13586H13.2038V10.4918H6.42391V9.13586H2.35598C1.99635 9.13586 1.65145 9.27873 1.39716 9.53302C1.14286 9.78732 1 10.1322 1 10.4918V14.5598C1 14.9194 1.14286 15.2643 1.39716 15.5186C1.65145 15.7729 1.99635 15.9158 2.35598 15.9158H17.2717C17.6314 15.9158 17.9763 15.7729 18.2306 15.5186C18.4848 15.2643 18.6277 14.9194 18.6277 14.5598V10.4918Z" stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.35597 5.06787H17.2717" stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.35597 1H17.2717" stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                게시판 관리
              </span>
              <img src="/img/down-arrow.png" alt="Arrow"
                  class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300" 
                  :class="{ 'rotate-180': activeMenuId === 'board' }" />
          </a>
          <!-- 서브 메뉴 (기본적으로 숨김) -->
          <ul
              class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
              :class="{ 'open': activeMenuId === 'board' }">
              <li>
                  <NuxtLink
                      to="/board/notice"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      공지사항
                  </NuxtLink>
              </li> 
              <li>
                  <NuxtLink
                      to="/board/faq"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      FAQ
                  </NuxtLink>
              </li>
          </ul>
        </li>
        <li class="py-1 relative group">
            <!-- 설정 항목 -->
            <a href="#" id="siteLink"
                :class="['mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] active:text-primaryPoint focus:text-primaryPoint', { focused: isSiteMenuActive }]"
                @click.prevent="toggleMenu('site')"
                >
                <span class="flex items-center gap-3 text-inherit">
                    <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V15" stroke="stroke-current" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M2 7H22" stroke="stroke-current" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 5.01013L5.01 4.99902" stroke="stroke-current" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 5.01013L8.01 4.99902" stroke="stroke-current" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 5.01013L11.01 4.99902" stroke="stroke-current" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0822 18.3651C22.576 18.6689 22.5457 19.4082 22.0371 19.4658L19.4705 19.7568L18.3193 22.0691C18.0911 22.5273 17.386 22.3029 17.2695 21.735L16.0142 15.619C15.9157 15.139 16.3471 14.837 16.7644 15.0937L22.0822 18.3651Z" stroke="stroke-current" stroke-width="1.5"/>
                    </svg>
                    사이트 관리
                </span>
                <img src="/img/down-arrow.png" alt="Arrow"
                    class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300"
                    :class="{ 'rotate-180': activeMenuId === 'site' }" />
            </a>
            <!-- 서브 메뉴 (기본적으로 숨김) -->
            <ul
                class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
                :class="{ 'open': activeMenuId === 'site' }">
                <li>
                    <NuxtLink
                        to="/site/video"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        홍보영상
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/site/sponsor"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        후원사
                    </NuxtLink>
                </li>
            </ul>
        </li>
        <li class="py-1 relative group mb-10">
            <!-- 설정 항목 -->
            <a href="#" id="settingLink"
                :class="['mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] active:text-primaryPoint focus:text-primaryPoint', { focused: isSettingMenuActive }]"
                @click.prevent="toggleMenu('setting')"
                >
                <span class="flex items-center gap-3 text-inherit">
                    <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.887 12.5308L21.243 13.7383C21.4934 13.9473 21.6607 14.239 21.7146 14.5606C21.7685 14.8823 21.7055 15.2126 21.537 15.4918L19.902 18.2848C19.7751 18.4986 19.594 18.6751 19.377 18.7963C19.1574 18.9178 18.9109 18.9823 18.66 18.9838C18.5043 18.9848 18.3494 18.9615 18.201 18.9148L16.4655 18.3418C16.1615 18.5368 15.8455 18.7113 15.5175 18.8653L15.153 20.6248C15.0855 20.9485 14.9053 21.2377 14.6445 21.4408C14.3803 21.6476 14.0528 21.7568 13.7175 21.7498H10.332C9.99658 21.7568 9.6691 21.6476 9.40496 21.4408C9.14468 21.2374 8.96502 20.9483 8.89796 20.6248L8.53196 18.8653C8.20826 18.7093 7.89419 18.5339 7.59146 18.3403L5.84996 18.9148C5.70146 18.9615 5.54661 18.9848 5.39096 18.9838C5.14055 18.982 4.89457 18.9176 4.67546 18.7963C4.45862 18.6755 4.27751 18.4996 4.15046 18.2863L2.45696 15.4918C2.2809 15.2101 2.21363 14.8738 2.26775 14.5461C2.32187 14.2183 2.49368 13.9215 2.75096 13.7113L4.10546 11.9998V11.4688L2.74946 10.2613C2.49905 10.0524 2.33174 9.76065 2.27781 9.43901C2.22388 9.11736 2.2869 8.78703 2.45546 8.50782L4.14896 5.71482C4.27581 5.50102 4.45693 5.32456 4.67396 5.20332C4.89307 5.08208 5.13905 5.01762 5.38946 5.01582C5.54371 5.00609 5.69853 5.02026 5.84846 5.05782L7.55546 5.65782C7.86046 5.46282 8.17646 5.28832 8.50346 5.13432L8.86946 3.37482C8.93652 3.05138 9.11618 2.76222 9.37646 2.55882C9.6406 2.35204 9.96808 2.24288 10.3035 2.24982H13.6605C13.9958 2.24288 14.3233 2.35204 14.5875 2.55882C14.85 2.76432 15.03 3.05382 15.0945 3.37482L15.4605 5.13432C15.7855 5.28932 16.099 5.46432 16.401 5.65932L18.144 5.08632C18.3374 5.02339 18.5418 5.0013 18.7442 5.02144C18.9467 5.04158 19.1427 5.10351 19.32 5.20332C19.5375 5.32632 19.7175 5.50332 19.845 5.71332L21.537 8.50782C21.7154 8.78716 21.7861 9.12187 21.7358 9.4495C21.6856 9.77713 21.5179 10.0753 21.264 10.2883L19.887 11.4613V12.5308Z"
                            stroke="stroke-current" stroke-width="2" />
                        <path
                            d="M15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75C11.0054 15.75 10.0516 15.3549 9.34835 14.6517C8.64509 13.9484 8.25 12.9946 8.25 12C8.25 11.0054 8.64509 10.0516 9.34835 9.34835C10.0516 8.64509 11.0054 8.25 12 8.25C12.9946 8.25 13.9484 8.64509 14.6517 9.34835C15.3549 10.0516 15.75 11.0054 15.75 12Z"
                            stroke="stroke-current" stroke-width="2" />
                    </svg>
                    설정
                </span>
                <img src="/img/down-arrow.png" alt="Arrow"
                    class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300" 
                    :class="{ 'rotate-180': activeMenuId === 'setting'}"/>
            </a>
            <!-- 서브 메뉴 (기본적으로 숨김) -->
            <ul
                class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
                :class="{ 'open': activeMenuId === 'setting' }">
                <li>
                    <NuxtLink
                        to="/setting/role"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        관리자권한 관리
                    </NuxtLink>
                </li>
            </ul>
        </li>
      </ul>
  </div>
</template>

<script setup>


// ✅ 사이드 메뉴 전체의 열림/닫힘 상태 (prop으로 받음)
const props = defineProps({
    isSidemenuOpen: Boolean,
})
const emit = defineEmits(['close'])

const sideMenuInnerRef = ref(null)
    defineExpose({
    sideMenuEl: sideMenuInnerRef
})

// 바깥 클릭 시 실행할 함수
const handleClickOutside = (event) => {
    console.log('click outside triggered', event)
    if (props.isSidemenuOpen) {
        emit('close')
    }
}
// ✅ 서브 메뉴 열림/닫힘 설정
const activeMenuId = ref(null);
const route = useRoute(); // 현재 라우트 객체

// 모든 메인 메뉴의 토글을 처리하는 단일 함수
const toggleMenu = (menuId) => {
    if (activeMenuId.value === menuId) {
        // 이미 열려있는 메뉴를 다시 클릭하면 닫습니다.
        activeMenuId.value = null;
    } else {
        // 다른 메뉴를 클릭하면 해당 메뉴를 열고, 기존 메뉴는 닫힙니다.
        activeMenuId.value = menuId;
    }
};


// --- 각 메인 메뉴의 활성화 상태를 판단하는 computed 속성들 ---
// 대시보드 활성화 상태 (수정됨)
const isDashboardMenuActive = computed(() => {
    // activeMenuId가 명시적으로 설정된 경우, 해당 메뉴만 활성화
    if (activeMenuId.value) {
        return activeMenuId.value === 'dashboard';
    }
    // activeMenuId가 null인 경우, 현재 경로로 판단
        return route.path === '/dashboard' || route.path.startsWith('/dashboard/');
});

// '공모요강' 메뉴를 위한 활성화
const isGuideMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'guide';
    }
    return route.path.startsWith('/guide');
});

// '신청자' 메뉴를 위한 활성화
const isProposerMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'proposer';
    }
    return route.path.startsWith('/proposer');
});

// '공모요강' 메뉴를 위한 활성화
const isGalleryMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'gallery';
    }
    return route.path.startsWith('/gallery');
});


// '게시판 관리' 메뉴를 위한 활성화 
const isBoardMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'board';
    }
    return route.path.startsWith('/board');
});

// '사이트 관리' 메뉴를 위한 활성화 
const isSiteMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'site';
    }
    return route.path.startsWith('/site');
});

// '설정' 메뉴를 위한 활성화 
const isSettingMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'setting';
    }
    return route.path.startsWith('/setting');
});


// --- 라우트 변경 감지 및 자동 메뉴 열림 처리 ---
watch(() => route.path, (newPath) => {
    if (newPath.startsWith('/proposer')) {
        activeMenuId.value = 'proposer';
    } else if (newPath.startsWith('/guide')) {
      activeMenuId.value = 'guide';
    } else if (newPath.startsWith('/gallery')) {
      activeMenuId.value = 'gallery';
    } else if (newPath.startsWith('/dashboard')) {
        activeMenuId.value = 'dashboard';
    } else if (newPath.startsWith('/board')) {
        activeMenuId.value = 'board';
    } else if (newPath.startsWith('/site')) {
        activeMenuId.value = 'site';
    } else if (newPath.startsWith('/setting')) {
        activeMenuId.value = 'setting';
    } else {
        activeMenuId.value = null;
    }
}, { immediate: true });


</script>

<style scoped>
    .subUl {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
    }

    .subUl.open {
      max-height: 550px;
      padding-top: 0.25rem; 
      padding-bottom: 0.25rem;
    }

    .mainLink.focused {
      color: var(--color-primaryPoint);;
    }
    .mainLink.focused .subIconSvg {
      stroke: var(--color-primaryPoint);
    }
    .mainLink:hover {
      color: var(--color-primaryPoint);
    }
    .mainLink:hover .subIconSvg{
      stroke: var(--color-primaryPoint);
    }
    .mainLink .subIconSvg {
      /* SVG의 stroke를 직접 CSS 변수로 설정 */
      stroke: var(--default-color, #727272);
    }

    .rotate-180 {
      transform: rotate(180deg);
    }

    /* NuxtLink의 활성화된 클래스에 대한 스타일 */
    /* 현재 라우트와 정확히 일치할 때 적용 */
    .sub-link-exact-active {
      color: var(--color-primaryPoint); /* 서브메뉴 글자색 */
      background-color:  var(--color-primaryBg);
    }
    /* 현재 라우트의 상위 경로일 때 적용 (선택 사항) */
    /* 예를 들어, /train/manage 에 있을 때 /train 링크도 활성화되게 할 경우 */
    .sub-link-active {
      color: var(--color-primaryPoint);;
    }
    
</style>