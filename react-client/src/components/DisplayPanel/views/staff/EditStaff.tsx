import { useState, useEffect } from 'react'
import apiClient from '../../../../axios'

interface Staff {
  id: string
  name: string
  job_title: string
  phone: string
}

const EditStaff = () => {
  const [staff, setStaff] = useState<Staff[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [name, setName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [phone, setPhone] = useState('')

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

  const handleEdit = () => {
    const trimmedId = selectedId.trim()
    if (!trimmedId) {
      alert('Выберите сотрудника')
      return
    }

    const payload: Record<string, string> = {}

    if (name.trim()) payload.name = name.trim()
    if (jobTitle.trim()) payload.job_title = jobTitle.trim()
    if (phone.trim()) payload.phone = phone.trim()

    if (Object.keys(payload).length === 0) {
      alert('Нужно указать хотя бы одно поле для обновления')
      return
    }

    apiClient
      .patch(`/staff/${trimmedId}`, payload)
      .then(() => {
        alert('Сотрудник успешно обновлён')
        setSelectedId('')
        setName('')
        setJobTitle('')
        setPhone('')
      })
      .catch((err) => {
        alert('Ошибка при обновлении сотрудника')
        console.error(err)
      })
  }

  return (
    <div>
      <h2>Обновить сотрудника</h2>

      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        <option value="">Выберите сотрудника</option>
        {staff.map((item) => (
          <option key={item.id} value={item.id}>
            {`${item.name} (${item.job_title})`}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Имя (опционально)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Должность (опционально)"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Телефон (опционально)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleEdit}>Обновить</button>
    </div>
  )
}

export default EditStaff
