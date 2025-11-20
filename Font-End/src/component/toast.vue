<script setup>
    import { useToastStore } from '@/stores/toast';

    const ToastStore = useToastStore()
</script>

<template>
    <transition-group name="toasts" tag="div" class="toast toast-end z-50">
        <div v-for="toast in ToastStore.toasts" :key="toast.id" :class="toast.type" class="alert text-white">
            {{ toast.message }}
        </div>
    </transition-group> 
</template>

<style scoped>
    .toasts-enter-active,.toasts-leave-active{
        transition: all 0.5s ease;
    }
    .toasts-enter-from{
        transform: translateY(50px);
        opacity: 0;
    }
    .toasts-enter-to{
        transform: translateY(0px);
        opacity: 1;
    }
    .toasts-leave-to{
        transform: scale(0);
    }
</style>