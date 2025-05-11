import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'

interface RawMaterial {
  id: string
  name: string
  unit: string
  price: number
}

interface RawStorage {
  id: string
  raw_material: RawMaterial
  quantity: number
  date_of_receipt: string
}

const DeleteRawStorage = () => {
  const [storage, setStorage] = useState<RawStorage[]>([])
  const [filter, setFilter] = useState('')
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    fetchStorage()
  }, [])

  const fetchStorage = () => {
    apiClient
      .get('/raw-storage')
      .then((res) => {
        setStorage(res.data)
      })
      .catch(() => {
        setStorage([])
      })
  }

  const handleDelete = () => {
    const id = selectedId.trim()
    if (!id) {
      alert('Выберите запись для удаления')
      return
    }

    apiClient
      .delete(`/raw-storage/${id}`)
      .then(() => {
        alert(`Запись на складе с id ${id} удалена`)
        fetchStorage()
        setSelectedId('')
      })
      .catch((err) => {
        alert('Ошибка при удалении')
        console.error(err)
      })
  }

  const filteredStorage =
    filter === ''
      ? storage
      : storage.filter((item) =>
          item.raw_material.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <div>
        <h3>Удалить запись со склада</h3>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Выберите запись для удаления</option>
          {storage.map((item) => (
            <option key={item.id} value={item.id}>
              {`${item.raw_material.name} (${item.id}) — количество: ${item.quantity}`}
            </option>
          ))}
        </select>
        <button onClick={handleDelete}>Удалить</button>
      </div>

      <h2>Склад сырья</h2>
      <input
        type="text"
        placeholder="Фильтр по названию"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul>
        {filteredStorage.length === 0 ? (
          <li>Записи не найдены</li>
        ) : (
          filteredStorage.map((item) => (
            <li key={item.id}>
              <div>ID: {item.id}</div>
              <div>Наименование: {item.raw_material.name}</div>
              <div>Количество: {item.quantity} {item.raw_material.unit}</div>
              <div>Дата поступления: {new Date(item.date_of_receipt).toLocaleString()}</div>
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default DeleteRawStorage
