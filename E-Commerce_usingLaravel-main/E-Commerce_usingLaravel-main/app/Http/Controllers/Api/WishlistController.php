<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class WishlistController extends Controller
{
    public function store(Request $request)
{
    $productId = $request->input('product_id');
    $product = Product::find($productId);

    if ($product) {
        // Check if the product is already in the wishlist
        if ($product->wishlist) {
            return response()->json(['message' => 'Product already in wishlist'], 200);
        }
        
        $product->wishlist = true;
        $product->save();
        return response()->json(['message' => 'Product added to wishlist'], 200);
    }

    return response()->json(['message' => 'Product not found'], 404);
}
    public function destroy(Request $request)
    {
        $productId = $request->input('product_id');
        $product = Product::find($productId);

        if ($product) {
            $product->wishlist = false;
            $product->save();
            return response()->json(['message' => 'Product removed from wishlist'], 200);
        }

        return response()->json(['message' => 'Product not found'], 404);
    }

    public function index()
    {
        $products = Product::where('wishlist', true)->get();
        return response()->json($products, 200);
    }
}


