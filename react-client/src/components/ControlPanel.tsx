import React from 'react';

type ControlPanelProps = {
    onShowReports: () => Promise<void>;
    onShowOtherData: () => void;
  };
  
  const ControlPanel: React.FC<ControlPanelProps> = ({ onShowReports, onShowOtherData }) => {
    return (
      <div className='control-panel'>
        <button onClick={onShowReports}>Показать отчёты</button>
        <button onClick={onShowOtherData}>Показать другие данные</button>
      </div>
    );
  };
  

export default ControlPanel;

