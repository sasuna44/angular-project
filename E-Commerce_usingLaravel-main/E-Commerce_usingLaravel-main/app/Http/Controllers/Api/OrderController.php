<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\OrderItem;


class OrderController extends Controller
{

    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }


    public function store(Request $request)
    {
        $order = Order::create($request->all());
        return response()->json($order, 201);
    }


    public function show($user_id)
{
    $orders = Order::where('user_id', $user_id)->get();
    return response()->json($orders);
}



    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->update($request->all());
        return response()->json($order);
    }


    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }

    public function getOrders()
    {
        $orders = Order::with(['user', 'orderItems.product'])
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'username' => $order->user ? $order->user->username : 'N/A',
                    'date' => $order->created_at,
                    'total_price' => $order->total_price,
                    'status' => $order->status,
                    'products' => $order->orderItems->map(function ($item) {
                        return [
                            'id' => $item->product->id,
                            'title' => $item->product->title,
                            'price' => $item->price,
                            'quantity' => $item->quantity,
                        ];
                    }),
                ];
            });

        return response()->json($orders);
    }

    public function updateOrderWithItems(Request $request, $id)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
            'items' => 'sometimes|array',
            'items.*.id' => 'sometimes|exists:order_items,id',
            'items.*.product_id' => 'sometimes|exists:products,id',
            'items.*.quantity' => 'sometimes|integer',
            'items.*.price' => 'sometimes|numeric',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $validatedData['status'];
        $order->save();


        if (isset($validatedData['items']) && is_array($validatedData['items'])) {
            foreach ($validatedData['items'] as $itemData) {
                $orderItem = OrderItem::findOrFail($itemData['id']);
                $orderItem->update([
                    'product_id' => $itemData['product_id'],
                    'quantity' => $itemData['quantity'],
                    'price' => $itemData['price'],
                ]);
            }
        }

        $order->load('user', 'orderItems.product');

        return response()->json([
            'id' => $order->id,
            'username' => $order->user->username,
            'date' => $order->created_at->toIso8601String(),
            'total_price' => $order->total_price,
            'status' => $order->status,
            'products' => $order->orderItems->map(function ($item) {
                return [
                    'id' => $item->product->id,
                    'title' => $item->product->title,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                ];
            }),
        ]);
    }

}
