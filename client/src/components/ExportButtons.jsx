function ExportButtons() {

  const exportCSV = () => {

    alert("CSV Export will be connected in next sprint.");

  };

  const exportPDF = () => {

    alert("PDF Export will be connected in next sprint.");

  };

  return (

    <div className="export-buttons">

      <button
        className="csv-btn"
        onClick={exportCSV}
      >
        📥 Export CSV
      </button>

      <button
        className="pdf-btn"
        onClick={exportPDF}
      >
        📄 Export PDF
      </button>

    </div>

  );

}

export default ExportButtons;