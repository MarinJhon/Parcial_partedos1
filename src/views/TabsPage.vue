<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="usuarios" href="/usuarios">
          <ion-icon aria-hidden="true" :icon="peopleOutline" />
          <ion-label>Usuarios</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="mascotas" href="/mascotas">
          <ion-icon aria-hidden="true" :icon="pawOutline" />
          <ion-label>Mascotas</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tipos" href="/tipos">
          <ion-icon aria-hidden="true" :icon="listOutline" />
          <ion-label>Tipos</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="productos" href="/productos">
          <ion-icon aria-hidden="true" :icon="pricetagOutline" />
          <ion-label>Productos</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="categorias" href="/categorias">
          <ion-icon aria-hidden="true" :icon="albumsOutline" />
          <ion-label>Categorías</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, peopleOutline, pawOutline, listOutline, pricetagOutline, albumsOutline } from 'ionicons/icons';
</script>
