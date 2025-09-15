<template>
  <v-container class="py-8" style="max-width: 720px">
    <v-card>
      <v-card-title class="text-h6">Crear usuario</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="form.nombre"
            label="Nombre"
            :rules="[v => !!v || 'El nombre es requerido']"
            prepend-inner-icon="mdi-account"
            required
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            :rules="[v => !!v || 'El email es requerido']"
            prepend-inner-icon="mdi-email"
            required
          />
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            :rules="[v => !!v || 'El password es requerido', v => (v?.length ?? 0) >= 6 || 'Mínimo 6 caracteres']"
            prepend-inner-icon="mdi-lock"
            required
          />
          <v-select
            v-model="form.rol"
            label="Rol"
            :items="roles"
            :rules="[v => !!v || 'El rol es requerido']"
            prepend-inner-icon="mdi-shield-account"
            required
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

type Rol = 'admin' | 'usuario'

interface NewUser {
  nombre: string
  email: string
  password: string
  rol: Rol
}

const router = useRouter()
const valid = ref(false)
const loading = ref(false)
const roles: Rol[] = ['admin', 'usuario']

const form = ref<NewUser>({
  nombre: '',
  email: '',
  password: '',
  rol: 'usuario',
})

const snackbar = ref({ show: false, text: '' })

const goBack = () => router.back()

const onSubmit = async () => {
  if (!valid.value) return
  loading.value = true
  try {
    // POST al endpoint que nos diste
    await api.post('/usuarios/addUser', {
      nombre: form.value.nombre,
      email: form.value.email,
      password: form.value.password,
      rol: form.value.rol,
    })
    snackbar.value = { show: true, text: 'Usuario creado correctamente' }
    // Redirige al listado
    setTimeout(() => router.push('/usuarios'), 800)
  } catch (e: any) {
    const msg = e?.response?.data?.message || 'Error al crear usuario'
    snackbar.value = { show: true, text: msg }
  } finally {
    loading.value = false
  }
}
</script>
