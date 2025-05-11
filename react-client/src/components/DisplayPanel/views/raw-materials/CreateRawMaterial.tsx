import { useState } from 'react'
import apiClient from '../../../../axios'

const CreateRawMaterial = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [measure, setMeasure] = useState('')

  const handleCreate = () => {
    const payload = {
      name: name.trim(),
      price: parseFloat(price.trim()),
      measure: measure.trim()
    }

    if (!payload.name || isNaN(payload.price) || !payload.measure) {
      alert('Все поля обязательны, цена должна быть числом')
      return
    }

    apiClient
      .post('/raw-material', payload)
      .then(() => {
        alert('Сырьё успешно добавлено')
        setName('')
        setPrice('')
        setMeasure('')
      })
      .catch((err) => {
        alert('Ошибка при создании сырья')
        console.error(err)
      })
  }

  return (
    <div>
      <h2>Добавить сырьё</h2>
      <input
        type="text"
        placeholder="Название сырья"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Единица измерения"
        value={measure}
        onChange={(e) => setMeasure(e.target.value)}
      />
      <button onClick={handleCreate}>Добавить</button>
    </div>
  )
}

export default CreateRawMaterial
