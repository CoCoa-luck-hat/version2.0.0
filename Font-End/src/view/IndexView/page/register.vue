<script setup>
import { ref } from "vue";
import { useToastStore } from "@/stores/toast";
import { useIndexStore } from "@/stores";
import { useRouter } from "vue-router";

const router = useRouter()
const ToastStore = useToastStore();
const IndexStore = useIndexStore()


const Username = ref("");
const Email = ref("");
const Password = ref("");

const SignUp = async () => {
  const IsUsername = Username.value.trim() === "" ? true : false;
  const IsEmail = Email.value.trim() === "" ? true : false;
  const IsPassword = Password.value.trim() === "" ? true : false;

  if (IsEmail || IsPassword || IsUsername) {
    ToastStore.pushToast("กรุณากรอกข้อมูลให้ครบ", "alert-error");
    return;
  }
  try {
    const user = {
      username:Username.value,
      email:Email.value,
      password:Password.value
    }

    const response = await IndexStore.Register(user)

    ToastStore.pushToast('สมัครสมาชิกสำเร็จ','alert-success')

    Email.value = ""
    Password.value =""
    Username.value = ""

    router.push({name:'login'})
  } catch (error) {
    console.log(error);

    if(error.response.data?.errorVali){
      error.response.data?.errorVali.map((e)=>ToastStore.pushToast(e.msg,'alert-error'))
    }else{
      ToastStore.pushToast('อีเมลซ้ำ','alert-error')
    }
  }
};
</script>

<template>
  <div class="max-w-sm w-full bg-white shadow-2xl rounded-2xl px-10 py-8">
    <h1 class="text-3xl font-bold text-center">Sign Up</h1>
    <fieldset class="fieldset mt-2">
      <legend class="fieldset-legend text-lg">Username</legend>
      <input
        class="input rounded-xl outline-0 focus:border-info-content transition-all duration-400"
        v-model="Username"
        placeholder="Your Username"
        type="text"
      />
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend text-lg">Email</legend>
      <input
        class="input rounded-xl outline-0 focus:border-info-content transition-all duration-400"
        v-model="Email"
        placeholder="Your email address"
        type="text"
      />
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend text-lg">Password</legend>
      <input
        class="input rounded-xl outline-0 focus:border-info-content transition-all duration-400"
        v-model="Password"
        placeholder="Your Password"
        type="text"
      />
    </fieldset>
    <button
      class="btn btn-primary text-white rounded-2xl w-full mt-4"
      @click="SignUp()"
    >
      Sign Up
    </button>
    <div class="text-gray-400 flex gap-1 text-sm mt-3 justify-center">
      Already you have an account?
      <RouterLink :to="{ name: 'login' }" class="text-primary"
        >Sign In</RouterLink
      >
    </div>
  </div>
</template>
