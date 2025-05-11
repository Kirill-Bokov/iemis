import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'
import RawMaterialList from './RawMaterialList'

interface RawMaterial {
  id: number
  name: string
  price: number
  measure: string
}

const ViewRawMaterial = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    apiClient
      .get('/raw-material')
      .then((res) => {
        console.log("ЕЩКЕРЕ", res.data)
        setRawMaterials(res.data)
      })
      .catch(() => {
        setRawMaterials([])
      })
  }, [])

  const filteredRawMaterials =
    filter === ''
      ? rawMaterials
      : rawMaterials.filter((material) =>
          material.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Список сырья</h2>
      <input
        type="text"
        placeholder="Фильтр по названию"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <RawMaterialList rawMaterials={filteredRawMaterials} />
    </div>
  )
}

export default ViewRawMaterial
