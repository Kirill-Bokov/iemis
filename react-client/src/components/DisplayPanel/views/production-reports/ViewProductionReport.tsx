import { useEffect, useState } from 'react'
import apiClient from '../../../../axios'

interface Staff {
  id: string
  name: string
  jobTitle: string
}

interface Product {
  id: string
  name: string
  price: number
  measure: string
}

interface ProductionMaterial {
  id: string
  rawMaterial: {
    id: string
    name: string
    price: number
    measure: string
  }
  quantity: number
}

interface ProductionReport {
  id: string
  date: string
  quantity: number
  product: Product
  responsible: Staff
  materials: ProductionMaterial[]
}

const ViewProductionReport = () => {
  const [reports, setReports] = useState<ProductionReport[]>([])
  const [filter, setFilter] = useState({
    responsibleName: '',
    date: '',
    productName: '',
  })

  useEffect(() => {
    apiClient
      .get('/production-reports')
      .then((res) => {
        setReports(res.data)
      })
      .catch(() => {
        setReports([])
      })
  }, [])

  const filteredReports = reports.filter((report) => {
    const { responsibleName, date, productName } = filter
    return (
      (responsibleName === '' || report.responsible.name.toLowerCase().includes(responsibleName.toLowerCase())) &&
      (date === '' || new Date(report.date).toLocaleDateString().includes(date)) &&
      (productName === '' || report.product.name.toLowerCase().includes(productName.toLowerCase()))
    )
  })

  return (
    <div>
      <h2>Список актов производства</h2>
      <input
        type="text"
        placeholder="Фильтр по имени ответственного"
        value={filter.responsibleName}
        onChange={(e) => setFilter({ ...filter, responsibleName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Фильтр по дате"
        value={filter.date}
        onChange={(e) => setFilter({ ...filter, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Фильтр по продукту"
        value={filter.productName}
        onChange={(e) => setFilter({ ...filter, productName: e.target.value })}
      />
      <div>
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div key={report.id}>
              <h4>Акт производства {report.id}</h4>
              <div>Продукт: {report.product.name}</div>
              <div>Количество: {report.quantity} {report.product.measure}</div>
              <div>Ответственный: {report.responsible.name}</div>
              <div>Дата: {new Date(report.date).toLocaleDateString()}</div>
              <h4>Сырьё, использованное в производстве:</h4>
              <ul>
                {report.materials.map((material) => (
                  <li key={material.id}>
                    <div>Сырьё: {material.rawMaterial.name}</div>
                    <div>Количество: {material.quantity} {material.rawMaterial.measure}</div>
                    <div>Цена за единицу: {material.rawMaterial.price}</div>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div>Акты не найдены</div>
        )}
      </div>
    </div>
  )
}

export default ViewProductionReport
