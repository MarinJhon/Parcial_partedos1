<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tipos" color="light" />
        </IonButtons>
        <IonTitle>Nuevo tipo de mascota</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
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

      <div class="boton-guardar">
        <IonButton expand="block" color="success" @click="guardarTipo">
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
import { ref } from 'vue'
import { addOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'

const router = useRouter()

const iconosDisponibles = [
  'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  'https://cdn-icons-png.flaticon.com/512/616/616430.png',
  'https://cdn-icons-png.flaticon.com/512/616/616490.png',
  'https://cdn-icons-png.flaticon.com/512/616/616512.png',
  'https://cdn-icons-png.flaticon.com/512/616/616436.png',
  'https://cdn-icons-png.flaticon.com/512/616/616476.png',
]

const form = ref({
  nombre: '',
  icono: '',
})

const errores = ref({
  nombre: '',
  icono: '',
})

const seleccionarIcono = (icono: string) => {
  form.value.icono = icono
}

const subirIcono = () => {
  console.log('Subir nuevo icono (puedes implementar un input file aquí)')
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

const guardarTipo = () => {
  if (!validar()) return
  console.log('Tipo guardado:', form.value)
  router.push('/tipos')
}
</script>

<style scoped>
/* 🌊 Fondo general */
.fondo-azul {
  --background: #0a4abf;
  background-color: #0a4abf;
}

/* 🔹 Toolbar azul */
.toolbar-azul {
  --background: #0a4abf;
  --color: white;
}

/* 📋 Lista */
.form-list {
  background: transparent;
  padding-top: 8px;
}

/* 📝 Items blancos */
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

/* 🐾 Iconos */
.iconos-container {
  margin-top: 16px;
  padding: 0 16px;
}

.iconos-label {
  color: white;
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
  background-color: #e5e5e5;
  color: #000;
  font-size: 1.333rem;
}

/* ✅ Botón */
.boton-guardar {
  padding: 16px;
}
</style>

