<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const route=useRoute()

const router=useRouter()

const appointment = ref([])

const getAppointment = async () => {
    try {
        const res = await axios.get(`http://localhost:8000/api/appointment/${route.params.id}`);
        appointment.value = await res.data
    } catch (error) {
        console.log(error)
    }
}

const goHome = () => {
    router.push('/')
}

const deleteAppointment = async () => {
    try {
        const res = await axios.delete(`http://localhost:8000/api/appointment/${route.params.id}`);
        appointment.value = await res.data
        goHome()    
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    getAppointment()
})

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">{{ appointment.name }}</h3>
                    </div>
                    <div class="card-body">
                        <p><strong>Email:</strong> {{ appointment.email }}</p>
                        <p><strong>Phone:</strong> {{ appointment.phone }}</p>
                        <p><strong>Owner:</strong> {{ appointment.user?.name }}</p>
                        <p><strong>Date:</strong> {{ appointment.date }}</p>
                        <p><strong>Symptoms:</strong> {{ appointment.symptom }}</p>
                    </div>
                    <div class="card-footer">
                        <router-link to="/" class="btn btn-secondary">Back</router-link>
                        <button class="btn btn-danger mr-auto" @click="deleteAppointment">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card {
    margin-top: 2rem;
}
</style>

