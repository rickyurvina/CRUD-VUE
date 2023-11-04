<script setup>
import { RouterLink } from 'vue-router';
import axios from 'axios';

const props = defineProps({
    name: String,
    id: Number,
    symptom: String,
    email: String,
    phone: String,
    changeFavName: Function
})


</script>

<template>
    <div class="card">
        <div class="card-symptom">
            <h5 class="card-name">
                {{ id }} - {{ name }}
            </h5>
            <p>
                {{ symptom }}
            </p>
            <div class="row">
                <div class="col-6">
                    <span class="badge bg-success">
                        {{ phone }}
                    </span>
                </div>
                <div class="col-6">
                    <span class="badge bg-secondary">
                        {{ email }}
                    </span>
                </div>
            </div>

            <div class="btn-group mt-2 ml-auto" role="group" aria-label="Basic example">
                <router-link :to="`appointment/${id}`">
                    <button type="button" class="btn btn-outline-primary mr-6">Ver</button>
                </router-link>

                <button type="button" class="btn btn-danger">
                    <i class="fas fas-trash">
                        Eliminar
                    </i>
                </button>
            </div>

        </div>
    </div>
</template>