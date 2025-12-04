<?php

namespace App\Repositories;

use App\Models\Record;

class RecordRepository
{
    public function getAll($date = null)
    {
        $query = Record::query();
        if ($date) {
            $query->where('date', $date);
        }
        return $query->get();
    }

    public function create(array $data)
    {
        return Record::create($data);
    }

    public function findById(int $id)
    {
        return Record::findOrFail($id);
    }

    public function update(int $id, array $data)
    {
        $record = Record::findOrFail($id);
        $record->update($data);
        return $record;
    }

    public function delete(int $id)
    {
        $record = Record::findOrFail($id);
        $record->delete();
        return true;
    }
}