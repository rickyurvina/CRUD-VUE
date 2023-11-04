<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const appointment = ref({
    name: '',
    email: '',
    phone: '',
    owner: '',
    symptom: '',
    date: ''

});

const router = useRouter();

const users = ref([]);

onMounted(() => {
    getUsers();
});

const back=()=>{
    router.push('/')
}

const getUsers = async () => {
    try {
        const res = await axios.get('http://localhost:8000/api/users');
        users.value = await res.data;
        console.log(users.value)
    } catch (error) {
        console.log(error);
    }
};

const createAppointment = async () => {
    console.log(appointment.value)
    try {
        const res = await axios.post('http://localhost:8000/api/appointment', appointment.value);
        appointment.value = await res.data;
        back()
    } catch (error) {
        console.log(error);
    }
};


</script>
<template>
    <div class="container">
        <h1>Create Appointment</h1>
        <form @submit.prevent="createAppointment">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" id="name" v-model="appointment.name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" v-model="appointment.email" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" class="form-control" id="phone" v-model="appointment.phone" required>
            </div>
            <div class="form-group">
                <label for="user">User:</label>
                <select class="form-control" id="user" v-model="appointment.owner" required>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="symptoms">Symptoms:</label>
                <textarea class="form-control" id="symptoms" v-model="appointment.symptom" required></textarea>
            </div>
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" class="form-control" id="date" v-model="appointment.date" required>
            </div>


            <button type="submit" class="btn btn-primary mt-2">Create</button>
        </form>
    </div>
</template>

<style>
/* Add your custom styles here */
</style>
