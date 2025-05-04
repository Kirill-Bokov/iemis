import { ProductionReport } from "./productionReportsModel";

type Props = {
  reports: ProductionReport[];
};

export const renderProductionReports = ({ reports }: Props) => {
  return (
    <div className="report-list">
      {reports.map((report) => {
        const productTotal = report.quantity * report.product.price;
        const materialsTotal = report.materials.reduce(
          (sum, mat) => sum + mat.quantity * mat.rawMaterial.price,
          0
        );
        const totalCost = productTotal + materialsTotal;

        return (
          <div key={report.id} className="report-card">
            <h3>Отчёт от {new Date(report.date).toLocaleString()}</h3>

            <p>Продукт: {report.product.name}</p>
            <p>
              Количество: {report.quantity} {report.product.measure}
            </p>
            <p>Цена за ед.: {report.product.price} ₽</p>
            <p>Стоимость продукции: {productTotal} ₽</p>

            <p>
              Ответственный: {report.responsible.name} ({report.responsible.jobTitle})
            </p>
            <p>Телефон: {report.responsible.phone}</p>

            <h4>Использованные материалы:</h4>
            <ul>
              {report.materials.map((mat) => {
                const materialCost = mat.quantity * mat.rawMaterial.price;
                return (
                  <li key={mat.id}>
                    {mat.rawMaterial.name} — {mat.quantity} {mat.rawMaterial.measure} × {mat.rawMaterial.price} ₽ = {materialCost} ₽
                  </li>
                );
              })}
            </ul>

            <p>Стоимость материалов: {materialsTotal} ₽</p>
            <strong>Итоговая себестоимость: {totalCost} ₽</strong>
          </div>
        );
      })}
    </div>
  );
};

