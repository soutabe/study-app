<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRecordRequest;
use App\Http\Requests\UpdateRecordRequest;
use App\Http\Resources\RecordResource;
use App\Services\RecordService;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    protected $recordService;

    public function __construct(RecordService $recordService)
    {
        $this->recordService = $recordService;
    }

    public function index(Request $request)
    {
        // dateが指定されていなければ本日の日付にする
        $date = $request->query('date') ?? date('Y-m-d');
        
        $records = $this->recordService->getAllRecords($date);
        return RecordResource::collection($records);
    }

    public function create(CreateRecordRequest $request)
    {
        $validated = $request->validated();
        $record = $this->recordService->createRecord($validated);
        return new RecordResource($record);
    }

    public function show(int $id)
    {
        $record = $this->recordService->getRecordById($id);
        return new RecordResource($record);
    }

    public function update(UpdateRecordRequest $request, int $id)
    {
        $validated = $request->validated();
        $record = $this->recordService->updateRecord($id, $validated);
        return response()->json($record);
    }

    public function delete(int $id)
    {
        $this->recordService->deleteRecord($id);
        return response()->json(['message' => 'Record deleted successfully']);
    }
}