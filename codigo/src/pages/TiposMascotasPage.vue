<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" color="light" />
        </IonButtons>
        <IonTitle>Tipos de Mascotas</IonTitle>
        <IonButtons slot="end">
          <IonButton color="light" @click="irACrearTipo">
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
          placeholder="Buscar tipo..."
          color="light"
        ></IonSearchbar>
      </div>

      <!-- Si no hay tipos -->
      <div v-if="tiposFiltrados.length === 0" class="sin-tipos">
        <IonText color="light">
          <p>No hay tipos registrados aún.</p>
        </IonText>
      </div>

      <!-- Lista -->
      <IonList class="lista-transparente">
        <IonItem
          v-for="tipo in tiposFiltrados"
          :key="tipo.id"
          class="item-blanco"
          button
          @click="editarTipo(tipo.id)"
        >
          <IonAvatar slot="start">
            <img :src="tipo.icono" alt="Icono" />
          </IonAvatar>
          <IonLabel class="texto-item">
            {{ tipo.nombre }}
          </IonLabel>
          <IonButton fill="clear" color="primary" slot="end" @click.stop="editarTipo(tipo.id)">
            <IonIcon :icon="pencilOutline"></IonIcon>
          </IonButton>
        </IonItem>
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
  IonBackButton,
  IonContent,
  IonSearchbar,
  IonText,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonIcon,
} from '@ionic/vue'
import { addOutline, pencilOutline } from 'ionicons/icons'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Datos simulados
const tipos = ref([
  { id: '1', nombre: 'Perro', icono: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { id: '2', nombre: 'Gato', icono: 'https://cdn-icons-png.flaticon.com/512/616/616430.png' },
  { id: '3', nombre: 'Ave', icono: 'https://cdn-icons-png.flaticon.com/512/616/616490.png' },
  { id: '4', nombre: 'Reptil', icono: 'https://cdn-icons-png.flaticon.com/512/616/616512.png' },
  { id: '5', nombre: 'Roedor', icono: 'https://cdn-icons-png.flaticon.com/512/616/616476.png' },
  { id: '6', nombre: 'Pez', icono: 'https://cdn-icons-png.flaticon.com/512/616/616436.png' },
])

const busqueda = ref('')

const tiposFiltrados = computed(() =>
  tipos.value.filter((t) =>
    t.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

const irACrearTipo = () => {
  router.push('/tipos/crear')
}

const editarTipo = (id: string) => {
  router.push(`/tipos/editar/${id}`)
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

/* 📋 Lista transparente sobre fondo azul */
.lista-transparente {
  background: transparent;
}

/* 🧾 Cada item en blanco */
.item-blanco {
  --background: white;
  --color: #000;
  border-radius: 12px;
  margin: 8px;
}

/* ✍️ Texto del nombre */
.texto-item {
  font-weight: 500;
  color: #000;
}

.buscador-container {
  padding: 8px;
}

.sin-tipos {
  text-align: center;
  margin-top: 20px;
}
</style>
