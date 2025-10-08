<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" color="light" />
        </IonButtons>
        <IonTitle>Categorías</IonTitle>
        <IonButtons slot="end">
          <IonButton @click="irACrearCategoria" color="light">
            <IonIcon :icon="addOutline"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <div class="buscador-container">
        <IonSearchbar
          v-model="busqueda"
          placeholder="Buscar categorías..."
          color="light"
        ></IonSearchbar>
      </div>

      <div v-if="categoriasFiltradas.length === 0" class="sin-categorias">
        <IonText color="light">
          <p>No hay categorías registradas aún.</p>
        </IonText>
      </div>

      <IonList class="lista-categorias">
        <IonItem
          v-for="cat in categoriasFiltradas"
          :key="cat.id"
          class="item-blanco"
          button
          @click="editarCategoria(cat.id)"
        >
          <IonAvatar slot="start">
            <img :src="cat.icono" alt="icono" />
          </IonAvatar>
          <IonLabel>
            <h2>{{ cat.nombre }}</h2>
            <p>{{ cat.descripcion }}</p>
          </IonLabel>
          <IonButton
            fill="clear"
            color="success"
            slot="end"
            @click.stop="editarCategoria(cat.id)"
          >
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

const categorias = ref([
  {
    id: '1',
    nombre: 'Alimentos',
    descripcion: 'Productos comestibles',
    icono: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
  },
  {
    id: '2',
    nombre: 'Medicamentos',
    descripcion: 'Productos farmacéuticos',
    icono: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
  },
  {
    id: '3',
    nombre: 'Accesorios',
    descripcion: 'Artículos complementarios',
    icono: 'https://cdn-icons-png.flaticon.com/512/2784/2784445.png',
  },
])

const busqueda = ref('')

const categoriasFiltradas = computed(() =>
  categorias.value.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

const irACrearCategoria = () => {
  router.push('/categorias/crear')
}

const editarCategoria = (id: string) => {
  router.push(`/categorias/editar/${id}`)
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

/* 🔍 Buscador */
.buscador-container {
  padding: 8px;
}

/* 📋 Lista */
.lista-categorias {
  background: transparent;
}

.item-blanco {
  --background: white;
  --color: #000;
  margin: 8px 12px;
  border-radius: 12px;
  --inner-border-width: 0;
}

.item-blanco h2 {
  font-size: 1rem;
  color: #000;
  font-weight: 600;
}

.item-blanco p {
  font-size: 0.8rem;
  color: #555;
}

.sin-categorias {
  text-align: center;
  margin-top: 20px;
}
</style>

