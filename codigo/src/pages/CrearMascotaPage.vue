<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/mascotas" color="light" />
        </IonButtons>
        <IonTitle>Nueva Mascota</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <IonList class="form-list" lines="full">
        <!-- Nombre -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Nombre de la mascota</IonLabel>
          <IonInput
            v-model="form.nombre"
            placeholder="Nombre"
          ></IonInput>
        </IonItem>
        <IonNote v-if="errores.nombre" color="danger" class="error-note">
          {{ errores.nombre }}
        </IonNote>

        <!-- Especie -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Especie</IonLabel>
          <IonSelect v-model="form.especie" placeholder="Seleccionar">
            <IonSelectOption v-for="esp in especies" :key="esp" :value="esp">
              {{ esp }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonNote v-if="errores.especie" color="danger" class="error-note">
          {{ errores.especie }}
        </IonNote>

        <!-- Raza -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Raza</IonLabel>
          <IonSelect v-model="form.raza" placeholder="Seleccionar">
            <IonSelectOption
              v-for="raza in razasDisponibles"
              :key="raza"
              :value="raza"
            >
              {{ raza }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonNote v-if="errores.raza" color="danger" class="error-note">
          {{ errores.raza }}
        </IonNote>

        <!-- Fecha nacimiento -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Fecha de nacimiento</IonLabel>
          <IonDatetime
            presentation="date"
            v-model="form.fechaNacimiento"
          ></IonDatetime>
        </IonItem>

        <!-- Sexo -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Sexo</IonLabel>
          <IonSelect v-model="form.sexo" placeholder="Seleccionar">
            <IonSelectOption value="Macho">Macho</IonSelectOption>
            <IonSelectOption value="Hembra">Hembra</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonNote v-if="errores.sexo" color="danger" class="error-note">
          {{ errores.sexo }}
        </IonNote>

        <!-- Propietario -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Propietario</IonLabel>
          <IonSelect v-model="form.propietario" placeholder="Seleccionar">
            <IonSelectOption
              v-for="user in propietarios"
              :key="user.id"
              :value="user.nombre"
            >
              {{ user.nombre }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonNote v-if="errores.propietario" color="danger" class="error-note">
          {{ errores.propietario }}
        </IonNote>

        <!-- Notas -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Notas médicas (opcional)</IonLabel>
          <IonTextarea
            v-model="form.notas"
            placeholder="Escribe aquí..."
            autoGrow
          ></IonTextarea>
        </IonItem>
      </IonList>

      <div class="boton-guardar">
        <IonButton expand="block" color="success" @click="guardarMascota">
          Guardar Mascota
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonList,
  IonTextarea,
  IonDatetime,
  IonNote,
} from '@ionic/vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const especies = ['Perro', 'Gato', 'Pez', 'Ave']
const razas = {
  Perro: ['Golden Retriever', 'Chihuahua', 'Pastor Alemán'],
  Gato: ['Siamés', 'Persa', 'Bengala'],
  Pez: ['Payaso', 'Betta', 'Koi'],
  Ave: ['Canario', 'Loro', 'Periquito'],
}

const propietarios = [
  { id: 1, nombre: 'Propietario de ejemplo' },
  { id: 2, nombre: 'Propietaria de ejemplo' },
  { id: 3, nombre: 'Dueño de ejemplo' },
]

const form = ref({
  nombre: '',
  especie: '',
  raza: '',
  fechaNacimiento: '',
  sexo: '',
  propietario: '',
  notas: '',
})

const errores = ref({
  nombre: '',
  especie: '',
  raza: '',
  sexo: '',
  propietario: '',
})

const razasDisponibles = computed(() => {
  return form.value.especie ? razas[form.value.especie as keyof typeof razas] : []
})

const validar = () => {
  errores.value = {
    nombre: '',
    especie: '',
    raza: '',
    sexo: '',
    propietario: '',
  }
  let valido = true

  if (!form.value.nombre) {
    errores.value.nombre = 'El nombre es obligatorio'
    valido = false
  }
  if (!form.value.especie) {
    errores.value.especie = 'Seleccione una especie'
    valido = false
  }
  if (!form.value.raza) {
    errores.value.raza = 'Seleccione una raza'
    valido = false
  }
  if (!form.value.sexo) {
    errores.value.sexo = 'Seleccione el sexo'
    valido = false
  }
  if (!form.value.propietario) {
    errores.value.propietario = 'Seleccione un propietario'
    valido = false
  }

  return valido
}

const guardarMascota = () => {
  if (!validar()) return
  console.log('Mascota guardada:', form.value)
  router.push('/mascotas')
}
</script>

<style scoped>
/* 🌊 Fondo azul */
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

.boton-guardar {
  padding: 16px;
}
</style>
