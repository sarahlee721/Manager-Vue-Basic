<template>
  <form class="wrap create-top mt-[30px] max-md:mt-[50px] max-w-[1200px] w-full mx-auto max-xl:w-[90%] max-sm:w-[100%]">
    <div class="flex justify-between items-end mb-2">
        <h2 class="h1-title font-normal paperlogy text-primaryPoint">공지사항</h2>
    </div>
    <div class="border-t-[2px] border-primaryPoint mb-5"></div>
    <div class="gap-x-0 gap-y-0 text-left max-xl:grid-cols-1 mx-auto max-sm:p-0 p-10 bg-[#FFFFFF]">
        <!-- Row Template -->
      
      <!-- 게시판명 -->
      <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[60px] flex items-center">
          <label class="width px-4 max-sm:px-2 text-[18px] after-small font-bold text-[#292929]">제목</label>
          <div class="flex-grow pt-2.5 font-semibold rounded-lg  text-semibold overflow-hidden whitespace-nowrap text-ellipsis truncate">
            {{ title }}
          </div>
      </div>
      <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
          <label
              class="width px-4 max-sm:px-2 text-[18px] after-small font-bold text-[#292929] whitespace-nowrap">등록일</label>
          <div class="flex-grow flex gap-0">
            {{ created_at }}
          </div>
      </div>
        <!-- 공지상태 -->
      <div class="px-2 bg-[#F9F9F9] border-b border-t border-[#EFEFEF] h-[60px] flex items-center">
          <label
              class="width px-4 max-sm:px-2 text-[18px] after-small font-bold text-[#292929] whitespace-nowrap">공지상태</label>
          <div class="flex-grow flex gap-0">
            {{ type }}
          </div>
      </div>

      <!-- 오픈상태 -->
      <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
          <label
              class="width px-4 max-sm:px-2 text-[18px] after-small font-bold text-[#292929] whitespace-nowrap">오픈상태</label>
          <div class="flex-grow flex gap-0">
            {{ status }}
          </div>
      </div>
      
      

        <!-- 내용 -->
        <div
            class="bg-[#F9F9F9] context-wrap px-2 flex items-center">
            <div class="context-label width max-sm:justify-start max-sm:w-full">
              <label class="px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929] flex items-center py-4 xl:hidden">
                내용
              </label>
            </div>
        </div>
        <div
          class="context-container max-xl:col-span-1 max-xl:flex max-xl:flex-col bg-[#F9F9F9] border-b border-[#EFEFEF] w-full grid grid-cols-6 p-2">
          <label
          class="tiny-mc col-span-1 px-4 max-sm:px-0 text-[18px] max-sm:text-[15px] font-bold text-[#292929] flex items-center py-4 max-xl:hidden">내용</label>
          <div class="col-span-5 bg-[#FFFFFF] border border-[#EFEFEF] rounded-xl overflow-y-auto flex items-start "
          style="min-height: 300px; max-height: 800px; height: 100%;">
            <!-- 여기에 내용이 들어갑니다 -->
            <div class="text-base leading-relaxed w-full flex-1 p-4" v-html="content"></div>
        </div>
      </div>


      <!-- 파일 -->
      <div class="file-container px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] flex items-center py-2">
        <label class="width px-4 py-2 max-sm:px-2 text-[18px] after-small font-bold text-[#292929] whitespace-nowrap">
          파일 
        </label>
          <ul id="fileList" class="flex flex-col justify-start space-y-1 text-sm text-gray-700 list-none">
            <li
              v-for="(file, index) in existingFiles"
              :key="file.id"
              class="flex items-center gap-2 px-3 py-2 text-[16px] bg-gray-100 border rounded-md hover:bg-gray-200 border-gray-300"
            >
              <a :href="file.url" target="_blank" class="underline text-blue-600 hover:text-blue-800">
                  {{ file.name }}
              </a>
            </li>
          </ul>
      </div>

        
    </div>
    <div class="border-t-[2px] border-primaryPoint mt-5"></div>
    <!-- 버튼 -->
    <div class="max-w-[1190px] container mt-[64px] mb-[50px] max-sm:mt-[20px] ">
      <div class="max-w-[576px] flex gap-2 items-center justify-center max-sm:justify-end mx-auto">
        <button type="button" @click="handleDelete"
            class="deleteButton bg-[#FFEFF1] hover:bg-[#FFDFE3] px-4 py-2.5 max-sm:px-2.5 rounded-lg flex items-center border border-red-400">
            <img src="/img/training-mgmt/delete.png" alt="삭제 아이콘" class="w-6 h-6"/>
            <span class="px-2 text-red-600 block max-lg:hidden">삭제하기</span>
        </button>
        <button type="button" @click="goToEdit"
            class="px-16 max-sm:px-6 py-2.5 text-white bg-primaryPoint rounded-[10px] hover:bg-[#648DDF]">
            수정하기
        </button>
        <button type="button" @click="cancel"
            class="px-16 max-sm:px-6 py-2.5 bg-[#EBEBEB] rounded-[10px] hover:bg-[#EBEBEB] border border-[#DBDEE3]">
            목록으로
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>

// definePageMeta({ middleware: 'auth' });

import { useState } from '#app'
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2'

const config = useRuntimeConfig() 
const token = useCookie('auth_token').value
const route = useRoute();
const router = useRouter();
const pageTitle = useState('pageTitle')

const title = ref('');
const content = ref('');
const status = ref('');
const type = ref('');
const created_at = ref('');
const existingFiles = ref([]);
const id = route.params.id;


// 🌐 API : 공지사항 정보 불러오기
async function fetchNoticeData() {
  const id = route.params.id;
  if (!id) {
    console.error('공지사항 ID가 없습니다.');
    return;
  }

  try {
    const { data, error } = await useFetch(`/api/admin/posts/${id}?board=notice`, {
      baseURL: config.public.backendUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (error.value) {
      Swal.fire('오류', '데이터를 불러오는데 실패했습니다.', 'error');
      return;
    }

    if (data.value && data.value.data) {
      const d = data.value.data;
      type.value = d.board === 'notice' && d.category === '중요' ? '중요' : '일반';
      status.value = d.public === 1 ? '공개' : '비공개';
      title.value = d.title || '';
      content.value = d.content || '';
      created_at.value = formatDate(d.created_at || '-');
      existingFiles.value = d.files || [];
    }
  } catch (e) {
    Swal.fire('오류', '데이터를 불러오는 중 문제가 발생했습니다.', 'error');
  }
}

// 🛠️ 기능 : 공지사항 수정하기 이동
const goToEdit = () => {
  router.push(`/board/notice/edit/${route.params.id}`)
}
// 🛠️ 기능 : 돌아가기 버튼
function cancel() {
  router.push('/board/notice')
}

// 날짜포맷 바꾸기
function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}


// 🌐 API : 삭제하기
const handleDelete = async () => {
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

    await $fetch(`/api/board/posts/${id}`, {
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
      text: `공지사항이 성공적으로 삭제되었습니다.`,
    });

    router.push('/board/notice')

  } catch (err) {
    console.error('❌ 삭제 오류 발생:', err);
    await Swal.fire({
      icon: 'error',
      title: '삭제 실패',
      text: err.message || '삭제 도중 오류가 발생했습니다.',
    });
  }
};

onMounted(async () => {
  pageTitle.value = '공지사항'
  const id = route.params.id
  await fetchNoticeData(id);
})

</script>

<style scoped>

.width {
  width: 17%; 
}
.file-container {
  grid-column: span 2 / span 2; 
}
.mob-br {
  display: none;
}
.context-wrap {
  grid-column: span 2 / span 2; 
}
.button-wrap {
  display: flex;
  width: 83.3333%;
  gap: 0.5rem;    
}
.context-container {
  grid-column: span 2 / span 2; 
  display: grid;          
  grid-template-columns: repeat(6, minmax(0, 1fr)); 
}
.context-label { 
  width: 16.666667%;
}
.tiny-mc { 
  grid-column: span 1 / span 1;
}
@media (max-width: 1280px) {
  .box {
    display: grid;
    grid-template-columns: 1fr;
  }
  .after-gray {
    background-color: #F9F9F9;
  }
  .after-white {
    background-color: #FFFFFF;
  }
  .wrap {
    width: 80%;
  }
  .context-wrap {
    grid-column: span 1 / span 1;
  }
  .context-container {
    grid-column: span 1 / span 1;   
    display: flex;                  
    flex-direction: column;     
    padding-top: 0;
  }
  .context-label {
    width: 38%; 
  }
  .width {
    width: 25%; 
  }
}

@media (max-width: 767px) {
  .mob-br {
    display: block;
  }
  .after-small {
    font-size: 16px;
  }
  .after-toosmall {
    font-size: 15px;
  }
  .box {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  label {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
  }
  .wrap {
    width: 100%;
  }
  .tighter {
    letter-spacing: -1px;
  } 
  .context-label {
    width: 30%; 
    justify-content: flex-start; 
  }
  .width {
    width: 30%; 
  }
}

</style>

