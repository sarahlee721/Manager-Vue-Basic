<template>
  <div>
    <textarea v-if="editorId" :id="editorId"></textarea>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRuntimeConfig, useCookie } from '#app'

const config = useRuntimeConfig()
const token = useCookie('auth_token').value

const editorId = ref('')
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: String, default: '' },
  imageUploadUrl: { type: String, default: '/api/admin/store/image' },
})

// 디버깅용: props 값 확인
console.log('🔍 TinyEditor props 확인:', {
  imageUploadUrl: props?.imageUploadUrl,
  defaultValue: '/api/admin/store/image'
})

let editorInstance = null

// dataURL → Blob 변환 함수 (개선된 버전)
function dataUrlToBlob(dataUrl) {
  try {
    const [header, base64] = dataUrl.split(',')
    const mime = header.match(/:(.*?);/)[1]
    const binary = atob(base64)
    const array = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i)
    }
    
    // 올바른 MIME 타입으로 Blob 생성
    const blob = new Blob([array], { type: mime })
    console.log('🔄 Blob 변환 성공:', {
      originalMime: mime,
      blobSize: blob.size,
      blobType: blob.type
    })
    return blob
  } catch (error) {
    console.error('DataURL to Blob 변환 실패:', error)
    return null
  }
}

// 이미지 업로드 함수 (URL 조합 강화)
async function uploadImageBlob(blob) {
  try {
    // 강제로 /api/ 경로 포함 - 절대 확실한 방법
    const backendUrl = (config.public.backendUrl || '').replace(/\/$/, '') // 끝 슬래시 제거
    
    // props.imageUploadUrl에 /api/가 없으면 강제 추가
    let apiPath = props.imageUploadUrl || '/admin/store/image'
    if (!apiPath.includes('/api/')) {
      apiPath = '/api' + (apiPath.startsWith('/') ? apiPath : '/' + apiPath)
    }
    
    const uploadUrl = backendUrl + apiPath
    
    console.log('🖼️ 이미지 업로드 시작...')
    console.log('🏠 백엔드 URL (정리됨):', backendUrl)
    console.log('📝 원본 imageUploadUrl:', props.imageUploadUrl)
    console.log('📝 처리된 API 경로:', apiPath) 
    console.log('🔗 최종 업로드 URL:', uploadUrl)
    
    // URL에 /api/가 포함되어 있는지 강제 검증
    if (!uploadUrl.includes('/api/')) {
      console.error('❌ /api/ 경로가 여전히 누락됨!')
      console.error('강제로 /api/ 경로를 추가합니다')
      // 최후의 수단: 하드코딩
      const fallbackUrl = backendUrl + '/api/admin/store/image'
      console.log('🆘 대체 URL 사용:', fallbackUrl)
      uploadUrl = fallbackUrl
    }
    
    console.log('✅ 최종 확정 URL:', uploadUrl)
    console.log('🔑 토큰:', token ? `${token.substring(0, 10)}...` : 'null')
    console.log('📦 Blob 정보:', {
      size: blob.size,
      type: blob.type,
      constructor: blob.constructor.name
    })

    // Blob이 유효한지 확인
    if (!blob || blob.size === 0) {
      throw new Error('유효하지 않은 이미지 데이터')
    }

    // FormData 생성 - 파일 확장자를 MIME 타입에 맞게 설정
    const formData = new FormData()
    let filename = 'upload.png'
    
    // MIME 타입에 따라 적절한 확장자 설정
    if (blob.type.includes('jpeg') || blob.type.includes('jpg')) {
      filename = 'upload.jpg'
    } else if (blob.type.includes('gif')) {
      filename = 'upload.gif'
    } else if (blob.type.includes('webp')) {
      filename = 'upload.webp'
    }

    console.log('📋 파일명 설정:', filename)
    formData.append('image', blob, filename)

    // fetch 요청 - 타임아웃 추가
    console.log('📤 API 요청 시작...')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30초 타임아웃

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Accept 헤더 추가
          'Accept': 'application/json',
        },
        body: formData,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      console.log('📡 응답 수신:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        contentType: response.headers.get('content-type')
      })

      // 응답 처리
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`
        try {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json()
            errorMessage = errorData.message || errorData.error || errorMessage
            console.log('❌ 에러 응답 JSON:', errorData)
          } else {
            errorMessage = await response.text()
            console.log('❌ 에러 응답 TEXT:', errorMessage)
          }
        } catch (parseError) {
          console.log('❌ 응답 파싱 실패:', parseError)
        }
        throw new Error(`업로드 실패 (${response.status}): ${errorMessage}`)
      }

      // 성공 응답 처리
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text()
        console.log('⚠️ JSON이 아닌 응답:', textResponse)
        throw new Error('서버에서 JSON 응답을 반환하지 않음')
      }

      const result = await response.json()
      console.log('✅ 성공 응답:', result)

      // 응답 구조 검증
      if (result?.result === true && result?.data && typeof result.data === 'string') {
        console.log('🎯 이미지 URL 획득:', result.data)
        return result.data
      } else {
        console.log('❌ 예상과 다른 응답 구조:', result)
        throw new Error(`응답 구조 오류: ${result?.message || '알 수 없는 오류'}`)
      }

    } catch (fetchError) {
      clearTimeout(timeoutId)
      if (fetchError.name === 'AbortError') {
        throw new Error('업로드 시간 초과 (30초)')
      }
      throw fetchError
    }

  } catch (error) {
    console.error('❌ 업로드 에러 상세:', {
      name: error.name,
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 3)
    })
    
    // 구체적인 에러 메시지 제공
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('네트워크 연결 오류: 서버에 접근할 수 없습니다')
    }
    
    throw error
  }
}

onMounted(async () => {
  editorId.value = `editor-${Math.random().toString(36).slice(2, 9)}`

  if (!process.client) return

  try {
    // TinyMCE 안전하게 로드
    let tinymce
    if (window.tinymce) {
      tinymce = window.tinymce
    } else {
      // 동적 import 안전하게 처리
      try {
        const tinymceModule = await import('tinymce/tinymce')
        tinymce = tinymceModule.default || tinymceModule
      } catch (importError) {
        console.error('TinyMCE import 실패:', importError)
        return
      }
    }

    // 플러그인들 안전하게 로드
    try {
      await Promise.all([
        import('tinymce/themes/silver'),
        import('tinymce/icons/default'),
        import('tinymce/plugins/code'),
        import('tinymce/plugins/image')
      ])
    } catch (pluginError) {
      console.warn('일부 플러그인 로드 실패:', pluginError)
    }

    // TinyMCE 초기화
    tinymce.init({
      selector: `#${editorId.value}`,
      language: 'ko_KR',
      language_url: 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/langs/ko_KR.js',
      height: 480,
      menubar: false,
      plugins: 'code image',
      toolbar: 'undo redo | bold underline strikethrough | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | removeformat | image | code',
      skin_url: '/tinymce/skins/ui/oxide',
      base_url: '/tinymce',
      suffix: '.min',
      license_key: 'gpl',
      image_dimensions: true,
      image_class_list: [{ title: 'Responsive', value: 'responsive-img' }],

      // 이미지 붙여넣기 및 업로드 설정
      paste_data_images: true,
      automatic_uploads: true,
      
      // 이미지 업로드 핸들러
      images_upload_handler: async (blobInfo, progress) => {
        console.log('🔄 이미지 자동 업로드 핸들러 호출됨')
        try {
          const imageUrl = await uploadImageBlob(blobInfo.blob())
          return imageUrl
        } catch (error) {
          console.error('자동 업로드 실패:', error)
          throw error
        }
      },

      // 파일 선택 이미지 업로드
      file_picker_callback: (callback, value, meta) => {
        if (meta.filetype === 'image') {
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'

          input.onchange = async (e) => {
            const file = e.target.files[0]
            if (!file) return

            try {
              const imageUrl = await uploadImageBlob(file)
              callback(imageUrl, { title: file.name })
            } catch (err) {
              console.error('파일 선택 이미지 업로드 실패:', err)
              alert('이미지 업로드 중 오류가 발생했습니다.')
            }
          }

          input.click()
        }
      },

      setup(editor) {
        editor.on('init', () => {
          editor.setContent(props.modelValue || '')
          editorInstance = editor
          console.log('✅ TinyMCE 에디터 초기화 완료')
        })

        // 내용 변경 시 부모에게 전달
        editor.on('Change KeyUp SetContent', () => {
          const content = editor.getContent()
          emit('update:modelValue', content)
          console.log('📝 컨텐츠 업데이트:', content.length, '글자')
        })

        // 이미지 반응형 처리
        editor.on('NodeChange', () => {
          const imgs = editor.getBody().querySelectorAll('img')
          imgs.forEach((img) => {
            img.removeAttribute('width')
            img.removeAttribute('height')
            img.style.maxWidth = '100%'
            img.style.height = 'auto'
          })
        })

        // 디버깅용 이벤트 리스너
        editor.on('paste', (e) => {
          const items = e.clipboardData?.items || []
          const imageCount = Array.from(items).filter(item => item.type.startsWith('image')).length
          if (imageCount > 0) {
            console.log('📋 이미지 붙여넣기 감지:', imageCount, '개')
          }
        })

        editor.on('drop', (e) => {
          const files = e.dataTransfer?.files || []
          const imageFiles = Array.from(files).filter(file => file.type.startsWith('image'))
          if (imageFiles.length > 0) {
            console.log('🎯 이미지 드롭 감지:', imageFiles.length, '개')
          }
        })
      },
    })

  } catch (error) {
    console.error('❌ TinyMCE 초기화 실패:', error)
  }
})

onBeforeUnmount(() => {
  if (editorInstance) {
    try {
      editorInstance.destroy()
      editorInstance = null
      console.log('🗑️ TinyMCE 에디터 정리 완료')
    } catch (error) {
      console.error('TinyMCE 정리 중 오류:', error)
    }
  }
})

// props 변경 감지하여 에디터 내용 업데이트
if (process.client) {
  watch(
    () => props.modelValue,
    (newValue) => {
      if (editorInstance && editorInstance.getContent() !== newValue) {
        editorInstance.setContent(newValue || '')
      }
    },
    { immediate: false }
  )
}
</script>

<style scoped>
.responsive-img {
  max-width: 100%;
  height: auto;
}
</style>