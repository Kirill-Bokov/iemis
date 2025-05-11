import { useState, useEffect } from 'react'
import apiClient from '../../../../axios'

interface Responsible {
  id: string
  name: string
}

interface ReportProduct {
  id: number
  name: string
}

interface Report {
  id: string
  product: ReportProduct
  responsible: Responsible
}

const DeleteProductionReport = () => {
  const [reportList, setReportList] = useState<Report[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReportId, setSelectedReportId] = useState('')

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = () => {
    apiClient
      .get('/production-reports')
      .then((res) => setReportList(res.data))
      .catch(() => setReportList([]))
  }

  const handleReportDeletion = () => {
    if (!selectedReportId.trim()) {
      alert('Выберите отчёт для удаления')
      return
    }

    apiClient
      .delete(`/production-reports/${selectedReportId}`)
      .then(() => {
        alert(`Отчёт с ID ${selectedReportId} удалён`)
        loadReports()
        setSelectedReportId('')
      })
      .catch((err) => {
        alert('Ошибка при удалении отчёта')
        console.error(err)
      })
  }

  const visibleReports =
    searchTerm === ''
      ? reportList
      : reportList.filter((r) =>
          r.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

  return (
    <div>
      <div>
        <h3>Удалить отчёт о производстве</h3>

        <select
          value={selectedReportId}
          onChange={(e) => setSelectedReportId(e.target.value)}
        >
          <option value="">Выберите отчёт</option>
          {visibleReports.map((r) => (
            <option key={r.id} value={r.id}>
              {`${r.product.name} (ID ${r.id}) — ${r.responsible.name}`}
            </option>
          ))}
        </select>

        <button onClick={handleReportDeletion} disabled={!selectedReportId}>
          Удалить
        </button>
      </div>

      <h2>Список отчётов</h2>

      <input
        type="text"
        placeholder="Фильтр по названию продукта"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {visibleReports.length === 0 ? (
          <li>Отчёты не найдены</li>
        ) : (
          visibleReports.map((r) => (
            <li key={r.id}>
              <div>ID: {r.id}</div>
              <div>Продукт: {r.product.name}</div>
              <div>Ответственный: {r.responsible.name}</div>
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default DeleteProductionReport
