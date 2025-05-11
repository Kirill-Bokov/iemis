import { useState, useEffect } from 'react'
import apiClient from '../../../../axios'

interface RawMaterial {
  id: string
  name: string
}

const CreateRawStorage = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
  const [materialId, setMaterialId] = useState('')
  const [quantity, setQuantity] = useState('')

  useEffect(() => {
    apiClient
      .get('/raw-material')
      .then((res) => setRawMaterials(res.data))
      .catch(() => setRawMaterials([]))
  }, [])

  const handleCreate = () => {
    const trimmedId = materialId.trim()
    const parsedQuantity = parseFloat(quantity)

    if (!trimmedId || isNaN(parsedQuantity)) {
      alert('Выберите сырьё и введите корректное количество')
      return
    }

    apiClient
      .post('/raw-storage', {
        raw_material_id: trimmedId,
        quantity: parsedQuantity
      })
      .then(() => {
        alert('Запись успешно создана')
        setMaterialId('')
        setQuantity('')
      })
      .catch((err) => {
        alert('Ошибка при создании записи')
        console.error(err)
      })
  }

  return (
    <div>
      <h2>Добавить запись на склад сырья</h2>
      <select value={materialId} onChange={(e) => setMaterialId(e.target.value)}>
        <option value="">Выберите сырьё</option>
        {rawMaterials.map((mat) => (
          <option key={mat.id} value={mat.id}>
            {`${mat.name} (${mat.id})`}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Количество"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleCreate}>Создать</button>
    </div>
  )
}

export default CreateRawStorage
