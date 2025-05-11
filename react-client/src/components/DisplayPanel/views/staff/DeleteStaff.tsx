import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'

interface Staff {
  id: number
  name: string
  job_title: string
  phone: string
}

const DeleteStaff = () => {
  const [staff, setStaff] = useState<Staff[]>([])
  const [filter, setFilter] = useState('')
  const [deleteId, setDeleteId] = useState('')

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = () => {
    apiClient
      .get('/staff')
      .then((res) => {
        setStaff(res.data)
      })
      .catch(() => {
        setStaff([])
      })
  }

  const handleDelete = () => {
    const id = deleteId.trim()

    if (!id) {
      alert('Выберите сотрудника для удаления')
      return
    }

    apiClient
      .delete(`/staff/${id}`)
      .then(() => {
        alert(`Сотрудник с id ${id} удалён`)
        fetchStaff()
        setDeleteId('')
      })
      .catch((err) => {
        alert('Ошибка при удалении сотрудника')
        console.error(err)
      })
  }

  const filteredStaff =
    filter === ''
      ? staff
      : staff.filter((staff) =>
          staff.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <div>
        <h3>Удалить сотрудника</h3>
        <select
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        >
          <option value="">Выберите сотрудника</option>
          {staff.map((s) => (
            <option key={s.id} value={s.id}>
              {`${s.name} (${s.job_title})`}
            </option>
          ))}
        </select>
        <button onClick={handleDelete}>Удалить</button>
      </div>

      <h2>Список сотрудников</h2>

      <input
        type="text"
        placeholder="Фильтр по имени"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul>
        {filteredStaff.length === 0 ? (
          <li>Сотрудники не найдены</li>
        ) : (
          filteredStaff.map((s) => (
            <li key={s.id}>
              <div>ID: {s.id}</div>
              <div>Имя: {s.name}</div>
              <div>Должность: {s.job_title}</div>
              <div>Телефон: {s.phone}</div>
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default DeleteStaff
