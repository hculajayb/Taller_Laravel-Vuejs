<template>
  <v-container class="py-8" style="max-width: 720px">
    <v-card>
      <v-card-title class="text-h6">Nueva Tarea</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="form.titulo"
            label="Título"
            :rules="[v => !!v || 'El título es requerido']"
            prepend-inner-icon="mdi-format-title"
            required
          />
          <v-textarea
            v-model="form.descripcion"
            label="Descripción"
            prepend-inner-icon="mdi-text"
          />
          <v-select
            v-model="form.estado"
            label="Estado"
            :items="estados"
            prepend-inner-icon="mdi-progress-check"
          />
          <v-text-field
            v-model="form.fecha_vencimiento"
            label="Fecha vencimiento"
            type="date"
          />
          <v-select
            v-model="form.usuario_id"
            label="Asignar a usuario"
            :items="usuarios"
            item-title="nombre"
            item-value="id"
            prepend-inner-icon="mdi-account"
            :rules="[v => !!v || 'Seleccione un usuario']"
          />

          <div class="d-flex ga-2 mt-4">
            <v-btn type="submit" color="primary" :loading="loading">Guardar</v-btn>
            <v-btn variant="tonal" @click="goBack">Cancelar</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar.show" :timeout="2500">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { addTarea } from '@/services/tareas'

const router = useRouter()
const valid = ref(false)
const loading = ref(false)
const estados = ['pendiente', 'en_progreso', 'completada']
const usuarios = ref<any[]>([])

const form = ref({
  titulo: '',
  descripcion: '',
  estado: 'pendiente',
  fecha_vencimiento: '',
  usuario_id: null,
})

const snackbar = ref({ show: false, text: '' })

const goBack = () => router.back()

const fetchUsuarios = async () => {
  const { data } = await api.get('/usuarios/listUsers')
  usuarios.value = data
}

const onSubmit = async () => {
  if (!valid.value) return
  loading.value = true
  try {
    await addTarea(form.value)
    snackbar.value = { show: true, text: 'Tarea creada correctamente' }
    setTimeout(() => router.push('/tareas'), 800)
  } catch (e: any) {
    snackbar.value = { show: true, text: 'Error al crear tarea' }
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsuarios)
</script>
