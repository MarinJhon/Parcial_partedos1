<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonTitle>Mascotas</IonTitle>
        <IonButtons slot="end">
          <IonButton color="light" @click="irACrearMascota">
            <IonIcon :icon="addOutline"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <!-- Buscador -->
      <div class="buscador-container">
        <IonSearchbar
          v-model="busqueda"
          placeholder="Buscar mascotas"
          color="light"
        ></IonSearchbar>
      </div>

      <!-- Sin mascotas -->
      <div v-if="mascotasFiltradas.length === 0" class="sin-mascotas">
        <IonText color="light">
          <p>No hay mascotas registradas aún.</p>
        </IonText>
      </div>

      <!-- Lista de mascotas -->
      <IonList>
        <IonCard
          v-for="mascota in mascotasFiltradas"
          :key="mascota.id"
          class="mascota-card"
          @click="verDetalle(mascota.id)"
        >
          <IonCardHeader>
            <div class="mascota-header">
              <IonAvatar>
                <img :src="mascota.foto" alt="Foto de la mascota" />
              </IonAvatar>
              <div class="mascota-info">
                <IonCardTitle>{{ mascota.nombre }}</IonCardTitle>
                <IonCardSubtitle>{{ mascota.especie }} - {{ mascota.raza }}</IonCardSubtitle>
                <IonText color="medium" class="propietario-text">
                  Propietario: {{ mascota.propietario }}
                </IonText>
              </div>
            </div>
          </IonCardHeader>
        </IonCard>
      </IonList>
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
  IonButton,
  IonIcon,
  IonSearchbar,
  IonText,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonAvatar,
  IonContent,
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mascotas = ref([
  {
    id: '1',
    nombre: 'Fido',
    especie: 'Perro',
    raza: 'Golden Retriever',
    propietario: 'Propietario de ejemplo',
    foto: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_2009.jpg',
  },
  {
    id: '2',
    nombre: 'Luna',
    especie: 'Gato',
    raza: 'Siamés',
    propietario: 'Propietaria de ejemplo',
    foto: 'https://cdn2.thecatapi.com/images/9ve.jpg',
  },
  {
    id: '3',
    nombre: 'Bubbles',
    especie: 'Pez',
    raza: 'Payaso',
    propietario: 'Dueño de ejemplo',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Amphiprion_ocellaris_%28Clown_anemonefish%29.jpg',
  },
])

const busqueda = ref('')

const mascotasFiltradas = computed(() =>
  mascotas.value.filter((m) =>
    m.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

const irACrearMascota = () => {
  router.push('/mascotas/crear')
}

const verDetalle = (id?: string) => {
  if (!id) return
  router.push(`/mascotas/detalle/${id}`)
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

.buscador-container {
  padding: 8px;
}

.sin-mascotas {
  text-align: center;
  margin-top: 20px;
  color: white;
}

/* 🐾 Tarjeta blanca */
.mascota-card {
  background-color: white;
  color: #000;
  margin: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.mascota-card:hover {
  transform: scale(1.02);
}

.mascota-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mascota-info {
  flex: 1;
}

.propietario-text {
  font-size: 0.8rem;
}
</style>
