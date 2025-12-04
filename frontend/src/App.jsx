import { useState, useEffect } from 'react';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import './App.css';
import './components/RecordList.css';

function App() {
  const [records, setRecords] = useState([]);
  const [editRecord, setEditRecord] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  // 初回ロード & 日付変更時にDBから取得
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/records?date=${date}`);
        const data = await res.json();
        setRecords(data.data || data); // RecordResource 対応
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecords();
  }, [date]);

  const totalTime = records.reduce((sum, record) => sum + record.time, 0);

  return (
    <>
      <h2>合計学習時間: {totalTime}分</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <RecordForm
        records={records}
        setRecords={setRecords}
        editRecord={editRecord}
        setEditRecord={setEditRecord}
        date={date}
      />
      <RecordList
        records={records}
        setRecords={setRecords}
        setEditRecord={setEditRecord}
      />
    </>
  );
}

export default App;
