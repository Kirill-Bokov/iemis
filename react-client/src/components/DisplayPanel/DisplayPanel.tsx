import React, { useState } from "react";
import ControlPanel from "../ControlPanel";
import OutputPanel from "./OutputPanel";
import { fetchProductionReports } from "../../features/production-reports/productionReportsApi";
import { ProductionReport } from "../../features/production-reports/productionReportsModel";
import { renderProductionReports } from "../../features/production-reports/renderProductionReports";
import InputPanel from "./InpulPanel";

const DisplayPanel: React.FC = () => {
  const [reports, setReports] = useState<ProductionReport[]>([]);
  const [activeType, setActiveType] = useState<string | null>(null);

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
      <ControlPanel onShowReports={handleShowReports} onShowOtherData={handleOtherData} />
      <InputPanel />
      {activeType === "productionReports" && (
        <OutputPanel data={{ reports }} render={renderProductionReports} />
      )}
      {activeType === "otherType" && (
        <OutputPanel
          data={{}}
          // eslint-disable-next-line
          render={(data) => <div>{/* Ваш рендер для других данных */}</div>}
        />
      )}
    </section>
  );
};

export default DisplayPanel;
