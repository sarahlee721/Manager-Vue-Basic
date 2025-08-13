<template>
  <form class="wrap create-top mt-[30px] max-w-[1200px] w-full mx-auto max-xl:w-[90%] max-sm:w-[100%]">
    <div class="flex justify-between items-end mb-2">
        <h2 class="h1-title font-normal paperlogy">자주묻는질문 수정하기</h2>
    </div>
    <div class="border-t-[2px] border-[#2B5BBB] mb-5"></div>
    <div class="box gap-x-0 gap-y-0 text-left max-xl:grid-cols-1 mx-auto max-sm:p-0 p-10 bg-[#FFFFFF]">
    <!-- Row Template -->
    <!-- 공개여부 -->
    <div class=" px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] flex items-center">
        <label
            class="w-1/3 px-4 max-sm:px-2 text-[18px] after-small font-bold text-[#292929]">오픈상태</label>
        <div class="w-2/3 flex gap-0 py-1.5">
            <input v-model="status" type="radio" name="post" id="open" value="공개"
                class="hidden peer/open" />
            <label for="open" class="flex-1 text-center cursor-pointer px-4 py-2 text-[18px] after-small border 
                    border-[#B5B5B5] text-[#B5B5B5] bg-[#F3F3F3] 
                    peer-checked/open:bg-[#EDF3FF] peer-checked/open:text-[#2B5BBB] peer-checked/open:border-[#2B5BBB]
                    rounded-l-lg">
                    공개
            </label>
            <input v-model="status" type="radio" name="post" id="close" value="비공개"
                class="hidden peer/close" />
            <label for="close" class="flex-1 text-center cursor-pointer px-4 py-2 text-[18px] after-small border-t border-b border-r 
                    border-[#B5B5B5] text-[#B5B5B5] bg-[#F3F3F3] 
                    peer-checked/close:bg-[#EDF3FF] peer-checked/close:text-[#2B5BBB] peer-checked/close:border-[#2B5BBB]
                    rounded-r-lg">
                    비공개
            </label>
        </div>
    </div>
    
    <!-- 게시판명 -->
    <div class=" px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] flex items-center py-2">
        <label class="w-1/3 px-4 max-sm:px-2 text-[18px] after-small font-bold text-[#292929]">제목</label>
        <input type="text" v-model="title"  placeholder="제목을 입력하세요"
        :class="[
              'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
              title ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
              ]"/>
    </div>
    <!-- 카테고리 -->
    <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] flex items-center">
      <label class="w-1/3 block px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
        카테고리
      </label>
      <div class="w-2/3 py-2">
        <DropUser class="w-full"
              :options="categoryOptions"
              v-model="category"
          />
      </div>
    </div>
    <!-- 내용 -->
    <div
        class="bg-[#F9F9F9] context-wrap px-2 flex items-center">
        <div class="context-label w-1/6 max-xl:w-1/4 max-sm:justify-start max-sm:w-full">
          <label class="px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929] flex items-center py-4 xl:hidden">
            내용
          </label>
        </div>
    </div>
    <div
        class="context-container col-span-2 max-xl:col-span-1 max-xl:flex max-xl:flex-col px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[500px] w-full grid grid-cols-6 p-2">
        <label
            class="tiny-mc col-span-1 px-4 max-sm:px-0 text-[18px] max-sm:text-[15px] font-bold text-[#292929] flex items-center py-4 max-xl:hidden">내용</label>
        <div class="h-full w-full col-span-5">
            <TinyEditor v-model="content" />
        </div>
    </div>


    <!-- 파일 -->
    <div class="context-wrap px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] flex items-center py-2 col-span-2 max-xl:col-span-1">
        <label class="w-[18%] max-xl:w-1/6 px-4 max-sm:px-2 text-[18px] after-small font-bold text-[#292929]">파일</label>
        <div class="flex items-end space-x-2 w-full ">
            <ul id="fileList" class="space-y-1 text-sm text-gray-700 ml-2 ">
              <li
                v-for="(file, index) in existingFiles"
                :key="'existing-' + index"
                class="flex justify-between items-center px-2 py-1 text-[12px] bg-gray-100 border border-gray-300 rounded-md"
              >
                <a :href="file.url" target="_blank" class="underline text-blue-600 hover:text-blue-800">
                  {{ file.name }}
                </a>
                <button
                  type="button"
                  @click="removeExistingFile(index)"
                  class="text-red-500 ml-2 text-[20px] font-bold"
                >
                  ×
                </button>
              </li>
            </ul>
            <label class="px-3 py-1 border border-gray-300 bg-gray-50 text-[16px] text-gray-800 rounded shadow-sm cursor-pointer whitespace-nowrap">
              파일추가
              <input type="file" class="hidden" id="fileInput" multiple @change="handleFileChange"/>
            </label>
        </div>
    </div>
    </div>
    <div class="border-t-[2px] border-[#2B5BBB] mt-5"></div>
    <!-- 버튼 -->
    <div class="max-w-[1190px] container mt-[64px] mb-[50px]">
        <div class="max-w-[576px] flex gap-2 items-center mx-auto">
            <button @click.prevent="submitForm"
                class="max-w-[282px] w-full px-5 py-2 text-white bg-[#2B5BBB] rounded-[10px] hover:bg-[#648DDF]">
                수정하기
            </button>
            <button type="button" @click="cancelForm"
                class="max-w-[282px] w-full px-5 py-2 bg-[#F5F5F5] rounded-[10px] hover:bg-[#EBEBEB] border border-[#DBDEE3]">
                취소하기
            </button>
        </div>
    </div>
  </form>
    <!-- <p class="mt-4 text-gray-700">type(공지상태): {{ type }}</p>
    <p class="mt-4 text-gray-700">status(공개상태): {{ status }}</p>
    <p class="mt-4 text-gray-700">title(과정명): {{ title }}</p>
    <p class="mt-4 text-gray-700">author(작성자): {{ author }}</p>
    <p class="mt-4 text-gray-700">content(내용): {{ content }}</p> -->
</template>


<script setup>

definePageMeta({ middleware: 'auth' });

import { useState } from '#app'
import { useRouter, useRoute } from 'vue-router';
import TinyEditor from '../../../../components/TinyEditor.vue'
import Swal from 'sweetalert2'

const config = useRuntimeConfig() 
const token = useCookie('auth_token').value
const route = useRoute();
const router = useRouter();
const pageTitle = useState('pageTitle')

const title = ref('');
const content = ref('');
const status = ref('');
const categoryOptions = ['선택하세요', '회원가입', '연수신청' , '준비사항' , '변경/취소' , '서류자격증' , '기타'];
const category = ref('');
const selectedFiles = ref([])
const existingFiles = ref([])
const id = route.params.id

// 🌐 API : 연수일정 정보 불러오기
async function fetchPostData() {
  const id = route.params.id
  if (!id) {
    console.error('자주묻는질문 ID가 없습니다.');
    return;
  }

  try {
    const { data, error, pending, refresh } = await useFetch(`/api/admin/posts/${id}?board=qna`, {
      baseURL: config.public.backendUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (error.value) {
      Swal.fire('오류', '데이터를 불러오는데 실패했습니다.', 'error')
      return
    }

    if (data.value && data.value.data) {
      const d = data.value.data
      status.value = d.public === 1 ? '공개' : '비공개'
      title.value = d.title || ''
      content.value = d.content || ''
      category.value = d.category || ''
      existingFiles.value = d.files || []

    }
  } catch (e) {
    Swal.fire('오류', '데이터를 불러오는 중 문제가 발생했습니다.', 'error')
  }
}

// 🌐 API : 수정하기
async function submitForm() {
  const id = route.params.id;

  const payload = {
    board: 'qna',
    category: category.value,
    public: status.value === '공개' ? 1 : 0,
    title: title.value,
    content: content.value,
  };

  try {
    const { data, error, status } = await useFetch(`/api/admin/posts/${id}`, {
      baseURL: config.public.backendUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: payload,
    });

    if (error.value || status.value >= 400) {
      Swal.fire('등록 실패', data.value?.message || '등록에 실패했습니다.', 'error');
      return;
    }

    Swal.fire('수정 완료', '자주묻는질문이 성공적으로 수정되었습니다.', 'success').then(() => {
      router.push('/admin/faq');
    });
  } catch (e) {
    Swal.fire('오류', '등록 중 오류가 발생했습니다.', 'error');
  }
}

// 🛠️ 기능 : 취소 함수
function cancelForm() {
  router.push('/admin/faq')
}


// 🌐 API : 파일삭제
async function removeExistingFile(index) {
  const id = route.params.id
  const file = existingFiles.value[index]
  if (!id || !file?.id) return

  try {
    const { data, error } = await useFetch(`/api/admin/posts/files/${id}?status=delete`, {
      baseURL: config.public.backendUrl,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ media_id: file.id }),
    })

    const result = await response.json()
    if (!response.ok) {
      Swal.fire('삭제 실패', result.message || '파일 삭제에 실패했습니다.', 'error')
    } else {
      Swal.fire('삭제 완료', '파일이 삭제되었습니다.', 'success')
      existingFiles.value.splice(index, 1)
    }
  } catch (e) {
    Swal.fire('오류', '파일 삭제 중 오류가 발생했습니다.', 'error')
  }
}

// 🌐 API : 파일추가
async function handleFileUpload() {
  const id = route.params.id
  if (!id || selectedFiles.value.length === 0) return

  const formData = new FormData()
  for (const file of selectedFiles.value) {
    formData.append('files[]', file)
  }

  try {
    const response = await fetch(`${config.public.backendUrl}/api/admin/posts/files/${id}?status=add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const result = await response.json()
    if (!response.ok) {
      Swal.fire('파일 추가 실패', result.message || '파일 추가 중 오류가 발생했습니다.', 'error')
    } else {
      Swal.fire('파일 추가 완료', '파일이 성공적으로 추가되었습니다.', 'success')
      selectedFiles.value = []
      await fetchPostData(id)
    }
  } catch (e) {
    Swal.fire('오류', '파일 추가 중 오류가 발생했습니다.', 'error')
  }
}

// 🛠️ 기능 : 파일 변경 시 실행
async function handleFileChange(event) {
  const files = Array.from(event.target.files)
  selectedFiles.value = selectedFiles.value.concat(files)
  event.target.value = '' // input 초기화

  await handleFileUpload() // ✅ 파일 업로드 실행
}

onMounted(async () => {
  pageTitle.value = '자주묻는질문'
  const id = route.params.id
  await fetchPostData(id);
})

</script>


<style scoped>

.mob-br {
  display: none;
}
.context-wrap {
  grid-column: span 2 / span 2; 
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
  }
  .context-label {
    width: 38%; 
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
}
@media (max-width: 480px) {
  .context-wrap {
    flex-direction: column; 
    align-items: flex-start; 
  }
}

</style>