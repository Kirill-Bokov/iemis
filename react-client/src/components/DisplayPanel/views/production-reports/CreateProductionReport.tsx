import { useState, useEffect } from "react";
import apiClient from "../../../../axios";

interface Product {
  id: string;
  name: string;
}

interface ProductStock {
  product: {id: string};
  quantity: number;
}



interface RawStock {
  raw_material: {id: string, name: string, measure: number};
  quantity: number;
  name: string;
  measure: string;
}

interface Responsible {
  id: string;
  name: string;
}

interface MaterialInput {
  raw_material_id: string;
  quantity: string;
}

const CreateProductionReport = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);

  const [productStock, setProductStock] = useState<ProductStock[]>([]);
  const [rawStock, setRawStock] = useState<RawStock[]>([]);

  const [productId, setProductId] = useState("");
  const [responsibleId, setResponsibleId] = useState("");
  const [reportQuantity, setReportQuantity] = useState("");
  const [materialInputs, setMaterialInputs] = useState<MaterialInput[]>([]);

  useEffect(() => {
    apiClient.get("/products").then((res) => setProducts(res.data));
    apiClient.get("/staff").then((res) => setResponsibles(res.data));

    apiClient.get("/product-storage").then((res) => {
      console.log("Продуктовые остатки с бэкенда:", res.data);
      setProductStock(res.data);
    });

    apiClient.get("/raw-storage").then((res) => {
      console.log("Сырьевые остатки с бэкенда:", res.data);
      setRawStock(res.data);
    });
  }, []);

  const getProductQuantity = (id: string): number => {
    const item = productStock.find((p) => p.product.id === id);
    return item ? item.quantity : 0;
  };

  const getRawQuantity = (id: string): number => {
    const item = rawStock.find((r) => r.raw_material.id === id);
    return item ? item.quantity : 0;
  };

  const handleAddMaterial = () => {
    setMaterialInputs([
      ...materialInputs,
      { raw_material_id: "", quantity: "" },
    ]);
  };

  const handleRemoveMaterial = (index: number) => {
    const updated = [...materialInputs];
    updated.splice(index, 1);
    setMaterialInputs(updated);
  };

  const handleMaterialChange = (
    index: number,
    field: keyof MaterialInput,
    value: string
  ) => {
    const updated = [...materialInputs];
    updated[index][field] = value;
    setMaterialInputs(updated);
  };

  const handleSubmit = () => {
    if (!productId || !responsibleId || !reportQuantity.trim()) {
      alert("Заполните все основные поля");
      return;
    }

    const parsedMaterials = materialInputs
      .filter((m) => m.raw_material_id && m.quantity.trim())
      .map((m) => ({
        raw_material_id: m.raw_material_id,
        quantity: parseFloat(m.quantity.trim()),
      }));

    if (parsedMaterials.length === 0) {
      alert("Нужно добавить хотя бы один материал");
      return;
    }

    const payload = {
      product_id: productId,
      quantity: parseFloat(reportQuantity.trim()),
      responsible_id: responsibleId,
      materials: parsedMaterials,
    };

    apiClient
      .post("/production-reports", payload)
      .then(() => {
        alert("Отчёт создан");
        setProductId("");
        setResponsibleId("");
        setReportQuantity("");
        setMaterialInputs([]);
      })
      .catch((err) => {
        alert("Ошибка при создании отчёта");
        console.error(err);
      });
  };

  return (
    <div>
      <h3>Создать отчёт о производстве</h3>

      <select value={productId} onChange={(e) => setProductId(e.target.value)}>
        <option value="">Выберите продукт</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {productId && (
        <div>Остаток на складе: {getProductQuantity(productId)}</div>
      )}

      <input
        type="text"
        placeholder="Количество произведённого"
        value={reportQuantity}
        onChange={(e) => setReportQuantity(e.target.value)}
      />

      <select
        value={responsibleId}
        onChange={(e) => setResponsibleId(e.target.value)}
      >
        <option value="">Выберите ответственного</option>
        {responsibles.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <h4>Материалы</h4>

      {materialInputs.map((m, index) => (
        <div key={index}>
<select
  value={m.raw_material_id}
  onChange={(e) =>
    handleMaterialChange(index, "raw_material_id", e.target.value)
  }
>
  <option value="">Выберите сырьё</option>
  {rawStock.map((mat: RawStock) => (
  <option key={mat.raw_material.id} value={mat.raw_material.id}>
    {`${mat.raw_material.name} (${mat.raw_material.measure})`}
  </option>
))}
</select>

          {m.raw_material_id && (
            <span style={{ marginLeft: "8px" }}>
              Остаток: {getRawQuantity(m.raw_material_id)}
            </span>
          )}

          <input
            type="text"
            placeholder="Количество"
            value={m.quantity}
            onChange={(e) =>
              handleMaterialChange(index, "quantity", e.target.value)
            }
          />

          <button onClick={() => handleRemoveMaterial(index)}>Удалить</button>
        </div>
      ))}

      <button onClick={handleAddMaterial}>Добавить материал</button>
      <br />
      <button onClick={handleSubmit}>Создать отчёт</button>
    </div>
  );
};

export default CreateProductionReport;
