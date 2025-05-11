import { useState, useEffect } from 'react'
import apiClient from '../../../../axios'

interface RawStorageEntry {
  id: string
  quantity: number
  raw_material: {
    id: string
    name: string
  }
}

const EditRawStorage = () => {
  const [storageEntries, setStorageEntries] = useState<RawStorageEntry[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [quantity, setQuantity] = useState('')

  useEffect(() => {
    apiClient
      .get('/raw-storage')
      .then((res) => setStorageEntries(res.data))
      .catch(() => setStorageEntries([]))
  }, [])

  const handleEdit = () => {
    const trimmedId = selectedId.trim()
    const parsedQuantity = parseFloat(quantity)

    if (!trimmedId || isNaN(parsedQuantity)) {
      alert('Выберите запись и введите корректное количество')
      return
    }

    apiClient
      .patch(`/raw-storage/${trimmedId}`, {
        quantity: parsedQuantity
      })
      .then(() => {
        alert('Количество успешно обновлено')
        setSelectedId('')
        setQuantity('')
      })
      .catch((err) => {
        alert('Ошибка при обновлении количества')
        console.error(err)
      })
  }

  return (
    <div>
      <h2>Изменить количество на складе</h2>
      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        <option value="">Выберите запись склада</option>
        {storageEntries.map((entry) => (
          <option key={entry.id} value={entry.id}>
            {`${entry.raw_material.name} (${entry.id}) — текущее: ${entry.quantity}`}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Новое количество"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleEdit}>Обновить</button>
    </div>
  )
}

export default EditRawStorage
