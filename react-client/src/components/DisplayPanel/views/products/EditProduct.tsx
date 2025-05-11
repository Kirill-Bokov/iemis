import { useState, useEffect } from 'react'
import apiClient from '../../../../axios'

interface Product {
  id: number
  name: string
  price: number
  measure: string
}

const EditProduct = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [measure, setMeasure] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    apiClient
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
  }

  const handleEdit = () => {
    if (!selectedId.trim()) {
      alert('Выберите продукт')
      return
    }

    const payload: Record<string, string | number> = {}
    if (name.trim()) payload.name = name.trim()
    if (price.trim()) payload.price = parseFloat(price.trim())
    if (measure.trim()) payload.measure = measure.trim()

    if (Object.keys(payload).length === 0) {
      alert('Нужно указать хотя бы одно поле для обновления')
      return
    }

    apiClient
      .patch(`/products/${selectedId}`, payload)
      .then(() => {
        alert('Продукт успешно обновлён')
        fetchProducts()
        setSelectedId('')
        setName('')
        setPrice('')
        setMeasure('')
      })
      .catch((err) => {
        alert('Ошибка при обновлении продукта')
        console.error(err)
      })
  }

  return (
    <div>
      <h2>Обновить продукт</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Выберите продукт</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {`${p.name} (ID ${p.id}) — ${p.measure}, ${p.price}`}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Новое название (опционально)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Новая цена (опционально)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Новая единица измерения (опционально)"
        value={measure}
        onChange={(e) => setMeasure(e.target.value)}
      />
      <button onClick={handleEdit} disabled={!selectedId}>
        Обновить
      </button>
    </div>
  )
}

export default EditProduct
