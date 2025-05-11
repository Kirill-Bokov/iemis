import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'
import RawStorageList from './RawStorageList'

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

const ViewRawStorage = () => {
  const [storage, setStorage] = useState<RawStorage[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    apiClient
      .get('/raw-storage')
      .then((res) => {
        setStorage(res.data)
      })
      .catch(() => {
        setStorage([])
      })
  }, [])

  const filteredStorage =
    filter === ''
      ? storage
      : storage.filter((entry) =>
          entry.raw_material.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Склад сырья</h2>
      <input
        type="text"
        placeholder="Фильтр по названию сырья"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <RawStorageList storage={filteredStorage} />
    </div>
  )
}

export default ViewRawStorage
