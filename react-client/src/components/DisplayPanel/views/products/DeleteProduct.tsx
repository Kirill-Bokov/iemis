import { useState, useEffect } from 'react'
import apiClient from '../../../../axios'

interface Product {
  id: number
  name: string
  price: number
  measure: string
}

const DeleteProduct = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('')
  const [deleteId, setDeleteId] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    apiClient
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
  }

  const handleDelete = () => {
    if (!deleteId.trim()) {
      alert('Выберите ID для удаления')
      return
    }

    apiClient
      .delete(`/products/${deleteId}`)
      .then(() => {
        alert(`Продукт с ID ${deleteId} удалён`)
        fetchProducts()
        setDeleteId('')
      })
      .catch((err) => {
        alert('Ошибка при удалении продукта')
        console.error(err)
      })
  }

  const filteredProducts =
    filter === ''
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <div>
        <h3>Удалить продукт</h3>

        <select value={deleteId} onChange={(e) => setDeleteId(e.target.value)}>
          <option value="">Выберите продукт для удаления</option>
          {filteredProducts.map((p) => (
            <option key={p.id} value={p.id}>
              {`${p.name} (ID ${p.id}) — ${p.measure}, ${p.price}`}
            </option>
          ))}
        </select>

        <button onClick={handleDelete} disabled={!deleteId}>
          Удалить
        </button>
      </div>

      <h2>Список продуктов</h2>

      <input
        type="text"
        placeholder="Фильтр по названию"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul>
        {filteredProducts.length === 0 ? (
          <li>Продукты не найдены</li>
        ) : (
          filteredProducts.map((p) => (
            <li key={p.id}>
              <div>ID: {p.id}</div>
              <div>Название: {p.name}</div>
              <div>Цена: {p.price}</div>
              <div>Единица измерения: {p.measure}</div>
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default DeleteProduct
