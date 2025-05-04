import React, { useState, useMemo } from "react";
import ControlPanel from "../ControlPanel";
import OutputPanel from "./OutputPanel";
import InputPanel from "./InpulPanel";
import { fetchProductionReports } from "../../features/production-reports/productionReportsApi";
import { ProductionReport } from "../../features/production-reports/productionReportsModel";
import { renderProductionReports } from "../../features/production-reports/renderProductionReports";
import ProductionReportsFilterForm from "../../features/production-reports/filterFormProductionReports";
const DisplayPanel: React.FC = () => {
  const [reports, setReports] = useState<ProductionReport[]>([]);
  const [activeType, setActiveType] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    responsibleName: "",
    date: "",
    productName: "",
  });

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const responsibleMatch = report.responsible.name
        .toLowerCase()
        .includes(filters.responsibleName.toLowerCase());
      const dateMatch = report.date.includes(filters.date);
      const productMatch = report.product.name
        .toLowerCase()
        .includes(filters.productName.toLowerCase());
      return responsibleMatch && dateMatch && productMatch;
    });
  }, [reports, filters]);

  const handleShowReports = async () => {
    try {
      const data = await fetchProductionReports();
      setReports(data);
      setActiveType("productionReports");
    } catch (error) {
      console.error("Ошибка загрузки отчётов:", error);
    }
  };

  const handleOtherData = () => {
    setActiveType("otherType");
  };

  return (
    <section className="display-panel">
      <ControlPanel
        onShowReports={handleShowReports}
        onShowOtherData={handleOtherData}
      />

      <InputPanel>
        {activeType === "productionReports" && (
          <ProductionReportsFilterForm values={filters} onChange={setFilters} />
        )}
      </InputPanel>

      {activeType === "productionReports" && (
        <OutputPanel
          data={{ reports: filteredReports }}
          render={renderProductionReports}
        />
      )}
    </section>
  );
};

export default DisplayPanel;
