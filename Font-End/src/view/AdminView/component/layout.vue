<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useIndexStore } from "@/stores";
import { useToastStore } from "@/stores/toast";

const IndexStore = useIndexStore()
const ToastStore = useToastStore()
const wScreen = ref(false);

const checkScreenSize = () => {
  wScreen.value = window.innerWidth >= 1024;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const BtnLogout = ()=>{
  IndexStore.Logout()
  ToastStore.pushToast('ออกจากระบบสำเร็จ','alert-success')
}
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input
      id="my-drawer-4"
      type="checkbox"
      :checked="wScreen"
      class="drawer-toggle"
    />
    <div class="drawer-content">
      <!-- Navbar -->
      <nav class="navbar w-full bg-base-200">
        <label
          for="my-drawer-4"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost"
        >
          <!-- Sidebar toggle icon -->
          <i class="mdi mdi-menu-open text-xl"></i>
        </label>
        <div class="px-4 flex-1">DashBorad Admin</div>
        <div @click="BtnLogout()" class="flex gap-1 btn btn-outline btn-error rounded-2xl px-4">
          <i class="mdi mdi-exit-to-app text-lg"></i>
          <p>Logout</p>
        </div>
      </nav>
      <!-- Page content here -->
      <div class="p-4">
        <slot></slot>
      </div>
    </div>

    <div class="drawer-side is-drawer-close:overflow-visible">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div
        class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64"
      >
        <!-- Sidebar content here -->
        <ul class="menu w-full grow lg:py-5 " >
          <li>
            <router-link :to="{name:'admin-dashboard'}"
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right" 
            >
              <i class="mdi mdi-view-dashboard"></i>
              <h1 class="is-drawer-close:hidden">DashBorad</h1>
            </router-link>
          </li>
          <!-- List item -->
          <li>
            <router-link :to="{name:'admin-users'}"
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            >
              <!-- Home icon -->
              <i class="mdi mdi-account-group"></i>
              <span class="is-drawer-close:hidden">Table Users</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'admin-reports'}" class="is-drawer-close:tooltip is-drawer-close:tooltip-right">
              <i class="mdi mdi-flag"></i>
              <span class="is-drawer-close:hidden">Report</span>
            </router-link>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>
