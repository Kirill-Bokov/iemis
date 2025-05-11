import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'
import StaffList from './StaffList'

interface Staff {
  id: string
  name: string
  job_title: string
  phone: string
}

const ViewStaff = () => {
  const [staff, setStaff] = useState<Staff[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    apiClient
      .get('/staff')
      .then((res) => {
        console.log("ЕЩКЕРЕ", res.data)
        setStaff(res.data)})
      .catch(() => {
        setStaff([])
      })
  }, [])

  const filteredStaff =
    filter === ''
      ? staff
      : staff.filter((staff) =>
          staff.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Список сотрудников</h2>
      <input
        type="text"
        placeholder="Фильтр по имени"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <StaffList staff={filteredStaff} />
    </div>
  )
}

export default ViewStaff
