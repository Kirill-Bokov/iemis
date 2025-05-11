interface Product {
    id: number
    name: string
    price: number
    measure: string
  }
  
  interface ProductStorage {
    id: string
    product: Product
    quantity: number
    dateOfReceipt: string
  }
  
  interface ProductStorageListProps {
    storageItems: ProductStorage[]
  }
  
  const ProductStorageList: React.FC<ProductStorageListProps> = ({ storageItems }) => {
    if (storageItems.length === 0) return <div>Продукты на складе не найдены</div>
  
    return (
      <ul>
        {storageItems.map((item) => (
          <li key={item.id}>
            <div>ID записи: {item.id}</div>
            <div>Продукт: {item.product.name}</div>
            <div>Количество: {item.quantity} {item.product.measure}</div>
            <div>Цена за единицу: {item.product.price}</div>
            <div>Дата поступления: {new Date(item.dateOfReceipt).toLocaleDateString()}</div>
            <hr />
          </li>
        ))}
      </ul>
    )
  }
  
  export default ProductStorageList
  