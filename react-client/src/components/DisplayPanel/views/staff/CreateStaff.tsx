import { useState } from 'react'
import apiClient from '../../../../axios'

const CreateStaff = () => {
  const [name, setName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [phone, setPhone] = useState('')

  const handleCreate = () => {
    const payload = {
      name: name.trim(),
      job_title: jobTitle.trim(),
      phone: phone.trim()
    }

    if (!payload.name || !payload.job_title || !payload.phone) {
      alert('Все поля обязательны')
      return
    }

    apiClient
      .post('/staff', payload)
      .then(() => {
        alert('Сотрудник успешно добавлен')
        setName('')
        setJobTitle('')
        setPhone('')
      })
      .catch((err) => {
        alert('Ошибка при создании сотрудника')
        console.error(err)
      })
  }

  return (
    <div>
      <h2>Добавить сотрудника</h2>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Должность"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleCreate}>Добавить</button>
    </div>
  )
}

export default CreateStaff
