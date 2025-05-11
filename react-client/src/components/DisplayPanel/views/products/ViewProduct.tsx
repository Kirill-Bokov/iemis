import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'
import ProductList from './ProductList'

interface Product {
  id: number
  name: string
  price: number
  measure: string
}

const ViewProduct = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    apiClient
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
  }, [])

  const filtered =
    filter === ''
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Список продуктов</h2>
      <input
        type="text"
        placeholder="Фильтр по названию"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ProductList products={filtered} />
    </div>
  )
}

export default ViewProduct
