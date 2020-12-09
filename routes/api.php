<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/login', 'Auth\LoginController@authenticated');

Route::get('users/trashed', 'UserController@trashed')->name('users.trashed')->middleware('auth:sanctum');
Route::patch('users/{user}/restore', 'UserController@restore')->name('users.restore')->middleware('auth:sanctum');
Route::delete('users/{user}/forcedelete', 'UserController@force_delete')->name('users.force_delete')->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group( function () {
    Route::resource('users','UserController');
});





