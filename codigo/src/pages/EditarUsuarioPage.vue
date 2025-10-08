<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/usuarios" color="light" />
        </IonButtons>
        <IonTitle>Editar Usuario</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <!-- Avatar -->
      <div class="avatar-container">
        <img class="avatar" :src="usuario.foto" alt="Foto" />
      </div>

      <!-- Formulario -->
      <IonList class="form-list" lines="full">
        <!-- Nombre -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Nombre Completo</IonLabel>
          <IonInput v-model="usuario.nombre"></IonInput>
        </IonItem>

        <!-- Correo -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Correo Electrónico</IonLabel>
          <IonInput v-model="usuario.correo" type="email"></IonInput>
        </IonItem>

        <!-- Rol -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Rol</IonLabel>
          <IonSelect v-model="usuario.rol" interface="action-sheet">
            <IonSelectOption value="Administrador">Administrador</IonSelectOption>
            <IonSelectOption value="Veterinario">Veterinario</IonSelectOption>
            <IonSelectOption value="Asistente">Asistente</IonSelectOption>
          </IonSelect>
        </IonItem>

        <!-- Estado -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Estado</IonLabel>
          <IonRadioGroup v-model="usuario.estado">
            <IonItem class="radio-item">
              <IonLabel>Activo</IonLabel>
              <IonRadio slot="start" value="Activo"></IonRadio>
            </IonItem>
            <IonItem class="radio-item">
              <IonLabel>Inactivo</IonLabel>
              <IonRadio slot="start" value="Inactivo"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonItem>
      </IonList>

      <!-- Botón guardar -->
      <div class="boton-guardar">
        <IonButton expand="block" color="success" @click="guardarCambios">
          Guardar Cambios
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
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonList,
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
  foto: 'https://i.pravatar.cc/150?img=1',
})

onMounted(() => {
  const id = route.params.id
  console.log('Cargar datos de usuario', id)

  // Simulación de datos precargados
  usuario.value = {
    id: id as string,
    nombre: 'Usuario de ejemplo',
    correo: 'usuario@example.com',
    rol: 'Administrador',
    estado: 'Activo',
    foto: 'https://i.pravatar.cc/150?img=3',
  }
})

const guardarCambios = () => {
  console.log('Cambios guardados:', usuario.value)
  router.push('/usuarios')
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

/* 🧍 Avatar centrado */
.avatar-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

/* 📋 Lista del formulario */
.form-list {
  background: transparent;
  margin-top: 20px;
}

/* 📄 Campos en tarjetas blancas */
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

.radio-item {
  --background: transparent;
  color: #000;
}

/* 💾 Botón */
.boton-guardar {
  padding: 16px;
}
</style>
