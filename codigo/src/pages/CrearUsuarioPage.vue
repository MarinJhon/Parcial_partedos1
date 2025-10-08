<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar class="toolbar-azul">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/usuarios" color="light" />
        </IonButtons>
        <IonTitle>Crear Usuario</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="fondo-azul">
      <IonList class="form-list" lines="full">
        <!-- Nombre -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Nombre Completo</IonLabel>
          <IonInput
            v-model="form.nombre"
            placeholder="Ingrese el nombre completo"
          ></IonInput>
        </IonItem>
        <IonNote v-if="errores.nombre" color="danger" class="error-note">
          {{ errores.nombre }}
        </IonNote>

        <!-- Correo -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Correo Electrónico</IonLabel>
          <IonInput
            v-model="form.correo"
            placeholder="Ingrese el correo electrónico"
            type="email"
          ></IonInput>
        </IonItem>
        <IonNote v-if="errores.correo" color="danger" class="error-note">
          {{ errores.correo }}
        </IonNote>

        <!-- Rol -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Rol</IonLabel>
          <IonSelect
            v-model="form.rol"
            placeholder="Seleccione el rol"
            interface="action-sheet"
          >
            <IonSelectOption value="Administrador">Administrador</IonSelectOption>
            <IonSelectOption value="Veterinario">Veterinario</IonSelectOption>
            <IonSelectOption value="Asistente">Asistente</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonNote v-if="errores.rol" color="danger" class="error-note">
          {{ errores.rol }}
        </IonNote>

        <!-- Contraseña -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            v-model="form.contrasena"
            type="password"
            placeholder="Ingrese la contraseña"
          ></IonInput>
        </IonItem>
        <IonNote v-if="errores.contrasena" color="danger" class="error-note">
          {{ errores.contrasena }}
        </IonNote>

        <!-- Estado -->
        <IonItem class="item-blanco">
          <IonLabel position="stacked">Estado</IonLabel>
          <IonRadioGroup v-model="form.estado">
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

        <!-- Foto -->
        <IonItem class="item-blanco upload-container">
          <IonLabel position="stacked">Foto (opcional)</IonLabel>
          <input type="file" accept="image/*" @change="onFileSelected" class="file-input" />
          <IonText color="medium" class="file-hint">
            PNG, JPG o GIF (máx. 1MB)
          </IonText>
        </IonItem>
      </IonList>

      <!-- Botón Crear -->
      <div class="boton-crear">
        <IonButton expand="block" color="success" @click="crearUsuario">
          Crear Usuario
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonBackButton,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonText,
  IonNote,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  nombre: '',
  correo: '',
  rol: '',
  contrasena: '',
  estado: 'Activo',
  foto: null as File | null,
})

const errores = ref({
  nombre: '',
  correo: '',
  rol: '',
  contrasena: '',
})

// Validaciones básicas
const validarFormulario = () => {
  errores.value = { nombre: '', correo: '', rol: '', contrasena: '' }

  let valido = true
  if (!form.value.nombre) {
    errores.value.nombre = 'El nombre es obligatorio'
    valido = false
  }
  if (!form.value.correo || !/\S+@\S+\.\S+/.test(form.value.correo)) {
    errores.value.correo = 'Correo electrónico inválido'
    valido = false
  }
  if (!form.value.rol) {
    errores.value.rol = 'Debe seleccionar un rol'
    valido = false
  }
  if (!form.value.contrasena || form.value.contrasena.length < 6) {
    errores.value.contrasena = 'Mínimo 6 caracteres'
    valido = false
  }

  return valido
}

const crearUsuario = () => {
  if (!validarFormulario()) return
  console.log('Usuario creado:', form.value)
  router.push('/usuarios')
}

const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.value.foto = input.files[0]
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

.radio-item {
  --background: transparent;
}

/* 🖼 Archivo */
.file-input {
  margin-top: 8px;
  background: white;
  color: #000;
  border: 1px dashed #ccc;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
}

.file-hint {
  font-size: 0.75rem;
  margin-top: 4px;
}

/* 📝 Errores */
.error-note {
  margin-left: 16px;
  font-size: 0.8rem;
}

/* ✅ Botón */
.boton-crear {
  padding: 16px;
}
</style>
