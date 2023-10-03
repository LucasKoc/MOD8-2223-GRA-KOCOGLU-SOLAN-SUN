<script setup>
    import {ref} from 'vue';
    const userName = ref('');
    const userKey = ref('');
    const userLastName = ref('');
    const banDuration = ref('');

    const emits = defineEmits(['getInfo']);
    
    const saveChanges = () => {
        emits('getInfo');
    };
    
    const deleteUser = () => {
        // Handle deleting user logic here
    };
    
    const applyBan = () => {
        // Handle applying a ban logic here
    };
</script>

<template>
    <div class="user-container">
        <button class="close" @click="emits('getInfo')">X</button>
        <div class="user-panel">
            <div class="user-details">
                <h2>User Details</h2>
                <div class="form-group">
                <label for="userName">User Name</label>
                <input type="text" id="userName" v-model="userName" />
                </div>
                <div class="form-group">
                <label for="userKey">Key</label>
                <input type="password" id="userKey" v-model="userKey" />
                </div>
                <div class="form-group">
                <label for="userLastName">Last Name</label>
                <input type="text" id="userLastName" v-model="userLastName" />
                </div>
                <div class="button-group">
                <button @click="saveChanges">Save Changes</button>
                <button @click="deleteUser">Delete User</button>
                </div>
            </div>
        </div>
        <div class="user-panel">
            <div class="ban-panel">
                <h2>Ban User</h2>
                <div class="form-group">
                <label for="banDuration">Ban Duration (days)</label>
                <input type="number" id="banDuration" v-model="banDuration" />
                </div>
                <button @click="applyBan">Apply Ban</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/css/components/UserMange.css';
</style>
  