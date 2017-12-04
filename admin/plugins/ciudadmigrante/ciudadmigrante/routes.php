<?php

Route::get('/api/puntosdeacogida', 'CiudadMigrante\CiudadMigrante\Api\PuntosDeAcogida@index');
Route::post('/api/puntosdeacogida', 'CiudadMigrante\CiudadMigrante\Api\PuntosDeAcogida@add');
Route::get('/api/relatos', 'CiudadMigrante\CiudadMigrante\Api\Relatos@index');
Route::get('/api/espacios', 'CiudadMigrante\CiudadMigrante\Api\Espacios@index');
Route::get('/api/espacio/{id}', 'CiudadMigrante\CiudadMigrante\Api\Espacios@find');
Route::get('/api/categories', 'CiudadMigrante\CiudadMigrante\Api\Categories@index');
