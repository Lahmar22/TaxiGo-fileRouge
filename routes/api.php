<?php

use Illuminate\Support\Facades\Route;

Route::get('/drivers', function () {
    return response()->json([
        ['name' => 'Ahmed'],
        ['name' => 'Yassine']
    ]);
});