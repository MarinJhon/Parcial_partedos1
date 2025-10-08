<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/mascotas" color="light" />
        </IonButtons>
        <IonTitle>Detalles de la Mascota</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <!-- 🐾 Tarjeta principal de perfil -->
      <div class="perfil-card">
        <img class="avatar" :src="mascota.foto" alt="Foto de la mascota" />
        <h2 class="nombre">{{ mascota.nombre }}</h2>
        <p class="subinfo">
          {{ mascota.especie }}, {{ mascota.raza }}<br />
          Nació el {{ mascota.fechaNacimiento }}
        </p>
        <IonButton color="success" size="small" @click="editarMascota(mascota.id)">
          Editar ✏️
        </IonButton>
      </div>

      <!-- 📄 Información General -->
      <div class="info-card">
        <h3 class="titulo-seccion">Información General</h3>
        <div class="info-grid">
          <div>
            <strong>Especie</strong>
            <p>{{ mascota.especie }}</p>
          </div>
          <div>
            <strong>Raza</strong>
            <p>{{ mascota.raza }}</p>
          </div>
          <div>
            <strong>Fecha de Nacimiento</strong>
            <p>{{ mascota.fechaNacimiento }}</p>
          </div>
          <div>
            <strong>Sexo</strong>
            <p>{{ mascota.sexo }}</p>
          </div>
          <div>
            <strong>Color</strong>
            <p>{{ mascota.color }}</p>
          </div>
          <div>
            <strong>Propietario</strong>
            <p>{{ mascota.propietario }}</p>
          </div>
        </div>
      </div>

      <!-- 🩺 Información Clínica -->
      <div class="info-card">
        <h3 class="titulo-seccion">Información Clínica</h3>
        <div class="info-grid">
          <div>
            <strong>Vacunas</strong>
            <p>{{ mascota.vacunas }}</p>
          </div>
          <div>
            <strong>Alergias</strong>
            <p>{{ mascota.alergias }}</p>
          </div>
          <div>
            <strong>Enfermedades</strong>
            <p>{{ mascota.enfermedades }}</p>
          </div>
          <div class="columna-completa">
            <strong>Notas del Veterinario</strong>
            <p>{{ mascota.notas }}</p>
          </div>
        </div>
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
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const mascota = ref({
  id: '',
  nombre: '',
  especie: '',
  raza: '',
  fechaNacimiento: '',
  sexo: '',
  color: '',
  propietario: '',
  vacunas: '',
  alergias: '',
  enfermedades: '',
  notas: '',
  foto: '',
})

onMounted(() => {
  const id = route.params.id
  console.log('Cargar detalles mascota ID:', id)

  // Simulación de datos (en un proyecto real harías fetch a backend)
  mascota.value = {
    id: id as string,
    nombre: 'Fido',
    especie: 'Perro',
    raza: 'Golden Retriever',
    fechaNacimiento: '15 de marzo de 2020',
    sexo: 'Macho',
    color: 'Dorado',
    propietario: 'Propietario de ejemplo',
    vacunas: 'Al día',
    alergias: 'Ninguna conocida',
    enfermedades: 'Ninguna conocida',
    notas: 'Visitas regulares al veterinario',
    foto: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_2009.jpg',
  }
})

const editarMascota = (id: string) => {
  router.push(`/mascotas/editar/${id}`)
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

/* 🐾 Tarjeta de perfil */
.perfil-card {
  background-color: white;
  margin: 16px;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--ion-color-primary);
  object-fit: cover;
  margin-bottom: 10px;
}

.nombre {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
  color: #000;
}

.subinfo {
  color: #555;
  font-size: 0.9rem;
  margin: 8px 0 12px;
}

/* 📄 Tarjetas de información */
.info-card {
  background-color: white;
  margin: 16px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.titulo-seccion {
  margin-bottom: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #000;
}

/* 🧾 Grid de información */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.info-grid strong {
  font-size: 0.85rem;
  color: #000;
}

.info-grid p {
  margin: 2px 0 8px;
  font-size: 0.85rem;
  color: #444;
}

.columna-completa {
  grid-column: 1 / -1;
}
</style>
