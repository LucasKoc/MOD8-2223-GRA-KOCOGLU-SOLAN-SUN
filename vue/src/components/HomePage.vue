<script setup>
    import LoginOverlay from './LoginOverlay.vue';
    import { ref } from 'vue';

    const showLoginOverlay = ref(false)

    function openLoginOverlay() {
        showLoginOverlay.value = true;
    }
    function closeLoginOverlay() {
        showLoginOverlay.value = false;
    }


</script>
<template>
    <article>
        <h1>Lorem ipsum</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit erat, imperdiet a ipsum quis, ultricies tempus enim. Maecenas hendrerit nulla nec mauris viverra, sed placerat est luctus. Nulla pulvinar sodales mauris ac volutpat. Maecenas urna arcu, scelerisque ac mattis vitae, rhoncus a sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Cras eget dictum felis, eu sodales mi. Suspendisse commodo nibh a metus pharetra eleifend. Donec pharetra nisl metus, sit amet finibus turpis malesuada consequat. Vestibulum eget vestibulum est. Pellentesque sagittis, orci sit amet ornare ultrices, quam nunc mattis sem, sit amet egestas risus libero nec augue. Quisque varius viverra mauris.
        </p>
    </article>

    <LoginOverlay v-if="showLoginOverlay" @close="closeLoginOverlay()" />

    <button @click="openLoginOverlay()">Open Login Overlay</button>

    <h1>{{ showLoginOverlay }}</h1>

    <article>
        <h1>Lorem ipsum</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit erat, imperdiet a ipsum quis, ultricies tempus enim. Maecenas hendrerit nulla nec mauris viverra, sed placerat est luctus. Nulla pulvinar sodales mauris ac volutpat. Maecenas urna arcu, scelerisque ac mattis vitae, rhoncus a sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Cras eget dictum felis, eu sodales mi. Suspendisse commodo nibh a metus pharetra eleifend. Donec pharetra nisl metus, sit amet finibus turpis malesuada consequat. Vestibulum eget vestibulum est. Pellentesque sagittis, orci sit amet ornare ultrices, quam nunc mattis sem, sit amet egestas risus libero nec augue. Quisque varius viverra mauris.
        </p>
    </article>
</template>

<style>

</style>