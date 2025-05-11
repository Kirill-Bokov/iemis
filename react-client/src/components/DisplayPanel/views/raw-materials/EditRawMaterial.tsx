import { useState, useEffect } from 'react'
import apiClient from '../../../../axios'

interface RawMaterial {
  id: string
  name: string
  price: number
  measure: string
}

const EditRawMaterial = () => {
  const [materials, setMaterials] = useState<RawMaterial[]>([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [measure, setMeasure] = useState('')

  useEffect(() => {
    apiClient
      .get('/raw-material')
      .then((res) => setMaterials(res.data))
      .catch(() => setMaterials([]))
  }, [])

  const handleEdit = () => {
    if (!id.trim()) {
      alert('Материал должен быть выбран')
      return
    }

    const payload: Record<string, string | number> = {}

    if (name.trim()) payload.name = name.trim()
    if (price.trim()) {
      const parsedPrice = parseFloat(price)
      if (!isNaN(parsedPrice)) payload.price = parsedPrice
      else {
        alert('Цена должна быть числом')
        return
      }
    }
    if (measure.trim()) payload.measure = measure.trim()

    if (Object.keys(payload).length === 0) {
      alert('Нужно указать хотя бы одно поле для обновления')
      return
    }

    apiClient
      .patch(`/raw-material/${id}`, payload)
      .then(() => {
        alert('Материал успешно обновлён')
        setId('')
        setName('')
        setPrice('')
        setMeasure('')
      })
      .catch((err) => {
        alert('Ошибка при обновлении материала')
        console.error(err)
      })
  }

  return (
    <div>
      <h2>Обновить материал</h2>

      <select value={id} onChange={(e) => setId(e.target.value)}>
        <option value="">Выберите материал</option>
        {materials.map((mat) => (
          <option key={mat.id} value={mat.id}>
            {`${mat.name} (ID ${mat.id}) — ${mat.measure}, ${mat.price}`}
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
      <button onClick={handleEdit} disabled={!id}>
        Обновить
      </button>
    </div>
  )
}

export default EditRawMaterial
