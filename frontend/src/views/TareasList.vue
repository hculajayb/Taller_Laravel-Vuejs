<template>
  <v-container>
    <v-card class="pa-4">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="text-h6">Listado de Tareas</div>
        <div class="d-flex ga-2">
        <v-btn color="success" @click="downloadExcel">Descargar Formulario</v-btn>
        <v-btn color="primary" @click="goAddTarea">Nueva Tarea</v-btn>
        </div>
      </div>

      <v-data-table
        :items="tareas"
        :headers="headers"
        :loading="loading"
        class="elevation-1"
      >
        <template #item.usuario="{ item }">
          {{ item.usuario?.nombre }} ({{ item.usuario?.rol }})
        </template>
        <template #item.created_at="{ item }">
          {{ new Date(item.created_at).toLocaleString('es-ES', { 
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit' }) }}
        </template>
        <template #no-data>
          <div class="pa-6 text-center">No hay tareas para mostrar.</div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTareas } from '@/services/tareas'
import api from '@/services/api'

const tareas = ref<any[]>([])
const loading = ref(false)
const router = useRouter()

const headers = [
  { title: 'Título', value: 'titulo' },
  { title: 'Descripción', value: 'descripcion' },
  { title: 'Estado', value: 'estado' },
  { title: 'Fecha vencimiento', value: 'fecha_vencimiento' },
  { title: 'Usuario asignado', value: 'usuario' },
  { title: 'Creación', value: 'created_at' },
]

const fetchTareas = async () => {
  loading.value = true
  try {
    const { data } = await getTareas()
    tareas.value = data
  } finally {
    loading.value = false
  }
}

const goAddTarea = () => router.push('/tareas/nueva')

const downloadExcel = async () => {
  try {
    const response = await api.get('/tareas/exportPendientes', {
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'tareas_pendientes.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Error descargando Excel', error)
  }
}

onMounted(fetchTareas)
</script>
