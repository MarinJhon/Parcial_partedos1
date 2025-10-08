<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/productos" color="light" />
        </IonButtons>
        <IonTitle>Detalles del Producto</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <!-- 🖼 Imagen con badge -->
      <div class="imagen-container">
        <img :src="producto.imagen" alt="Imagen del producto" class="producto-imagen" />
        <IonBadge :color="producto.stock > 0 ? 'success' : 'medium'" class="badge-stock">
          {{ producto.stock > 0 ? 'En stock' : 'Agotado' }}
        </IonBadge>
      </div>

      <!-- 📄 Tarjeta blanca con info -->
      <div class="tarjeta-info">
        <h2 class="precio">${{ producto.precio.toFixed(2) }}</h2>
        <h1 class="nombre">{{ producto.nombre }}</h1>
        <p class="categoria">{{ producto.categoria }}</p>

        <div class="detalles">
          <p><strong>ID Producto:</strong> {{ producto.id }}</p>
          <p><strong>Stock:</strong> {{ producto.stock }} unidades</p>
        </div>

        <div class="descripcion">
          <h3>Descripción</h3>
          <p>{{ producto.descripcion }}</p>
        </div>
      </div>

      <!-- ✏️🗑 Botones -->
      <div class="botones-container">
        <IonButton expand="block" color="warning" @click="editarProducto(producto.id)">
          Editar
        </IonButton>
        <IonButton expand="block" color="danger" @click="eliminarProducto(producto.id)">
          Eliminar
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
  IonButtons,
  IonBackButton,
  IonContent,
  IonBadge,
  IonButton,
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const producto = ref({
  id: '',
  nombre: '',
  categoria: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  imagen: '',
})

onMounted(() => {
  const id = route.params.id as string
  console.log('Cargar detalles del producto con ID:', id)

  // Datos simulados
  producto.value = {
    id: 'P-0001',
    nombre: 'Alimento balanceado',
    categoria: 'Alimentos',
    descripcion:
      'Fórmula equilibrada para mantenimiento diario. Rica en nutrientes esenciales.',
    precio: 25.99,
    stock: 150,
    imagen:
      'https://images.unsplash.com/photo-1589927986089-35812388d1a5?auto=format&fit=crop&w=400&q=80',
  }
})

const editarProducto = (id: string) => {
  router.push(`/productos/editar/${id}`)
}

const eliminarProducto = (id: string) => {
  const confirmar = confirm('¿Estás seguro de que quieres eliminar este producto?')
  if (confirmar) {
    console.log('Producto eliminado:', id)
    router.push('/productos')
  }
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

/* 🖼 Imagen superior */
.imagen-container {
  position: relative;
  text-align: center;
}

.producto-imagen {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
}

.badge-stock {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.8rem;
}

/* 📄 Tarjeta blanca */
.tarjeta-info {
  background-color: white;
  margin: 16px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.precio {
  color: var(--ion-color-primary);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.nombre {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #000;
}

.categoria {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.detalles p {
  font-size: 0.9rem;
  color: #333;
  margin: 2px 0;
}

.descripcion {
  margin-top: 16px;
}

.descripcion h3 {
  margin-bottom: 6px;
  font-size: 1rem;
  font-weight: 600;
  color: #000;
}

.descripcion p {
  color: #444;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* ✏️🗑 Botones */
.botones-container {
  display: flex;
  gap: 10px;
  padding: 16px;
}
</style>
