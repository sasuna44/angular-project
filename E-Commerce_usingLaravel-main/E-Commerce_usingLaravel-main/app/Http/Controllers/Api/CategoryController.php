<?php

namespace App\Http\Controllers\Api;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\ProductCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Trait\ApiResponse;
// use Illuminate\Validation\Rule;
use App\Http\Requests\CreateCategoryRequest;
// use App\Http\Requests\CategoryRequest;
use Illuminate\Support\Facades\Validator;
class CategoryController extends Controller
{
    use ApiResponse;

    public function index()
{
    $categories = Category::with('products')->get();
    return CategoryResource::collection($categories);
}

    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return $this->errorResponse('Category not found', 404);
        }
        $category->load('products'); 

        return $this->formatCategoryResponse($category);

    }

    public function store(CreateCategoryRequest $request)
{
    
    $category = new Category;
    $category->name = $request->name;
    $category->description = $request->description;

    $category->save();

    if ($request->product_ids) {
        foreach ($request->product_ids as $product_id) {
            // Check if the product is already associated with another category
            if (ProductCategory::where('product_id', $product_id)->exists()) {
                return $this->errorResponse("Product ID $product_id is already assigned to another category.", 422);
            }
            ProductCategory::create([
                'product_id' => $product_id,
                'category_id' => $category->id,
            ]);
        }
    }

        $category->load('products');  // Eager load products

        return $this->formatCategoryResponse($category, "Category added successfully");
}

public function update($id, CreateCategoryRequest $request)
{
    $category = Category::find($id);

    if (!$category) {
        return $this->errorResponse('Category not found', 404);
    }

    // Only update the name and description if they are provided
    if ($request->has('name')) {
        $category->name = $request->name;
    }
    if ($request->has('description')) {
        $category->description = $request->description;
    }
    $category->save();

    if ($request->product_ids) {
        ProductCategory::where('category_id', $category->id)->delete();
        foreach ($request->product_ids as $product_id) {
            if (ProductCategory::where('product_id', $product_id)->exists()) {
                return $this->errorResponse("Product ID $product_id is already assigned to another category.", 422);
            }
            ProductCategory::create([
                'product_id' => $product_id,
                'category_id' => $category->id,
            ]);
        }
    }

    $category->load('products');  // Eager load products

    return $this->formatCategoryResponse($category, "Category updated successfully");
}


private function formatCategoryResponse($category, $message)
{
    $formattedProducts = $category->products->map(function ($product) {
        return [
            'id' => $product->id,
            'name' => $product->title, 
            'details' => $product->details,
            'price' => $product->price,
        ];
    });

    // Construct the response data
    $responseData = [
        'id' => $category->id,
        'name' => $category->name,
        'description' => $category->description,
        'created_at' => $category->created_at,
        'updated_at' => $category->updated_at,
        'products' => $formattedProducts,
    ];

    return $this->successResponse($responseData, $message);
}
    public function destroy(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return $this->errorResponse('Category not found', 404);
        }

        // Remove associations in product_categories table
        ProductCategory::where('category_id', $category->id)->delete();

        $category->delete();

        return $this->successResponse($category, 'Category deleted successfully');
    }
}
