interface Staff {
    id: number
    name: string
    job_title: string
    phone: string
  }

  const StaffList = ({ staff }: { staff: Staff[] }) => {
    if (staff.length === 0) return <div>Сотрудники не найдены</div>
  
    return (
      <ul>
        {staff.map((staff) => (
          <li
            key={staff.id}
          >
            <div>ID: {staff.id}</div>
            <div>Имя: {staff.name}</div>
            <div>Должность: {staff.job_title}</div>
            <div>Телефон: {staff.phone}</div>
          </li>
        ))}
      </ul>
    )
  }
  
  export default StaffList
  