import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'
import ProductStorageList from './ProductStorageList'

interface Product {
  id: number
  name: string
  price: number
  measure: string
}

interface ProductStorage {
  id: string
  product: Product
  quantity: number
  dateOfReceipt: string
}

const ViewProductStorage = () => {
  const [productStorage, setProductStorage] = useState<ProductStorage[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    apiClient
      .get('/product-storage')
      .then((res) => {
        console.log('RESPONSE DATA', res.data)
        setProductStorage(res.data)
      })
      .catch(() => {
        setProductStorage([])
      })
  }, [])

  const filteredStorage =
    filter === ''
      ? productStorage
      : productStorage.filter((item) =>
          item.product.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Склад готовой продукции</h2>
      <input
        type="text"
        placeholder="Фильтр по названию продукта"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ProductStorageList storageItems={filteredStorage} />
    </div>
  )
}

export default ViewProductStorage
