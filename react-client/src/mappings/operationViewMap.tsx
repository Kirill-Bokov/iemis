import { lazy } from 'react'
/* eslint-disable */
export const operationViewMap = {
  'product-storage': {
    //create: lazy(() => import('../components/DisplayPanel/views/product-storage/Create')),
    create: null as any,
    //edit: lazy(() => import('../components/DisplayPanel/views/product-storage/Edit')),
    edit: null as any,
    //delete: lazy(() => import('../components/DisplayPanel/views/product-storage/Delete')),
    delete: null as any,
    view: lazy(() => import('../components/DisplayPanel/views/product-storage/ViewProductStorage.tsx')),
  },
  'production-materials': {
    //create: lazy(() => import('../components/DisplayPanel/views/production-materials/Create')),
    create: null as any,
    //edit: lazy(() => import('../components/DisplayPanel/views/production-materials/Edit')),
    edit: null as any,
    //delete: lazy(() => import('../components/DisplayPanel/views/production-materials/Delete')),
    delete: null as any,
    //view: lazy(() => import('../components/DisplayPanel/views/production-materials/View')),
    view: null as any,
  },
  'production-reports': {
    create: lazy(() => import('../components/DisplayPanel/views/production-reports/CreateProductionReport.tsx')),
    //edit: lazy(() => import('../components/DisplayPanel/views/production-reports/EditProductionReport.tsx')),
    edit: null as any,
    delete: lazy(() => import('../components/DisplayPanel/views/production-reports/DeleteProductionReport.tsx')),
    view: lazy(() => import('../components/DisplayPanel/views/production-reports/ViewProductionReport.tsx')),
  },
  'products': {
    create: lazy(() => import('../components/DisplayPanel/views/products/CreateProduct.tsx')),
    edit: lazy(() => import('../components/DisplayPanel/views/products/EditProduct.tsx')),
    delete: lazy(() => import('../components/DisplayPanel/views/products/DeleteProduct.tsx')),
    view: lazy(() => import('../components/DisplayPanel/views/products/ViewProduct.tsx')),
  },
  'raw-materials': {
    create: lazy(() => import('../components/DisplayPanel/views/raw-materials/CreateRawMaterial.tsx')),
    edit: lazy(() => import('../components/DisplayPanel/views/raw-materials/EditRawMaterial.tsx')),
    delete: lazy(() => import('../components/DisplayPanel/views/raw-materials/DeleteRawMaterial.tsx')),
    view: lazy(() => import('../components/DisplayPanel/views/raw-materials/ViewRawMaterial.tsx')),
  },
  'raw-storage': {
    create: lazy(() => import('../components/DisplayPanel/views/raw-storage/CreateRawStorage.tsx')),
    edit: lazy(() => import('../components/DisplayPanel/views/raw-storage/EditRawStorage.tsx')),
    delete: lazy(() => import('../components/DisplayPanel/views/raw-storage/DeleteRawStorage.tsx')),
    view: lazy(() => import('../components/DisplayPanel/views/raw-storage/ViewRawStorage.tsx')),
  },
  'staff': {
    create: lazy(() => import('../components/DisplayPanel/views/staff/CreateStaff.tsx')),
    edit: lazy(() => import('../components/DisplayPanel/views/staff/EditStaff.tsx')),
    delete: lazy(() => import('../components/DisplayPanel/views/staff/DeleteStaff.tsx')),
    view: lazy(() => import('../components/DisplayPanel/views/staff/ViewStaff.tsx')),
  }
} as const

