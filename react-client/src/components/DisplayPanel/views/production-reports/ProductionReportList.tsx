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

const ProductionReportList = () => {
  const [reports, setReports] = useState<ProductionReport[]>([])
  const [filter, setFilter] = useState('')

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

  const filteredReports =
    filter === ''
      ? reports
      : reports.filter((report) =>
          report.product.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Список актов производства</h2>
      <input
        type="text"
        placeholder="Фильтр по продукту"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredReports.length === 0 ? (
          <div>Акты производства не найдены</div>
        ) : (
          filteredReports.map((report) => (
            <li key={report.id}>
              <div>ID: {report.id}</div>
              <div>Продукт: {report.product.name}</div>
              <div>Количество: {report.quantity} {report.product.measure}</div>
              <div>Ответственный: {report.responsible.name}</div>
              <div>Дата: {new Date(report.date).toLocaleDateString()}</div>
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default ProductionReportList
