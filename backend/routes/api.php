<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecordController;

Route::get('/test', function () {
    return response()->json(['message' => 'API working!']);
});

Route::get('/records', [RecordController::class, 'index']);
Route::post('/records', [RecordController::class, 'create']);
Route::get('/records/{id}', [RecordController::class, 'show']);
Route::put('/records/{id}', [RecordController::class, 'update']);
Route::delete('/records/{id}', [RecordController::class, 'delete']);