<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/categorias" color="light" />
        </IonButtons>
        <IonTitle>Nueva Categoría</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <IonList class="form-list" lines="full">
        <!-- ID Categoría -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">ID Categoría</IonLabel>
          <IonInput v-model="form.id" placeholder="Ingrese ID"></IonInput>
        </IonItem>
        <IonNote v-if="errores.id" color="danger" class="error-note">{{ errores.id }}</IonNote>

        <!-- Nombre -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput v-model="form.nombre" placeholder="Ingrese nombre"></IonInput>
        </IonItem>
        <IonNote v-if="errores.nombre" color="danger" class="error-note">{{ errores.nombre }}</IonNote>

        <!-- Descripción -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            v-model="form.descripcion"
            placeholder="Ingrese descripción"
            autoGrow
          ></IonTextarea>
        </IonItem>

        <!-- Imagen / Ícono -->
        <div class="imagen-container">
          <p class="imagen-label">Imagen / Ícono</p>
          <input type="file" accept="image/*" @change="handleFileUpload" class="file-input" />
          <div v-if="form.imagenPreview" class="preview">
            <img :src="form.imagenPreview" alt="Vista previa" />
          </div>
        </div>
      </IonList>

      <!-- Botones -->
      <div class="botones">
        <IonButton expand="block" color="medium" @click="cancelar">Cancelar</IonButton>
        <IonButton expand="block" color="success" @click="guardarCategoria">Guardar</IonButton>
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
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonTextarea,
  IonButton,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  id: '',
  nombre: '',
  descripcion: '',
  imagenFile: null as File | null,
  imagenPreview: '',
})

const errores = ref({
  id: '',
  nombre: '',
})

const handleFileUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    form.value.imagenFile = file
    const reader = new FileReader()
    reader.onload = () => {
      form.value.imagenPreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const validar = () => {
  errores.value = { id: '', nombre: '' }
  let valido = true

  if (!form.value.id) {
    errores.value.id = 'El ID es obligatorio'
    valido = false
  }
  if (!form.value.nombre) {
    errores.value.nombre = 'El nombre es obligatorio'
    valido = false
  }

  return valido
}

const guardarCategoria = () => {
  if (!validar()) return
  console.log('Categoría guardada:', form.value)
  router.push('/categorias')
}

const cancelar = () => {
  router.push('/categorias')
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
  padding-top: 8px;
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

/* ⚠️ Errores */
.error-note {
  margin-left: 16px;
  font-size: 0.8rem;
}

/* 🖼 Imagen */
.imagen-container {
  padding: 16px;
}

.imagen-label {
  color: white;
  margin-bottom: 8px;
}

.file-input {
  background: white;
  border: 1px dashed #ccc;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
}

.preview {
  margin-top: 10px;
  text-align: center;
}

.preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid var(--ion-border-color);
}

/* 🟢 Botones */
.botones {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
