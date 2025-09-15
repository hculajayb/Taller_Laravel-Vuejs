<template>
  <v-data-table
    :items="formattedUsers"
    :headers="headers"
    :loading="loading"
    class="elevation-1"
  >
    <template #no-data>
      <div class="pa-6 text-center">No hay usuarios para mostrar.</div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type Usuario = { id:number; nombre:string; email:string; rol:'admin'|'usuario'; created_at: string }

const props = defineProps<{ searchTerm?: string }>()

const items = ref<Usuario[]>([])
const loading = ref(false)

const headers = [
  { title: 'Nombre', value: 'nombre' },
  { title: 'Email',  value: 'email' },
  { title: 'Rol',    value: 'rol' },
  { title: 'Fecha creación', value: 'created_at' },
]

// carga desde la API
const fetchUsers = async () => {
  loading.value = true
  try {
    const { data } = await api.get<Usuario[]>('/usuarios/listUsers')
    items.value = data
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

const filtered = computed(() => {
  const q = (props.searchTerm || '').toLowerCase().trim()
  if (!q) return items.value
  return items.value.filter(u =>
    u.nombre.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q)  ||
    u.rol.toLowerCase().includes(q)
  )
})

// 📅 Aplicamos formato a la fecha con hora incluida
const formattedUsers = computed(() =>
  filtered.value.map(u => ({
    ...u,
    created_at: u.created_at 
      ? format(new Date(u.created_at), 'dd/MM/yyyy HH:mm', { locale: es })
      : ''
  }))
)

// recargar si quieres al cambiar término (opcional)
/* watch(() => props.searchTerm, () => { ... }) */
</script>
