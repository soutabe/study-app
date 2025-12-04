<?php

namespace App\Services;

use App\Repositories\RecordRepository;

class RecordService
{
    protected $recordRepository;

    public function __construct(RecordRepository $recordRepository)
    {
        $this->recordRepository = $recordRepository;
    }

    public function getAllRecords($date = null)
    {
        return $this->recordRepository->getAll($date);
    }

    public function createRecord(array $data)
    {
        return $this->recordRepository->create($data);
    }

    public function getRecordById(int $id)
    {
        return $this->recordRepository->findById($id);
    }

    public function updateRecord(int $id, array $data)
    {
        return $this->recordRepository->update($id, $data);
    }

    public function deleteRecord(int $id)
    {
        return $this->recordRepository->delete($id);
    }
}