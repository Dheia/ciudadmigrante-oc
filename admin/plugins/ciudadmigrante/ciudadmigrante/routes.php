<?php

Route::get('/api/puntosdeacogida', 'CiudadMigrante\CiudadMigrante\Api\PuntosDeAcogida@index');
Route::post('/api/puntosdeacogida', 'CiudadMigrante\CiudadMigrante\Api\PuntosDeAcogida@add');
Route::get('/api/relatos', 'CiudadMigrante\CiudadMigrante\Api\Relatos@index');
Route::get('/api/relato/{id}/metadata', 'CiudadMigrante\CiudadMigrante\Api\Relatos@metadata');
Route::get('/api/espacios', 'CiudadMigrante\CiudadMigrante\Api\Espacios@index');
Route::get('/api/espacio/{id}', 'CiudadMigrante\CiudadMigrante\Api\Espacios@find');
Route::get('/api/espacio/{id}/metadata', 'CiudadMigrante\CiudadMigrante\Api\Espacios@metadata');
Route::get('/api/categories', 'CiudadMigrante\CiudadMigrante\Api\Categories@index');
Route::get('/api/metadata', 'CiudadMigrante\CiudadMigrante\Api\Metadata@index');
