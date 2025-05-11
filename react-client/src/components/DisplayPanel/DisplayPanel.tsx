import React, { useState } from "react"
import ControlPanel from "./ControlPanel"
import OutputPanel from "./OutputPanel"
import { EntityType, OperationType } from "../../types/viewTypes"

const DisplayPanel: React.FC = () => {
  const [entity, setEntity] = useState<EntityType>('staff')
  const [operation, setOperation] = useState<OperationType>('view')

  return (
    <div className="display-panel">
      <ControlPanel setEntity={setEntity} setOperation={setOperation} />
      <OutputPanel entity={entity} operation={operation} />
    </div>
  )
}

export default DisplayPanel
