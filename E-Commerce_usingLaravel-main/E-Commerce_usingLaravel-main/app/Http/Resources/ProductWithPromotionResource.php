<?php

namespace App\Http\Resources;
use App\Http\Resources\PromotionResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductWithPromotionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'price' => $this->price,
            'details' => $this->details,
            'image' => $this->image,
            'promotion' => $this->promotion ? new PromotionResource($this->promotion) : null,
        ];
    }
}
