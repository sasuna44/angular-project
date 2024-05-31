<?php

namespace App\Http\Controllers\Api;
use App\Models\Promotion;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Trait\ApiResponse;
use App\Http\Resources\PromotionResource;
use App\Http\Requests\PromotionRequest;
use Carbon\Carbon;

class PromotionController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $promotions = Promotion::all();
        return PromotionResource::collection($promotions);
    }

    public function show($id)
    {
        $promotion = Promotion::with('products')->findOrFail($id);
        return new PromotionResource($promotion);
    }

    public function store(PromotionRequest $request)
    {
        $productId = $request->product_id;

        $product = Product::find($productId);

        if (!$product) {
            return $this->errorResponse('Product not found', 404);
        }

        if ($product->promotion_id) {
            return $this->errorResponse('A promotion already exists for this product', 400);
        }

        $startDate = $request->input('start_date', Carbon::now()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->addWeek()->toDateString());

        $promotion = new Promotion;
        $promotion->discount_percentage = $request->discount_percentage;
        $promotion->start_date = $startDate;
        $promotion->end_date = $endDate;
        $promotion->save();

        // Update the product to link it to the new promotion
        $product->promotion_id = $promotion->id;
        $product->save();

        return $this->successResponse(new PromotionResource($promotion), 'Promotion created successfully', 200);
    }

    public function update($id, PromotionRequest $request)
    {
        $promotion = Promotion::find($id);

        if (!$promotion) {
            return $this->errorResponse('Promotion not found', 404);
        }

        $promotion->discount_percentage = $request->discount_percentage;
        $promotion->start_date = $request->start_date;
        $promotion->end_date = $request->end_date;
        $promotion->save();

        return $this->successResponse(new PromotionResource($promotion), 'Promotion updated successfully');
    }

    public function destroy(Request $request, $id)
    {
        $promotion = Promotion::find($id);

        if (!$promotion) {
            return $this->errorResponse('Promotion not found', 404);
        }

        // Find products linked to this promotion and set their promotion_id to null
        Product::where('promotion_id', $id)->update(['promotion_id' => null]);

        $promotion->delete();

        return $this->successResponse(null, 'Promotion deleted successfully');
    }
}