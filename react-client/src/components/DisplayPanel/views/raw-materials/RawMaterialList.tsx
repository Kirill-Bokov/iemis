interface RawMaterial {
  id: number
  name: string
  price: number
  measure: string
}

interface RawMaterialListProps {
  rawMaterials: RawMaterial[]
}

const RawMaterialList: React.FC<RawMaterialListProps> = ({ rawMaterials }) => {
  if (rawMaterials.length === 0) return <div>Материалы не найдены</div>

  return (
    <ul>
      {rawMaterials.map((material) => (
        <li key={material.id}>
          <div>ID: {material.id}</div>
          <div>Имя: {material.name}</div>
          <div>Цена за единицу: {material.price}</div>
          <div>Единица измерения: {material.measure}</div>
        </li>
      ))}
    </ul>
  )
}

export default RawMaterialList
