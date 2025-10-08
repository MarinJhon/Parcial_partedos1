<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/usuarios" color="light" />
        </IonButtons>
        <IonTitle>Detalles del Usuario</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <!-- 🧍 Tarjeta de perfil -->
      <div class="perfil-card">
        <img class="avatar" :src="usuario.foto" alt="Foto" />
        <h2 class="nombre">{{ usuario.nombre }}</h2>
        <p class="correo">{{ usuario.correo }}</p>
        <div class="tags">
          <IonBadge color="primary">{{ usuario.rol }}</IonBadge>
          <IonBadge :color="usuario.estado === 'Activo' ? 'success' : 'medium'">
            {{ usuario.estado }}
          </IonBadge>
        </div>
      </div>

      <!-- 📋 Lista de datos -->
      <IonList class="lista-detalles" lines="full">
        <IonItem class="item-blanco">
          <IonLabel>Nombre Completo</IonLabel>
          <IonText>{{ usuario.nombre }}</IonText>
        </IonItem>
        <IonItem class="item-blanco">
          <IonLabel>Correo Electrónico</IonLabel>
          <IonText>{{ usuario.correo }}</IonText>
        </IonItem>
        <IonItem class="item-blanco">
          <IonLabel>Rol</IonLabel>
          <IonText>{{ usuario.rol }}</IonText>
        </IonItem>
        <IonItem class="item-blanco">
          <IonLabel>Estado</IonLabel>
          <IonText>{{ usuario.estado }}</IonText>
        </IonItem>
        <IonItem class="item-blanco">
          <IonLabel>Fecha de Creación</IonLabel>
          <IonText>{{ usuario.creado }}</IonText>
        </IonItem>
        <IonItem class="item-blanco">
          <IonLabel>Última Modificación</IonLabel>
          <IonText>{{ usuario.actualizado }}</IonText>
        </IonItem>
      </IonList>

      <!-- ✏️ Botón editar -->
      <div class="boton-editar">
        <IonButton expand="block" color="success" @click="editarUsuario">
          Editar ✏️
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
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonText,
  IonList,
  IonBadge,
  IonButton,
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const usuario = ref({
  id: '',
  nombre: '',
  correo: '',
  rol: '',
  estado: '',
  foto: '',
  creado: '',
  actualizado: '',
})

onMounted(() => {
  const id = route.params.id
  console.log('Cargar detalles de', id)
  usuario.value = {
    id: id as string,
    nombre: 'Usuario de ejemplo',
    correo: 'usuario@example.com',
    rol: 'Administrador',
    estado: 'Activo',
    foto: 'https://i.pravatar.cc/150?img=3',
    creado: '15 de enero de 2023',
    actualizado: '20 de mayo de 2024',
  }
})

const editarUsuario = () => {
  router.push(`/usuarios/editar/${usuario.value.id}`)
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

/* 👤 Tarjeta de perfil blanca */
.perfil-card {
  background-color: white;
  margin: 16px;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--ion-color-primary);
  object-fit: cover;
  margin-bottom: 12px;
}

.nombre {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #000;
}

.correo {
  color: #555;
  font-size: 0.9rem;
  margin-top: 4px;
  margin-bottom: 8px;
}

.tags {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

/* 📋 Lista de detalles */
.lista-detalles {
  background: transparent;
}

.item-blanco {
  --background: white;
  --color: #000;
  margin: 6px 10px;
  border-radius: 12px;
}

/* ✏️ Botón */
.boton-editar {
  padding: 16px;
}
</style>
