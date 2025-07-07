<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
})->name('home');

Route::get('/login', function() {
    return view('areaLogin');
})->name('login');

Route::view('/hubadmin', 'hubs.hubadmin')->name('hubadmin');
Route::view('/hubbarbeiro', 'hubs.hubbarbeiro')->name('hubbarbeiro');
Route::view('/hubcliente', 'hubs.hubcliente')->name('hubcliente');
