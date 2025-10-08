<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/mascotas" color="light" />
        </IonButtons>
        <IonTitle>Editar Mascota</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <IonList class="form-list" lines="full">
        <!-- Nombre -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Nombre de la mascota</IonLabel>
          <IonInput v-model="form.nombre"></IonInput>
        </IonItem>

        <!-- Especie -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Especie</IonLabel>
          <IonSelect v-model="form.especie" placeholder="Seleccionar">
            <IonSelectOption v-for="esp in especies" :key="esp" :value="esp">
              {{ esp }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>

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

        <!-- Color -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Color</IonLabel>
          <IonInput v-model="form.color"></IonInput>
        </IonItem>

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

        <!-- Notas -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Notas médicas</IonLabel>
          <IonTextarea
            v-model="form.notas"
            placeholder="Escribe aquí..."
            autoGrow
          ></IonTextarea>
        </IonItem>
      </IonList>

      <div class="boton-guardar">
        <IonButton expand="block" color="success" @click="guardarCambios">
          Guardar cambios
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
} from '@ionic/vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

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
  id: '',
  nombre: '',
  especie: '',
  raza: '',
  fechaNacimiento: '',
  sexo: '',
  color: '',
  propietario: '',
  notas: '',
})

const razasDisponibles = computed(() => {
  return form.value.especie ? razas[form.value.especie as keyof typeof razas] : []
})

onMounted(() => {
  const id = route.params.id
  console.log('Cargando mascota con ID:', id)

  // Simulación de datos precargados
  form.value = {
    id: id as string,
    nombre: 'Fido',
    especie: 'Perro',
    raza: 'Golden Retriever',
    fechaNacimiento: '2020-05-15',
    sexo: 'Macho',
    color: 'Dorado',
    propietario: 'Propietario de ejemplo',
    notas: 'Vacunas al día. Observaciones registradas en el historial médico.',
  }
})

const guardarCambios = () => {
  console.log('Cambios guardados:', form.value)
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

/* 💾 Botón */
.boton-guardar {
  padding: 16px;
}
</style>
