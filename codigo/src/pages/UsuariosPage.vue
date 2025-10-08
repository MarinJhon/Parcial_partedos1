<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonTitle>Usuarios</IonTitle>
        <IonButtons slot="end">
          <IonButton color="light" @click="irACrearUsuario">
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
          placeholder="Buscar usuarios"
          color="light"
        ></IonSearchbar>
      </div>

      <!-- Sin usuarios -->
      <div v-if="usuarios.length === 0" class="sin-usuarios">
        <IonText color="light">
          <p>No hay usuarios registrados aún.</p>
        </IonText>
      </div>

      <!-- Lista -->
      <IonList class="lista-blanca">
        <IonCard
          v-for="usuario in usuariosFiltrados"
          :key="usuario.id"
          class="usuario-card"
          @click="verDetalle(usuario.id)"
        >
          <IonCardHeader>
            <div class="usuario-header">
              <IonAvatar>
                <img :src="usuario.avatar" alt="Foto de usuario" />
              </IonAvatar>
              <div class="usuario-info">
                <IonCardTitle>{{ usuario.nombre }}</IonCardTitle>
                <IonCardSubtitle>{{ usuario.rol }}</IonCardSubtitle>
              </div>
              <IonBadge :color="usuario.estado === 'Activo' ? 'success' : 'medium'">
                {{ usuario.estado }}
              </IonBadge>
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
  IonContent,
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
  IonBadge,
  IonButtons,
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const usuarios = ref<any[]>([]) // inicialmente vacío
const busqueda = ref('')

const usuariosFiltrados = computed(() =>
  usuarios.value.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

const router = useRouter()
const irACrearUsuario = () => {
  router.push('/usuarios/crear')
}
const verDetalle = (id: string) => {
  router.push(`/usuarios/detalle/${id}`)
}
</script>

<style scoped>
/* 🔹 Fondo azul general */
.fondo-azul {
  --background: #0a4abf; /* azul personalizado */
  background-color: #0a4abf;
}

/* 🔹 Toolbar azul con texto blanco */
.toolbar-azul {
  --background: #0a4abf;
  --color: white;
}

/* 🔹 Cards blancas sobre fondo azul */
.usuario-card {
  background-color: white;
  color: #000;
  margin: 10px;
  border-radius: 12px;
}

.usuario-header {
  display: flex;
  align-items: center;
}

.usuario-info {
  flex: 1;
  margin-left: 10px;
}

/* 🔹 Lista blanca transparente */
.lista-blanca {
  background: transparent;
}

/* 🔹 Buscador */
.buscador-container {
  padding: 8px;
}

/* 🔹 Texto cuando no hay usuarios */
.sin-usuarios {
  text-align: center;
  margin-top: 20px;
}
</style>
