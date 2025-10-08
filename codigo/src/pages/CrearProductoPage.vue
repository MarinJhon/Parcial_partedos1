<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/productos" color="light" />
        </IonButtons>
        <IonTitle>Nuevo Producto</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <IonList class="form-list" lines="full">
        <!-- Nombre -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput v-model="form.nombre" placeholder="Ingrese nombre"></IonInput>
        </IonItem>
        <IonNote v-if="errores.nombre" color="danger" class="error-note">{{ errores.nombre }}</IonNote>

        <!-- Categoría -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Categoría</IonLabel>
          <IonSelect v-model="form.categoria" interface="popover" placeholder="Seleccione categoría">
            <IonSelectOption v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonNote v-if="errores.categoria" color="danger" class="error-note">{{ errores.categoria }}</IonNote>

        <!-- Tipo de animal -->
        <div class="tipo-animal-container">
          <p class="tipo-label">Tipo de Animal</p>
          <div class="tipo-options">
            <IonChip
              v-for="tipo in tiposAnimales"
              :key="tipo"
              :color="form.tipos.includes(tipo) ? 'success' : 'medium'"
              @click="toggleTipo(tipo)"
            >
              {{ tipo }}
            </IonChip>
          </div>
        </div>

        <!-- Descripción -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            v-model="form.descripcion"
            placeholder="Ingrese descripción"
            autoGrow
          ></IonTextarea>
        </IonItem>

        <!-- Precio y Stock -->
        <div class="fila-precio-stock">
          <IonItem class="item-blanco">
            <IonLabel position="stacked">Precio</IonLabel>
            <IonInput v-model.number="form.precio" type="number" min="0" placeholder="0.00"></IonInput>
          </IonItem>
          <IonItem class="item-blanco">
            <IonLabel position="stacked">Stock</IonLabel>
            <IonInput v-model.number="form.stock" type="number" min="0" placeholder="0"></IonInput>
          </IonItem>
        </div>

        <!-- Imagen -->
        <div class="imagen-container">
          <p class="imagen-label">Imagen del Producto</p>
          <input type="file" accept="image/*" @change="handleFileUpload" />
          <div v-if="form.imagenPreview" class="preview">
            <img :src="form.imagenPreview" alt="Vista previa" />
          </div>
        </div>
      </IonList>

      <!-- Botones -->
      <div class="botones">
        <IonButton expand="block" color="medium" @click="cancelar">Cancelar</IonButton>
        <IonButton expand="block" color="success" @click="guardarProducto">Guardar</IonButton>
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
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonChip,
  IonButton,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const categorias = ['Alimentos', 'Medicamentos', 'Accesorios', 'Higiene', 'Otros']
const tiposAnimales = ['Perros', 'Gatos', 'Aves']

const form = ref({
  nombre: '',
  categoria: '',
  tipos: [] as string[],
  descripcion: '',
  precio: 0,
  stock: 0,
  imagenFile: null as File | null,
  imagenPreview: '',
})

const errores = ref({
  nombre: '',
  categoria: '',
})

const toggleTipo = (tipo: string) => {
  const index = form.value.tipos.indexOf(tipo)
  if (index >= 0) {
    form.value.tipos.splice(index, 1)
  } else {
    form.value.tipos.push(tipo)
  }
}

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
  errores.value = { nombre: '', categoria: '' }
  let valido = true

  if (!form.value.nombre) {
    errores.value.nombre = 'El nombre es obligatorio'
    valido = false
  }
  if (!form.value.categoria) {
    errores.value.categoria = 'Seleccione una categoría'
    valido = false
  }

  return valido
}

const guardarProducto = () => {
  if (!validar()) return
  console.log('Producto guardado:', form.value)
  router.push('/productos')
}

const cancelar = () => {
  router.push('/productos')
}
</script>

<style scoped>
/* 🌊 Fondo azul */
.fondo-azul {
  --background: #0a4abf;
  background-color: #0a4abf;
}

/* 🔹 Toolbar */
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

.error-note {
  margin-left: 16px;
  font-size: 0.8rem;
}

/* 🐾 Chips */
.tipo-animal-container {
  padding: 16px;
}

.tipo-label {
  color: white;
  margin-bottom: 8px;
}

.tipo-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 💵 Precio / Stock */
.fila-precio-stock {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 0 16px;
  margin-top: 8px;
}

/* 🖼 Imagen */
.imagen-container {
  padding: 16px;
}

.imagen-label {
  color: white;
  margin-bottom: 8px;
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

/* ✅ Botones */
.botones {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
