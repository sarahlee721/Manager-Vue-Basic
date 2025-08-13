<template>
  <div class="login-wrap flex items-center justify-center bg-[#F4F6FA] w-full h-full px-5 sm:px-0">
    <div class="bg-white shadow-xl rounded-2xl py-20 px-20 max-sm:px-8 w-full max-w-xl">
      <h2 class="text-[40px] font-bold text-primaryPoint text-center mb-6">
        로그인
      </h2>

      <form class="space-y-8 max-sm:space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label class="block text-[18px] font-medium text-gray-700">아이디</label>
            <input
              type="text"
              class="w-full border border-gray-300 text-[18px] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primaryPoint"
              placeholder="아이디"
            />
          </div>
          <div>
            <label class="block text-[18px] font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              class="w-full border border-gray-300 text-[18px] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primaryPoint"
              placeholder="비밀번호"
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full border border-transparent bg-primaryPoint text-white text-[18px] py-3.5 mt-2 rounded-md font-semibold hover:bg-primary500 transition"
        >
          로그인
        </button>
      </form>
    </div>
  </div>
</template>

<script scoped>

definePageMeta({ layout: 'auth' });

export default {
  name: 'LoginSkinOnly',
  setup() {
    const router = useRouter();

    const handleSubmit = () => {
      router.push('/proposer');
    };

    return { handleSubmit };
  },
};
</script>