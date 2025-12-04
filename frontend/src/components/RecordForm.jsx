import React, { useState, useEffect } from "react";

function RecordForm({ records, setRecords, editRecord, setEditRecord, date }) {
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editRecord) {
      setContent(editRecord.content);
      setTime(editRecord.time);
    }
  }, [editRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !time) return;

    const recordData = {
      content,
      time: Number(time),
      date: date || new Date().toISOString().slice(0, 10),
    };

    try {
      if (editRecord) {
        // 編集の場合
        const res = await fetch(`http://127.0.0.1:8000/api/records/${editRecord.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recordData),
        });
        const updated = await res.json();
        setRecords(records.map(record => record.id === editRecord.id ? updated.data || updated : record));
        setEditRecord(null);
      } else {
        // 新規追加の場合
        const res = await fetch("http://127.0.0.1:8000/api/records", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recordData),
        });
        const newRecord = await res.json();
        setRecords([...records, newRecord.data || newRecord]);
      }

      setContent("");
      setTime("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>学習内容 : </label>
        <input type="text" placeholder="例: 英単語" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label>時間:（分）: </label>
        <input type="number" placeholder="例: 30" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <button type="submit">{editRecord ? "更新" : "追加"}</button>
    </form>
  );
}

export default RecordForm;
