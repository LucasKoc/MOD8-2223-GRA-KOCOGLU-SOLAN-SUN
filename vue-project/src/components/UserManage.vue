<script setup>
    import {ref} from 'vue';

    const emits = defineEmits(['getInfo']);

    const props = defineProps({
        existsData: {
            type: Object,
            default: () => {}
        }
    });

    const data = ref(props.existsData);

    const userName = ref( data.value.name || '' );
    const userKey = ref( data.value.key || '' );
    const userRoom = ref( data.value.room || '' );
    const banDuration = ref( data.value.ban || '' );
    const userid = ref( data.value.id || '' );

    
    const saveChanges = () => {
        emits('getInfo', {id: userid.value, room: userRoom.value, key: userKey.value, name: userName.value});
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

        <div class="user-panel">
          <button class="close" @click="emits('getInfo')">X</button>
            <div class="user-details">
                <h2>User Details</h2>
                <div class="form-group">
                <label for="userName">User Name</label>
                <input type="text" id="userName" v-model="userName" />
                </div>
                <div class="form-group">
                <label for="userKey">Key</label>
                <input type="text" id="userKey" v-model="userKey" />
                </div>
                <div class="form-group">
                <label for="userLastName">Room</label>
                <input type="text" id="userRoom" v-model="userRoom" />
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
  