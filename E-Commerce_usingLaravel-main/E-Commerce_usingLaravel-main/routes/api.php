<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CartItemController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderItemController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PromotionController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\TranslationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'middleware' => ['api'],
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::put('/profile/update/{id}', [AuthController::class, 'updateProfile']);
    Route::get('email/verify/{id}', [AuthController::class, 'verify'])->name('verification.verify');
});

Route::group(['middleware' => ['api', 'auth:api', 'role:admin']], function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::post('/products/search', [ProductController::class, 'search']);

    Route::get('/order', [OrderController::class, 'index']);
    Route::post('/order', [OrderController::class, 'store']);
    Route::get('/order/{id}', [OrderController::class, 'show']);
    Route::put('/order/{id}', [OrderController::class, 'update']);
    Route::delete('/order/{id}', [OrderController::class, 'destroy']);
    Route::get('/orders-with-details', [OrderController::class, 'getOrders']);
    Route::put('/orders/update-with-items/{id}', [OrderController::class, 'updateOrderWithItems']);

    Route::get('/order-items', [OrderItemController::class, 'index']);
    Route::post('/order-items', [OrderItemController::class, 'store']);
    Route::get('/order-items/{id}', [OrderItemController::class, 'show']);
    Route::put('/order-items/{id}', [OrderItemController::class, 'update']);
    Route::delete('/order-items/{id}', [OrderItemController::class, 'destroy']);
    Route::delete('order-items', [OrderItemController::class, 'destroyAll']);

    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::get('/cart/{id}', [CartController::class, 'show']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    Route::get('/cart-items', [CartItemController::class, 'index']);
    Route::post('cart-items', [CartItemController::class, 'store']);
    Route::get('/cart-items/{id}', [CartItemController::class, 'show']);
    Route::put('/cart-items/{id}', [CartItemController::class, 'update']);
    Route::delete('/cart-items/{id}', [CartItemController::class, 'destroy']);
    Route::delete('/cart-items', [CartItemController::class, 'destroyAll']);

});

Route::group(['middleware' => ['api', 'auth:api', 'role:user']], function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/wishlist', [WishlistController::class, 'store']);
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/products/search', [ProductController::class, 'search']);
    Route::get('/order/{id}', [OrderController::class, 'show']);
    Route::get('/order/{user_id}', [OrderController::class, 'show']);
    Route::delete('/order/{id}', [OrderController::class, 'destroy']);

    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::get('/cart/{user_id}', [CartController::class, 'show']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    Route::get('/cart-items', [CartItemController::class, 'index']);
    Route::post('/cart-items', [CartItemController::class, 'store']);
    Route::get('/cart-items/{user_id}', [CartItemController::class, 'show']);
    Route::put('/cart-items/{id}', [CartItemController::class, 'update']);
    Route::delete('/cart-items/{id}', [CartItemController::class, 'destroy']);



});


Route::get('/category', [CategoryController::class, 'index']);
Route::post('/category', [CategoryController::class, 'store']);
Route::get('/category/{id}', [CategoryController::class, 'show']);
Route::put('/category/{id}', [CategoryController::class, 'update']);
Route::delete('/category/{id}', [CategoryController::class, 'destroy']);

Route::get('/promotion', [PromotionController::class, 'index']);
Route::post('/promotion', [PromotionController::class, 'store']);
Route::get('/promotion/{id}', [PromotionController::class, 'show']);
Route::put('/promotion/{id}', [PromotionController::class, 'update']);
Route::delete('/promotion/{id}', [PromotionController::class, 'destroy']);
Route::post('/translate', [TranslationController::class, 'translate']);
