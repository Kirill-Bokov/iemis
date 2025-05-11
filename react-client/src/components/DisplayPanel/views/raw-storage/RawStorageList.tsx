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
  
  const RawStorageList = ({ storage }: { storage: RawStorage[] }) => {
    if (storage.length === 0) return <div>Склад пуст</div>
  
    return (
      <ul>
        {storage.map((item) => (
          <li key={item.id}>
            <div>ID: {item.id}</div>
            <div>Наименование: {item.raw_material.name}</div>
            <div>Количество: {item.quantity} {item.raw_material.unit}</div>
            <div>Дата поступления: {new Date(item.date_of_receipt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    )
  }
  
  export default RawStorageList
  