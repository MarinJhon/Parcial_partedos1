<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tipos" color="light" />
        </IonButtons>
        <IonTitle>Editar tipo de mascota</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <!-- Formulario -->
      <IonList class="form-list" lines="full">
        <!-- Nombre -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Nombre del tipo de mascota</IonLabel>
          <IonInput
            v-model="form.nombre"
            placeholder="Ej: Perro, Gato, Ave"
          ></IonInput>
        </IonItem>
        <IonNote v-if="errores.nombre" color="danger" class="error-note">
          {{ errores.nombre }}
        </IonNote>

        <!-- Selección de ícono -->
        <div class="iconos-container">
          <p class="iconos-label">Icono</p>
          <div class="iconos-grid">
            <div
              v-for="icono in iconosDisponibles"
              :key="icono"
              class="icono-item"
              :class="{ seleccionado: form.icono === icono }"
              @click="seleccionarIcono(icono)"
            >
              <img :src="icono" alt="icono" />
            </div>

            <!-- Subir nuevo ícono -->
            <div class="icono-item subir" @click="subirIcono">
              <IonIcon :icon="addOutline"></IonIcon>
            </div>
          </div>
        </div>
        <IonNote v-if="errores.icono" color="danger" class="error-note">
          {{ errores.icono }}
        </IonNote>
      </IonList>

      <!-- Botón guardar -->
      <div class="boton-guardar">
        <IonButton expand="block" color="success" @click="guardarCambios">
          Guardar
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonButton,
  IonIcon,
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addOutline } from 'ionicons/icons'

const router = useRouter()
const route = useRoute()

const iconosDisponibles = [
  'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  'https://cdn-icons-png.flaticon.com/512/616/616430.png',
  'https://cdn-icons-png.flaticon.com/512/616/616490.png',
  'https://cdn-icons-png.flaticon.com/512/616/616512.png',
  'https://cdn-icons-png.flaticon.com/512/616/616436.png',
  'https://cdn-icons-png.flaticon.com/512/616/616476.png',
]

const form = ref({
  id: '',
  nombre: '',
  icono: '',
})

const errores = ref({
  nombre: '',
  icono: '',
})

onMounted(() => {
  const id = route.params.id
  console.log('Editar tipo con ID:', id)

  // Simulación de datos precargados
  form.value = {
    id: id as string,
    nombre: 'Gato',
    icono: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
  }
})

const seleccionarIcono = (icono: string) => {
  form.value.icono = icono
}

const subirIcono = () => {
  console.log('Subir icono personalizado (opcional)')
}

const validar = () => {
  errores.value = { nombre: '', icono: '' }
  let valido = true

  if (!form.value.nombre) {
    errores.value.nombre = 'El nombre es obligatorio'
    valido = false
  }
  if (!form.value.icono) {
    errores.value.icono = 'Seleccione un icono'
    valido = false
  }

  return valido
}

const guardarCambios = () => {
  if (!validar()) return

  console.log('Cambios guardados:', form.value)
  router.push('/tipos')
}
</script>

<style scoped>
/* 🌊 Fondo azul general */
.fondo-azul {
  --background: #0a4abf;
  background-color: #0a4abf;
}

/* 🔹 Toolbar azul con texto blanco */
.toolbar-azul {
  --background: #0a4abf;
  --color: white;
}

/* 📝 Lista del formulario transparente */
.form-list {
  background: transparent;
  margin-top: 16px;
}

/* 📄 Item blanco */
.item-blanco {
  --background: white;
  --color: #000;
  border-radius: 12px;
  margin: 10px;
}

.item-blanco ion-label {
  color: #000;
  font-weight: 500;
}

.error-note {
  margin-left: 16px;
  font-size: 0.8rem;
}

/* 🎨 Selección de íconos */
.iconos-container {
  margin-top: 16px;
  padding: 0 16px;
}

.iconos-label {
  color: #fff;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.iconos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.icono-item {
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
}

.icono-item img {
  width: 36px;
  height: 36px;
}

.icono-item.seleccionado {
  border-color: #0a4abf;
}

.icono-item.subir {
  background-color: #e0e0e0;
  color: #000;
  font-size: 1.333rem;
}

.boton-guardar {
  padding: 16px;
}
</style>
