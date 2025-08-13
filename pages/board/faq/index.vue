<template>
  <div class="pt-5 pb-5">
    <div class="wrap">
      <div class="w-full gap-2 flex justify-end">
        <div class="left-content flex justify-end text-lg space-x-2 ">
          <button @click="goToCreate"
              class="bg-[#EDF3FF] text-[#2B5BBB] text-[18px] max-sm:text-sm max-sm:py-2.5 max-sm:px-4 px-6 py-2 rounded-lg hover:bg-[#D3E1FB] border border-[#2B5BBB] focus:outline-none whitespace-nowrap">
              등록하기
          </button> 
        </div>
        <!-- right-content (탭들) -->
        <div class="right-content flex justify-end text-lg max-2xl:space-x-1 space-x-2">
          <div
              class=" flex justify-between items-center space-x-2 max-lg:gap-2 max-lg:w-full">
              <SearchBar
                placeholder="제목을 입력하세요."
                v-model="tempSearchQuery"
                @search="applySearch"
              />
          </div>
        </div>
      </div>
      <div class="w-full mt-5">
        <div class="overflow-x-auto">
          <div class="min-w-[1000px]">
              <!-- 테이블 헤더 부분 -->
            <table class="w-full rounded-[12px] text-center bg-[#Fefefe] drop-shadow ">
                <thead>
                    <tr class="text-[18px] h-[60px]">
                        <th class="px-2 py-2 font-semibold w-[10%]">번호</th>
                        <th class="px-2 py-2 font-semibold w-[10%]">구분</th>
                        <th class="px-2 py-2 font-semibold w-[10%]">공개여부</th>
                        <th class="px-2 py-2 font-semibold w-[30%]">제목</th>
                        <th class="px-2 py-2 font-semibold w-[10%]">조회수</th>
                        <th class="px-2 py-2 font-semibold w-[15%]">수정일</th>
                        <th class="px-2 py-2 font-semibold w-[15%]">관리</th>
                    </tr>
                </thead>
            </table>

            <!-- 테이블 본문 부분 -->
            <table id="reportTable" class="table-fixed w-full rounded-[12px] overflow-hidden text-center mt-4 bg-[#FEFEFE]">
              <tbody>
                <tr
                  v-for="(post, index) in posts"
                  :key="post.id"
                  class="bg-[#FEFEFE] h-[80px] border-b border-gray-200"
                >
                  <td class="px-2 py-2 w-[10%] text-[#727272]">{{ totalItems - ((currentPage - 1) * itemsPerPage + index) }}</td>
                  <td class="px-2 py-2 w-[10%] text-[#727272]">{{ post.category || '' }}</td>
                  <td class="w-[10%] text-[#2B5BBB]">{{ post.public === 1 ? '공개' : '비공개' }}</td>
                  <td class="w-[30%] text-[#2B5BBB]">
                    <RouterLink
                      :to="`/admin/faq/view/${post.id}`"
                      class="font-semibold hover:underline text-[#2B5BBB]"
                    >
                      {{ post.title }}
                    </RouterLink>
                  </td>
                  <td class="px-2 py-2 w-[10%] text-[#727272]">{{ post.view_count }}</td>
                  <td class="w-[15%] text-[#2B5BBB]">{{ formatDate(post.updated_at) }}</td>
                  <td class="px-2 py-2 w-[15%]">
                    <div class="flex justify-center gap-2 px-2">
                      <BtnEdit :to="`/admin/faq/edit/${post.id}`" />
                      <BtnDiscard @click="() => handleDelete(post)"/>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagenation
        :key="currentPage + '-' + totalPages + '-' + searchQuery"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>

definePageMeta({ middleware: 'auth' });

import { useState, useFetch } from '#app';
import { useCookie } from '#imports';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const config = useRuntimeConfig() 
const token = useCookie('auth_token').value
const route = useRoute();
const router = useRouter();
const pageTitle = useState('pageTitle')

// 검색기능
const tempSearchQuery = ref('')
const searchQuery = ref('');

// 연수일정 데이터 배열
const posts = ref([])  

// 페이지네이션
const currentPage = ref(1); 
const totalItems = ref(0);
const itemsPerPage = ref(15);

// 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value) || 1
})

// 날짜포맷 바꾸기
function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}



// 🌐 API : 공지사항 리스트 불러오기
async function fetchPostList() {
  const params = {
    page: currentPage.value || 1,
    board: 'qna'
  };
  if (searchQuery.value) {
    params['filter[search]'] = searchQuery.value;
  }

  try {
    const data = await $fetch('/api/admin/posts', {   
      baseURL: config.public.backendUrl,
      method: 'GET',
      query: params,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    // 받아온 데이터 처리 (예시)
    posts.value = data.data ?? [];
    totalItems.value = data.meta?.total ?? 0;
    itemsPerPage.value = data.meta?.per_page ?? 15;

  } catch (error) {
    console.error('자주묻는질문 목록 불러오기 실패:', error);
  }
}



// 🌐 API : 삭제하기
const handleDelete = async (posts) => {
  const id = posts?.id;
  if (!id) return;

  try {
    const result = await Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '삭제 후에는 복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '예, 삭제합니다',
      cancelButtonText: '아니오',
    });

    if (!result.isConfirmed) return;

    await $fetch(`/api/admin/posts/${id}`, {
      baseURL: config.public.backendUrl,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    await Swal.fire({
      icon: 'success',
      title: '삭제 완료',
      text: `자주묻는질문이 성공적으로 삭제되었습니다.`,
    });

    await fetchPostList();
    currentPage.value = 1;


  } catch (err) {
    console.error('❌ 삭제 오류 발생:', err);
    await Swal.fire({
      icon: 'error',
      title: '삭제 실패',
      text: err.message || '삭제 도중 오류가 발생했습니다.',
    });
  }
};


// 🛠️ 기능 : 검색하기 버튼
function applySearch(searchText) {
  searchQuery.value = searchText.trim();
  currentPage.value = 1;

  router.replace({
    path: '/admin/faq',
    query: {
      'filter[search]': searchQuery.value || undefined,
      page: currentPage.value,
    }
  });
}


// 🛠️ 기능 : 페이지 변경
function handlePageChange(page) {
  if (currentPage.value === page) return;

  currentPage.value = page;
  router.push({
    path: '/admin/faq',
    query: {
      'filter[search]': searchQuery.value || undefined,
      page: currentPage.value.toString(),
    }
  });
  // fetchPostList();
  
}

// 🛠️ 기능 : 공지사항 등록하기 이동
const goToCreate = () => {
  router.push('/admin/faq/create'); 
}



watch(
  () => route.query,
  (newQuery) => {
    searchQuery.value = newQuery['filter[search]'] ? String(newQuery['filter[search]']) : '';
    tempSearchQuery.value = searchQuery.value;

    const newPage = Number(newQuery.page) || 1;
    if (currentPage.value !== newPage) {
      currentPage.value = newPage;
    }

    fetchPostList();
  },
  { immediate: true }
);

onMounted(async () => {
  pageTitle.value = '자주묻는질문'
  fetchPostList();
})

</script>