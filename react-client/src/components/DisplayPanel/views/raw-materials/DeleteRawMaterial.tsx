import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'

interface RawMaterial {
  id: number
  name: string
  price: number
  measure: string
}

const DeleteRawMaterials = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
  const [filter, setFilter] = useState('')
  const [deleteId, setDeleteId] = useState('')

  useEffect(() => {
    fetchRawMaterials()
  }, [])

  const fetchRawMaterials = () => {
    apiClient
      .get('/raw-material')
      .then((res) => setRawMaterials(res.data))
      .catch(() => setRawMaterials([]))
  }

  const handleDelete = () => {
    if (!deleteId.trim()) {
      alert('Выберите ID для удаления')
      return
    }

    apiClient
      .delete(`/raw-material/${deleteId}`)
      .then(() => {
        alert(`Сырьё с ID ${deleteId} удалено`)
        fetchRawMaterials()
        setDeleteId('')
      })
      .catch((err) => {
        alert('Ошибка при удалении сырья')
        console.error(err)
      })
  }

  const filteredMaterials =
    filter === ''
      ? rawMaterials
      : rawMaterials.filter((mat) =>
          mat.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <div>
        <h3>Удалить сырьё</h3>

        <select value={deleteId} onChange={(e) => setDeleteId(e.target.value)}>
          <option value="">Выберите сырьё для удаления</option>
          {filteredMaterials.map((mat) => (
            <option key={mat.id} value={mat.id}>
              {`${mat.name} (ID ${mat.id}) — ${mat.measure}, ${mat.price}`}
            </option>
          ))}
        </select>

        <button onClick={handleDelete} disabled={!deleteId}>
          Удалить
        </button>
      </div>

      <h2>Список сырья</h2>

      <input
        type="text"
        placeholder="Фильтр по названию"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul>
        {filteredMaterials.length === 0 ? (
          <li>Сырьё не найдено</li>
        ) : (
          filteredMaterials.map((mat) => (
            <li key={mat.id}>
              <div>ID: {mat.id}</div>
              <div>Название: {mat.name}</div>
              <div>Цена за единицу: {mat.price}</div>
              <div>Единица измерения: {mat.measure}</div>
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default DeleteRawMaterials
