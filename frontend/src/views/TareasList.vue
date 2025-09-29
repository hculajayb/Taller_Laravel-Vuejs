<template>
  <v-container>
    <v-card class="pa-4">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="text-h6">Listado de Tareas</div>
        <div>
          <v-btn color="primary" @click="goToUsuarios">Volver a Usuarios</v-btn>
        </div>
        <div class="d-flex ga-2">
          <v-btn color="success" @click="downloadExcel">Descargar Formulario</v-btn>
          <v-btn color="primary" @click="goAddTarea">Nueva Tarea</v-btn>
        </div>
      </div>

      <v-alert
        v-if="errorMsg"
        type="error"
        variant="tonal"
        class="mb-4"
        :text="errorMsg"
      />

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
              hour: '2-digit', minute: '2-digit'
          }) }}
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

type Tarea = {
  id: number
  titulo: string
  descripcion: string
  estado: string
  fecha_vencimiento: string | null
  usuario?: { nombre: string; rol: 'admin'|'usuario' }
  created_at: string
}

const tareas = ref<Tarea[]>([])
const loading = ref(false)
const errorMsg = ref('')
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
  errorMsg.value = ''
  try {
    const { data } = await getTareas()
    tareas.value = data
  } catch (e: any) {
    const msg = e?.response?.data?.message || 'No se pudo cargar el listado de tareas.'
    errorMsg.value = msg
    if (e?.response?.status === 401) {
      localStorage.removeItem('token')
      sessionStorage.removeItem('tokenChecked')
    }
  } finally {
    loading.value = false
  }
}

const goAddTarea = () => router.push('/tareas/nueva')

const downloadExcel = async () => {
  errorMsg.value = ''
  try {
    const response = await api.get('/tareas/exportPendientes', { responseType: 'blob' })

    // Intentamos obtener el filename desde el header Content-Disposition
    const cd = response.headers?.['content-disposition'] || response.headers?.['Content-Disposition']
    let filename = 'tareas_pendientes.xlsx'
    if (cd) {
      const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(cd)
      if (match?.[1]) filename = match[1].replace(/['"]/g, '')
    }

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (e: any) {
    console.error('Error descargando Excel', e)
    errorMsg.value = e?.response?.data?.message || 'No se pudo descargar el Excel.'
    if (e?.response?.status === 401) {
      localStorage.removeItem('token')
      sessionStorage.removeItem('tokenChecked')
    }
  }
}

const goToUsuarios = () => router.push({ name: 'usuarios' })

onMounted(fetchTareas)
</script>
