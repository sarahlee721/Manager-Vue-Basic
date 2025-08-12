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
        <li class="py-1 relative group">
            <!-- 연수 항목 -->
            <a href="#" id="trainingLink"
                :class="['mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] active:text-primaryPoint focus:text-primaryPoint', { focused: isTrainingMenuActive }]"
                @click.prevent="toggleMenu('training')"
                >
                <span class="flex items-center gap-3 text-inherit">
                    <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.1791 3.48399C18.489 3.1741 18.9093 3 19.3476 3C19.7858 3 20.2061 3.1741 20.516 3.48399C20.8259 3.79388 21 4.21418 21 4.65243C21 5.09068 20.8259 5.51099 20.516 5.82088L13.1159 13.221L10 14L10.779 10.8841L18.1791 3.48399Z"
                            stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7 17.1968H16" stroke="stroke-current" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M10 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12"
                            stroke="stroke-current" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    연수
                </span>
                <img src="/img/down-arrow.png" alt="Arrow"
                    class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300" 
                    :class="{ 'rotate-180': activeMenuId === 'training' }" />
            </a>
            <!-- 서브 메뉴 (기본적으로 숨김) -->
            <ul class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0   overflow-hidden transition-all duration-300 ease-in-out"
                :class="{ 'open': activeMenuId === 'training' }">
                <li>
                    <NuxtLink
                        to="/training/manage"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        연수관리
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/training/end"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        종료된 연수
                    </NuxtLink>
                </li>
            </ul>
        </li>
        <li class="py-1 relative group">
            <!-- 수강자관리 항목 -->
            <a href="#" id="studentLink"
                :class="['mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] active:text-primaryPoint focus:text-primaryPoint', { focused: isStudentMenuActive }]"
                @click.prevent="toggleMenu('student')">
                <span class="flex items-center gap-3 text-inherit">
                    <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18 21V19C18 17.9391 17.5786 16.9217 16.8284 16.1716C16.0783 15.4214 15.0609 15 14 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21"
                            stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M10.5 11C12.7091 11 14.5 9.20914 14.5 7C14.5 4.79086 12.7091 3 10.5 3C8.29086 3 6.5 4.79086 6.5 7C6.5 9.20914 8.29086 11 10.5 11Z"
                            stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 11.5L19 13L22 9" stroke="stroke-current" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    수강자
                </span>
                <img src="/img/down-arrow.png" alt="Arrow"
                    class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300" 
                    :class="{ 'rotate-180': activeMenuId === 'student' }" />
            </a>
            <!-- 서브 메뉴 (기본적으로 숨김) -->
            <ul class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
                :class="{ 'open': activeMenuId === 'student' }">
                <li>
                    <NuxtLink
                        to="/student"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        수강자 입금관리
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/student/record"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        과정 출석부
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/student/statistics"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active"
                        >수강인원통계
                    </NuxtLink>
                </li>
            </ul>
        </li>
        <li class="py-1 relative group">
            <!-- 수료자 항목 -->
            <a href="#" id="graduateLink"
                :class="['mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] active:text-primaryPoint focus:text-primaryPoint', { focused: isGraduateMenuActive }]"
                @click.prevent="toggleMenu('graduate')"
                >
                <span class="flex items-center gap-3 text-inherit">
                    <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                            stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.21 14.0088L7 22L12 19.3684L17 22L15.79 14" stroke="stroke-current"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    수료자
                </span>
                <img src="/img/down-arrow.png" alt="Arrow"
                    class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300"
                    :class="{ 'rotate-180': activeMenuId === 'graduate' }">
            </a>
            <!-- 서브 메뉴 (기본적으로 숨김) -->
            <ul
                class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
                :class="{ 'open': activeMenuId === 'graduate' }">
                <li>
                    <NuxtLink
                        to="/graduate"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active" >
                        수료자 관리
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/graduate/report"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        수료자 보고서
                    </NuxtLink>
                </li>
            </ul>
        </li> 
        <!-- <li class="py-1 relative group "> -->
            <!-- 자격관리 항목 -->
            <!-- <a href="#" id="licenseLink"
                class="mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] focus:text-primaryPoint active:text-primaryPoint"
                onclick="toggleSubMenu(event)">
                <span class="flex items-center gap-3 text-inherit">
                    <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L21 5" stroke="stroke-current" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                            stroke="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    자격관리
                </span>
                <img src="/img/down-arrow.png" alt="Arrow"
                    class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300" />
            </a> -->
            <!-- 서브 메뉴 (기본적으로 숨김) -->
            <!-- <ul
                class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                <li>
                    <a href="license-regist.html"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]">자격등록</a>
                </li>
                <li>
                    <a href="license-pay.html"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]">자격입금관리</a>
                </li>
                <li>
                    <a href="license-record.html"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]">자격출석부</a>
                </li>
                <li>
                    <a href="license-notice.html"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]">합격공지</a>
                </li>
                <li>
                    <a href="license-check.html"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]">자격증조회</a>
                </li>
            </ul>
        </li> -->
        <li class="py-1 relative group ">
          <!-- 관리자 게시판 항목 -->
          <a href="#" id="adminLink"
              :class="['mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] active:text-primaryPoint focus:text-primaryPoint', { focused: isAdminMenuActive }]"
              @click.prevent="toggleMenu('admin')">
              <span class="flex items-center gap-3 text-inherit">
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
                  게시판 관리
              </span>
              <img src="/img/down-arrow.png" alt="Arrow"
                  class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300" 
                  :class="{ 'rotate-180': activeMenuId === 'admin' }" />
          </a>
          <!-- 서브 메뉴 (기본적으로 숨김) -->
          <ul
              class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
              :class="{ 'open': activeMenuId === 'admin' }">
              <li>
                  <NuxtLink
                      to="/admin/notice"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      공지사항
                  </NuxtLink>
              </li> 
              <li>
                  <NuxtLink
                      to="/admin/faq"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      자주묻는 질문
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink
                      to="/admin/shoes"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      댄스화 주문관리
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink
                      to="/admin/teacher"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      강사소개
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink
                      to="/admin/location"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      연수장소
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink
                      to="/admin/trainsch"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      연수일정
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink
                      to="/admin/traindata"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      연수자료실
                  </NuxtLink>
              </li>
              
              <!-- <li>
                  <NuxtLink
                      to="/admin/qna"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      Q&A
                  </NuxtLink>
              </li> -->
              
              <!-- <li>
                  <NuxtLink
                      to="/admin/job"
                      class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]"
                      active-class="sub-link-active"
                      exact-active-class="sub-link-exact-active">
                      구인・구직
                  </NuxtLink>
              </li> -->
          </ul>
        </li>
        <!-- <li class="py-1 relative group "> -->
            <!-- 문자관리 항목 -->
            <!-- <a href="#" id="snsLink"
                class="mainLink flex justify-between items-center px-4 py-3 block rounded-lg text-[#727272] hover:bg-primaryBg hover:text-[#292929] active:text-primaryPoint focus:text-primaryPoint"
                onclick="toggleSubMenu(event)">
                <span class="flex items-center gap-3 text-inherit">
                    <svg class="subIconSvg stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 5H20C20.5477 5 21 5.45228 21 6V18C21 18.5477 20.5477 19 20 19H4C3.45228 19 3 18.5477 3 18V6C3 5.45228 3.45228 5 4 5Z"
                            stroke="stroke-current" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M21 6L12 13L3 6" stroke="stroke-current" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    문자관리
                </span>
                <img src="/img/down-arrow.png" alt="Arrow"
                    class="subIcon w-4 h-4 ml-2 transform transition-transform duration-300" />
            </a> -->
            <!-- 서브 메뉴 (기본적으로 숨김) -->
            <!-- <ul
                class="subUl bg-[#F9F9F9] px-2 mt-0 space-y-1 max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                <li>
                    <a href="sns-group.html"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]">문자
                        그룹</a>
                </li>
                <li>
                    <a href="sns-send.html"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]">문자
                        보내기</a>
                </li>
                <li>
                    <a href="sns-log.html"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]">문자
                        기록</a>
                </li>
            </ul> -->
        <!-- </li> -->
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
                        to="/site/slider"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        슬라이드 관리자
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/site/photo"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        이미지 콘텐츠 관리
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/site/popup"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        팝업관리
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/site/video"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        영상관리
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
                        to="/setting/chats"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active" >
                        운영자 소통
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/setting/log"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
                        active-class="sub-link-active"
                        exact-active-class="sub-link-exact-active">
                        로그인 로그
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/setting/role"
                        class="block px-8 py-3 rounded-lg text-[#727272] text-sm hover:bg-primaryBg focus:text-[#1E4799]]"
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

// '회원' 메뉴를 위한 활성화
const isProposerMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'proposer';
    }
    return route.path.startsWith('/proposer');
});

// '연수' 메뉴를 위한 활성화 
const isTrainingMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'training';
    }
    return route.path.startsWith('/training');
});

// '수강자' 메뉴를 위한 활성화 
const isStudentMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'student';
    }
    return route.path.startsWith('/student');
});

// '수료자' 메뉴를 위한 활성화 
const isGraduateMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'graduate';
    }
    return route.path.startsWith('/graduate');
});

// '게시판 관리' 메뉴를 위한 활성화 
const isAdminMenuActive = computed(() => {
    if (activeMenuId.value) {
        return activeMenuId.value === 'admin';
    }
    return route.path.startsWith('/admin');
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
    if (newPath.startsWith('/training')) {
        activeMenuId.value = 'training';
    } else if (newPath.startsWith('/proposer')) {
        activeMenuId.value = 'proposer';
    } else if (newPath.startsWith('/dashboard')) {
        activeMenuId.value = 'dashboard';
    } else if (newPath.startsWith('/student')) {
        activeMenuId.value = 'student';
    } else if (newPath.startsWith('/graduate')) {
        activeMenuId.value = 'graduate';
    } else if (newPath.startsWith('/admin')) {
        activeMenuId.value = 'admin';
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
      stroke: var(--color-primaryPoint);;
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
      color: var(--color-primaryPoint);; /* 서브메뉴 글자색 */
      background-color: #EDF3FF;
    }
    /* 현재 라우트의 상위 경로일 때 적용 (선택 사항) */
    /* 예를 들어, /train/manage 에 있을 때 /train 링크도 활성화되게 할 경우 */
    .sub-link-active {
      color: var(--color-primaryPoint);;
    }
    
</style>