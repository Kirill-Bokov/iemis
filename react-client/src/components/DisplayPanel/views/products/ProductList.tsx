interface Product {
    id: number
    name: string
    price: number
    measure: string
  }
  
  const ProductList = ({ products }: { products: Product[] }) => {
    if (products.length === 0) return <div>Продукты не найдены</div>
  
    return (
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <div>ID: {p.id}</div>
            <div>Название: {p.name}</div>
            <div>Цена: {p.price}</div>
            <div>Единица измерения: {p.measure}</div>
          </li>
        ))}
      </ul>
    )
  }
  
  export default ProductList
  