import React from "react"
import { ViewDispatcher } from "./ViewDispatcher"
import { EntityType, OperationType } from "../../types/viewTypes"

interface Props {
  entity: EntityType
  operation: OperationType
}

const OutputPanel: React.FC<Props> = ({ entity, operation }) => {
  return (
    <div className="output-panel">
      <ViewDispatcher entity={entity} operation={operation} />
    </div>
  )
}

export default OutputPanel
