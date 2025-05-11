import { Suspense } from 'react'
import { operationViewMap } from '../../mappings/operationViewMap'
import { EntityType, OperationType } from '../../types/viewTypes'

interface Props {
  entity: EntityType
  operation: OperationType
}

export const ViewDispatcher = ({ entity, operation }: Props) => {
  const Component = operationViewMap[entity]?.[operation]

  if (!Component) return <div className='no-such-action'>Не существует такого действия для этой таблицы</div>

  return (
    <Suspense fallback={<div>Идёт загрузка компонента...</div>}>
          <div className='output-panel__output'>
      <Component />
      </div>
    </Suspense>

  )
}
