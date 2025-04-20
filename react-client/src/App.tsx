import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/production-reports")
      .then(res => {
        setReports(Array.isArray(res.data) ? res.data : [res.data]);
      })
      .catch(err => {
        console.error("Ошибка загрузки отчётов:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Производственные отчёты</h1>

      {reports.length === 0 ? (
        <p>Загрузка или нет данных...</p>
      ) : (
        reports.map(report => {
          const cost = report.materials.reduce((sum, mat) => {
            return sum + mat.quantity * mat.rawMaterial.price;
          }, 0);

          return (
            <div key={report.id} style={{ border: "1px solid black", marginBottom: "20px", padding: "10px" }}>
              <p><strong>Дата:</strong> {new Date(report.date).toLocaleString()}</p>
              <p><strong>Продукт:</strong> {report.product.name}, {report.quantity} {report.product.measure}</p>
              <p><strong>Ответственный:</strong> {report.responsible.name} ({report.responsible.jobTitle})</p>
              <p><strong>Себестоимость:</strong> {cost} ₽</p>

              <p><strong>Использованные материалы:</strong></p>
              <ul>
                {report.materials.map(material => (
                  <li key={material.id}>
                    {material.rawMaterial.name}: {material.quantity} {material.rawMaterial.measure} × {material.rawMaterial.price} ₽
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;