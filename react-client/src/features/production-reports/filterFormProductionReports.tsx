import React from "react";
//Да, в этой форме объединена и логика, и интерфейс. Это нужно исправить
type FilterValues = {
  responsibleName: string;
  date: string;
  productName: string;
};

type Props = {
  values: FilterValues;
  onChange: (newValues: FilterValues) => void;
};

const ProductionReportsFilterForm: React.FC<Props> = ({ values, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...values, [name]: value });
  };

  return (
    <div className="filter-form">
      <input
        name="responsibleName"
        value={values.responsibleName}
        onChange={handleChange}
        placeholder="Ответственный"
      />
      <input
        name="date"
        value={values.date}
        onChange={handleChange}
        placeholder="Дата (гггг-мм-дд)"
      />
      <input
        name="productName"
        value={values.productName}
        onChange={handleChange}
        placeholder="Продукт"
      />
    </div>
  );
};

export default ProductionReportsFilterForm;
