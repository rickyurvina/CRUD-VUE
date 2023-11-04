<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import AppointmentItem from '../components/AppointmentItem.vue'
import PaginateAppointment from '../components/PaginateAppointment.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import axios from 'axios'
const fav = ref('')

const appointments = ref([])
const postPage = 5
const start = ref(0)
const end = ref(postPage)
const blockNextBtn = ref(false)
const blockPrevBtn = ref(true)

const loading = ref(true)

const changeFav = (name) => {
  fav.value = name
}

const changePage = () => {
  start.value = start.value + postPage
  end.value = end.value + postPage
  if (end.value >= appointments.value.length) {
    blockNextBtn.value = true
  }
  if (start.value >= 0) {
    blockPrevBtn.value = false
  }
}

const returnPage = () => {
  start.value = start.value - postPage
  end.value = end.value - postPage
  if (start.value <= 0) {
    blockPrevBtn.value = true
  } else {
    blockNextBtn.value = false
  }
}


onMounted(() => {
  getData()
})

// const fetchData=async()=>{
//   loading.value = true
//   try {
//     const res = await fetch('http://localhost:8000/api/appointment');
//     appointments.value = await res.json()

//   } catch (error) {
//     console.log(error)
//   } finally {
//     setTimeout(() => {
//       loading.value = false
//     }, 2000)
//   }
// }


const getData = async () => {
  loading.value = true
  try {
    const res = await axios.get('http://localhost:8000/api/appointment');
    appointments.value = await res.data

  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="container" v-if="loading">
    <div class="row">
      <div class="col-12 text-center justify-content-center ">
        <LoadingSpinner />
      </div>
    </div>
  </div>

  <div class="container" v-else="!loading">

    <h2>Lista de pacientes:{{ fav }}</h2>
    <router-link to="/create-appointment">
      <button class="btn btn-success" type="button">
        Crear cita

      </button>
    </router-link>


    <PaginateAppointment class="mt-2 mb-2" @changePage="changePage" @returnPage="returnPage" :blockNextBtn="blockNextBtn"
      :blockPrevBtn="blockPrevBtn" />

    <AppointmentItem class="mb-2 mt-2 p-4" v-for="(appointment, index) in appointments.slice(start, end)" :key="index"
      :name="appointment.name" :id="appointment.id" :symptom="appointment.symptom" :email="appointment.email"
      :phone="appointment.phone" 
      @getData="getData" />

  </div>
</template>
