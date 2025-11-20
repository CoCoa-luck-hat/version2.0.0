<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useIndexStore } from "@/stores";
import { useToastStore } from "@/stores/toast";
import { ref } from "vue";

const router = useRouter();
const ToastStore = useToastStore();
const IndexStore = useIndexStore();

const Email = ref("");
const Password = ref("");

const SignIn = async () => {
  const IsEmail = Email.value.trim() == "" ? true : false;
  const IsPassword = Password.value.trim() == "" ? true : false;
  if (IsEmail || IsPassword) {
    ToastStore.pushToast("กรุณากรอกข้อมูลให้ครบ", "alert-error");
    return;
  }
  try {
    const user = {
      email: Email.value,
      password: Password.value,
    };

    const response = await IndexStore.Login(user);

    ToastStore.pushToast("เข้าสู่ระบบสำเร็จ", "alert-success");

    if(IndexStore.user.role == 'Admin'){
        router.push({name:'admin-dashboard'})
    }else if(IndexStore.user.role == 'User'){
        router.push({name:'user-dashboard',params:{id:IndexStore.user.id}})
    }
  } catch (error) {
    console.log(error);
    if(error.response?.data.errorVali){
        error.response.data.errorVali.map((e)=>ToastStore.pushToast(e.msg,'alert-error'))
    }else{
        ToastStore.pushToast('อีเมลหรือรหัสผิด','alert-error')
    }
  }
};
</script>
<template>
  <div class="max-w-sm w-full bg-white shadow-2xl rounded-2xl px-10 py-8">
    <h1 class="text-3xl font-bold text-center">Sign In</h1>
    <fieldset class="fieldset mt-2">
      <legend class="fieldset-legend text-lg">Email</legend>
      <input
        class="input rounded-xl outline-0 focus:border-info-content transition-all duration-400"
        placeholder="Your email address"
        type="text" v-model="Email"
      />
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend text-lg">Password</legend>
      <input
        class="input rounded-xl outline-0 focus:border-info-content transition-all duration-400"
        placeholder="Your Password"
        type="text" v-model="Password"
      />
    </fieldset>
    <button
      class="btn btn-primary text-white rounded-2xl w-full mt-4"
      @click="SignIn()"
    >
      Sign In
    </button>
    <div class="text-gray-400 flex gap-1 text-sm mt-3 justify-center">
      Don't have an account?
      <RouterLink :to="{ name: 'register' }" class="text-primary"
        >Sign up</RouterLink
      >
    </div>
  </div>
</template>
