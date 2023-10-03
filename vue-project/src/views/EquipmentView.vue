<script setup>
    import { ref } from 'vue';
    import Equipment from '../components/Equipment.vue';
    import EquipRes from '../components/EquipRes.vue';

    const equipmentManage = ref(false);
    
    const equipmentReservation = ref([]);
    equipmentReservation.value.push({ id: 1, name: 'Equipment A' });
    equipmentReservation.value.push({ id: 2, name: 'Equipment B' });
    equipmentReservation.value.push({ id: 3, name: 'Equipment C' });
    equipmentReservation.value.push({ id: 4, name: 'Equipment D' });

    function saveData(){
        equipmentManage.value = false;
    }
</script>

<template>
    <div class="reservation-view">
        <div class="flexdivtop">
            <h2>Multimedia</h2>
            <button class="reservebutton" @click="equipmentManage = true">Reserve</button>
        </div>
        <div class="flexdiv">
            <div>
                <h3>Equipment Reservations</h3>
                <div class="reservation">
                    <ul class="reservation-list">
                        <li v-for="equipment in equipmentReservation" :key="equipment.id">
                            <Equipment :equipment="equipment" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="backdrop" v-if="equipmentManage"></div>
    <EquipRes class="user-modal" v-if="equipmentManage" @sendData="(data) => saveData(data)"/>
</template>
  
<style scoped>
    .reservation-view {
        padding: 20px 0px;
        background-color: white;
        color: black;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .reservation-list{
        margin-top: 10px;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .flexdiv {
        margin: 0% 5%;
    }

    .flexdivtop {
        display: flex;
        margin: 0% 5%;
        align-items: baseline;
        justify-content: space-around;
    }

    .reservation {
        padding: 1%;
        box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.1);
    }

    .reservebutton {
        padding: 10px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .reservebutton:hover {
        background-color: #0056b3;
    }
    
    h2 {
        margin: 2% 5%;
    }
    
    h3 {
        margin-top: 10px;
    }
    
    ul {
        list-style: none;
        padding: 0;
    }
    
    p {
        background-color: #fff;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

</style>

<style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000; 
  }

  .user-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001
  }
</style>