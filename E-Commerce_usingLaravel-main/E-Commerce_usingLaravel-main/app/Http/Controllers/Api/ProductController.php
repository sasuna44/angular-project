<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductWithCategoryResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Trait\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;



class ProductController extends Controller
{
    use ApiResponse;
    // use ApiResponse;

    
    public function index()
    {
        $products = Product::with(['promotion', 'category'])->get();

        return ProductWithCategoryResource::collection($products);
    }

    public function show($id)
    {
        $product = Product::with('category')->find($id);

        if (! $product) {
            return $this->errorResponse('Product not found', 404);
        }

        return $this->successResponse(new ProductWithCategoryResource($product));
    }

    public function store(ProductRequest $request)
    {
        // $translatedTitle = translate($request->title, 'fr');

        // $product = new Product;

        // // Set the translated title, price, and details
        // $product->title = $translatedTitle;
        $product = new Product;
        $product->title = $request->title;
        $product->price = $request->price;
        $product->details = $request->details;

        if ($request->hasFile('image')) {
            $originalFilename = $request->image->getClientOriginalName();
            $request->image->move(public_path('images'), $originalFilename);
            $product->image = $originalFilename;
        } else {
            $product->image = 'default.jpg';
        }

        $product->save();

        // Associate product with a category
        if ($request->category_id) {
            ProductCategory::create([
                'product_id' => $product->id,
                'category_id' => $request->category_id,
            ]);
        }

        return $this->successResponse(new ProductWithCategoryResource($product), 'Product added successfully');
    }


    public function update(Request $request, $id)
    {
        // Find the product by its ID
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'details' => 'sometimes|nullable|string',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update the product with validated data
        $product->fill($validator->validated());

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $product->image = basename($imagePath);
        }

        // Save the updated product
        $result=$product->save();

        return response()->json(['message' => 'Product updated successfully', 'product' => $result]);
    }
    
    

    public function destroy(Request $request, $id)
    {
        $product = Product::find($id);

        if (! $product) {
            return $this->errorResponse('Product not found', 404);
        }

        $imageName = $product->image;
        $imagePath = public_path('images').'/'.$imageName;

        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        // Remove associated category
        ProductCategory::where('product_id', $product->id)->delete();

        $product->delete();

        return $this->successResponse(new ProductWithCategoryResource($product), 'Product deleted successfully');
    }

    //Search about the productTitle
    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return $this->errorResponse('Query parameter is required', 400);
        }

        $products = Product::where('title', 'LIKE', '%' . $query . '%')
            ->with(['promotion', 'category'])
            ->get();

        return ProductWithCategoryResource::collection($products);
    }
    

   
}
