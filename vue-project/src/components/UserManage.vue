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
    .user-panel {
        display: flex;
        justify-content: space-between;
        max-width: 800px;
        margin: 0 0px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    .user-container{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        
    }
    
    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    label {
        display: block;
        font-weight: bold;
    }
    
    input[type="text"],
    input[type="password"],
    input[type="number"] {
        width: 80%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
    .button-group {
        display: flex;
        justify-content: space-between;
    }
    
    button {
        flex: 1;
        padding: 10px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-right: 10px;
    }
    
    button:last-child {
        margin-right: 0;
    }
    
    button:hover {
        background-color: #0056b3;
    }

    .close {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 1px;
        left: 1px;
        padding: 0;
        background-color: #ccc;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .close:hover {
        background-color: red;
      }
</style>
  