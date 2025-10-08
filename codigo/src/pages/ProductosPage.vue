<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonTitle>Productos</IonTitle>
        <IonButtons slot="end">
          <IonButton color="light" @click="irACrearProducto">
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
          placeholder="Buscar productos"
          color="light"
        ></IonSearchbar>
      </div>

      <!-- Mensaje si no hay productos -->
      <div v-if="productosFiltrados.length === 0" class="sin-productos">
        <IonText color="light">
          <p>No hay productos registrados aún.</p>
        </IonText>
      </div>

      <!-- Grid de productos -->
      <div class="grid-container">
        <div
          v-for="producto in productosFiltrados"
          :key="producto.id"
          class="producto-card"
          @click="verDetalle(producto.id)"
        >
          <img :src="producto.imagen" alt="Imagen del producto" />
          <h3>{{ producto.nombre }}</h3>
          <p class="precio">${{ producto.precio.toFixed(2) }}</p>
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
  IonButton,
  IonIcon,
  IonContent,
  IonSearchbar,
  IonText,
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Producto = {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  precio: number
  stock: number
  imagen: string
}

const productos = ref<Producto[]>([
  {
    id: '1',
    nombre: 'Alimento balanceado para perros',
    categoria: 'Alimentos',
    descripcion: 'Rico en proteínas y vitaminas',
    precio: 25.99,
    stock: 12,
    imagen:
      'https://images.unsplash.com/photo-1589927986089-35812388d1a5?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    nombre: 'Vacuna multidosis para gatos',
    categoria: 'Medicamentos',
    descripcion: 'Protección completa para gatos',
    precio: 45.0,
    stock: 8,
    imagen:
      'https://images.unsplash.com/photo-1600798046056-5f5a0418f4b4?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    nombre: 'Juguete interactivo para aves',
    categoria: 'Accesorios',
    descripcion: 'Estimula el entretenimiento de aves domésticas',
    precio: 15.5,
    stock: 20,
    imagen:
      'https://images.unsplash.com/photo-1562157873-818bc0726f3f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '4',
    nombre: 'Shampoo suave para caballos',
    categoria: 'Higiene',
    descripcion: 'Cuida el pelaje sin irritaciones',
    precio: 30.0,
    stock: 5,
    imagen:
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a9?auto=format&fit=crop&w=300&q=80',
  },
])

const busqueda = ref('')

const productosFiltrados = computed(() =>
  productos.value.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

const irACrearProducto = () => {
  router.push('/productos/crear')
}

const verDetalle = (id?: string) => {
  if (!id) return
  router.push(`/productos/detalle/${id}`)
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

/* 📋 Buscador */
.buscador-container {
  padding: 8px;
}

/* 📝 Texto cuando no hay productos */
.sin-productos {
  text-align: center;
  margin-top: 20px;
}

/* 🧱 Grid */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  padding: 12px;
}

/* 🧾 Tarjeta blanca */
.producto-card {
  background-color: white;
  color: #000;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.producto-card:hover {
  transform: scale(1.02);
}

.producto-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.producto-card h3 {
  font-size: 0.95rem;
  margin: 8px 4px 0;
}

.precio {
  color: #0a4abf;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 0.85rem;
}
</style>
