<script setup>

    import { ref } from 'vue';

    const tes = ref("yey")

    const emit = defineEmits(['close'])

    function closeLoginOverlay() {
        emit('close');
    }


</script>

<template>

    <panel>
        <div class="login-box">
        <h2>Login</h2>
        <form>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"><br><br>
            <button type="button" @click="closeLoginOverlay">{{tes}}</button>
        </form>
        </div>
    </panel>

</template>

<style scoped>
    /*overlay*/
    panel {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
  