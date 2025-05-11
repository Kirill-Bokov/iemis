import React from "react"
import { EntityType, OperationType } from "../../types/viewTypes"

interface Props {
  setEntity: (e: EntityType) => void
  setOperation: (o: OperationType) => void
}

const entityLabels: Record<EntityType, string> = {
  'product-storage': 'Склад готовой продукции',
  'production-reports': 'Акты производства',
  'products': 'Типы продукции',
  'raw-materials': 'Типы сырья',
  'raw-storage': 'Склад сырья',
  'staff': 'Сотрудники'
}

const operationLabels: Record<OperationType, string> = {
  'create': 'Создание',
  'edit': 'Редактирование',
  'delete': 'Удаление',
  'view': 'Просмотр'
}

const ControlPanel: React.FC<Props> = ({ setEntity, setOperation }) => {
  const entities: EntityType[] = Object.keys(entityLabels) as EntityType[]
  const operations: OperationType[] = Object.keys(operationLabels) as OperationType[]

  return (
    <div className="control-panel">
      <div>
        <label>Таблица:</label>
        <select onChange={(e) => setEntity(e.target.value as EntityType)}>
          {entities.map((entity) => (
            <option key={entity} value={entity}>
              {entityLabels[entity]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Операция:</label>
        <select onChange={(e) => setOperation(e.target.value as OperationType)}>
          {operations.map((op) => (
            <option key={op} value={op}>
              {operationLabels[op]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ControlPanel

