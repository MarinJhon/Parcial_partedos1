import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/usuarios',
    component: () => import('@/pages/UsuariosPage.vue')
  },
  {
    path: '/usuarios/crear',
    component: () => import('@/pages/CrearUsuarioPage.vue')
  },
  {
    path: '/usuarios/detalle/:id',
    component: () => import('@/pages/DetalleUsuarioPage.vue')
  },
  {
    path: '/usuarios/editar/:id',
    component: () => import('@/pages/EditarUsuarioPage.vue')
  },
  {
    path: '/mascotas',
    component: () => import('@/pages/MascotasPage.vue')
  },
  {
    path: '/mascotas/crear',
    component: () => import('@/pages/CrearMascotaPage.vue')
  },
  {
    path: '/mascotas/editar/:id',
    component: () => import('@/pages/EditarMascotaPage.vue')
  },
  {
    path: '/mascotas/detalle/:id',
    component: () => import('@/pages/DetalleMascotaPage.vue')
  },
  {
    path: '/tipos',
    component: () => import('@/pages/TiposMascotasPage.vue')
  },
  {
    path: '/tipos/crear',
    component: () => import('@/pages/CrearTipoMascotaPage.vue')
  },
  {
    path: '/tipos/editar/:id',
    component: () => import('@/pages/EditarTipoMascotaPage.vue')
  },
  {
    path: '/productos',
    component: () => import('@/pages/ProductosPage.vue')
  },
  {
    path: '/productos/crear',
    component: () => import('@/pages/CrearProductoPage.vue')
  },
  {
    path: '/productos/detalle/:id',
    component: () => import('@/pages/DetalleProductoPage.vue')
  },
  {
    path: '/productos/editar/:id',
    component: () => import('@/pages/EditarProductoPage.vue')
  },
  {
    path: '/categorias',
    component: () => import('@/pages/CategoriasPage.vue')
  },
  {
    path: '/categorias/crear',
    component: () => import('@/pages/CrearCategoriaPage.vue')
  },
  {
    path: '/categorias/editar/:id',
    component: () => import('@/pages/EditarCategoriaPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/pages/UsuariosPage.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/pages/MascotasPage.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/pages/ProductosPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
