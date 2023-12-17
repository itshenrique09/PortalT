<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\AuthController;

//Authentication
//Routes to when the user is loged
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/users',[App\Http\Controllers\AuthController::class, 'user']);
    Route::post('/logout',[App\Http\Controllers\AuthController::class, 'logout']);
    Route::get('/user/{id}', [AuthController::class, 'getUserById']);

    //Message
    Route::post('/save',[App\Http\Controllers\MessagesController::class, 'store']);
    Route::get('/messages',[App\Http\Controllers\MessagesController::class, 'index']);
    //Route::put('/update/{id}',[App\Http\Controllers\MessagesController::class, 'update']);
    Route::delete('/delete/{id}',[App\Http\Controllers\MessagesController::class, 'destroy']);
});

Route::post('/register',[App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login',[App\Http\Controllers\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
