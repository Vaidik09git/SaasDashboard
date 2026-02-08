import React from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';

function UploadCard({ title, description, accept }) {
  const [fileName, setFileName] = React.useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.iconCircle}>
        <Upload size={32} color="#2563eb" />
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.desc}>{description}</p>

      <label style={styles.uploadArea}>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          style={{ display: 'none' }} 
        />
        {fileName ? (
          <div style={styles.fileSelected}>
            <CheckCircle size={18} color="#059669" />
            <span>{fileName}</span>
          </div>
        ) : (
          "Select File from Computer"
        )}
      </label>
    </div>
  );
}

const styles = {
  card: {
    padding: "32px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconCircle: {
    background: "#eff6ff",
    padding: "20px",
    borderRadius: "50%",
    marginBottom: "16px",
  },
  title: { fontSize: "20px", fontWeight: "600", marginBottom: "8px", color: "#111" },
  desc: { color: "#666", marginBottom: "24px", fontSize: "14px" },
  uploadArea: {
    border: "2px dashed #cbd5e1",
    borderRadius: "8px",
    padding: "16px 24px",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.2s",
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569",
    backgroundColor: "#f8fafc"
  },
  fileSelected: { display: "flex", alignItems: "center", gap: "8px", color: "#059669" }
};

export default UploadCard;