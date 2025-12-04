function RecordList({ records, setRecords, setEditRecord }) {

  const handleDelete = async (id) => {
    try {
        //削除の場合
      await fetch(`http://127.0.0.1:8000/api/records/${id}`, {
        method: "DELETE"
      });
      setRecords(records.filter(record => record.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <table className="record-table">
      <thead>
        <tr>
          <th className="header-txt">学習内容</th>
          <th className="header-txt">時間</th>
          <th className="header-txt">操作</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={record.id} className={index % 2 === 0 ? "even" : "odd"}>
            <td className="body-txt">{record.content}</td>
            <td className="body-txt">{record.time}分</td>
            <td>
              <button className="editButton" onClick={() => setEditRecord(record)}>編集</button>
              <button className="deleteButton" onClick={() => handleDelete(record.id)}>削除</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecordList;
