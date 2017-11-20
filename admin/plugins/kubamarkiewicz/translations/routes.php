<?php

Route::get('/api/translations', 'KubaMarkiewicz\Translations\Api\Translations@index');
Route::post('/api/translation', 'KubaMarkiewicz\Translations\Api\Translations@add');
