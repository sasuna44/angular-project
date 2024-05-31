<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class CartController extends Controller
{

    public function index()
    {
        $carts = Cart::all();
        return response()->json($carts);
    }


    public function store(Request $request)
    {
        $cart = Cart::create($request->all());
        return response()->json($cart, 201);
    }


    public function show($user_id)
    {
        $cart = Cart::where('user_id', $user_id)->get();
        return response()->json($cart);
    }


    public function update(Request $request, $id)
    {
        $cart = Cart::findOrFail($id);
        $cart->update($request->all());
        return response()->json($cart);
    }


    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        $cart->delete();
        return response()->json(null, 204);
    }
}
