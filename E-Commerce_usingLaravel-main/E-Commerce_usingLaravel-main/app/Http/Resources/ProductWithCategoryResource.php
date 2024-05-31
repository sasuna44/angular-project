<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductWithCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'price' => $this->price,
            'details' => $this->details,
            'image' => $this->image,
            'category' => CategoryResource::collection($this->whenLoaded('category')),
            'promotion' => new PromotionResource($this->whenLoaded('promotion')),
        ];
        // return [
        //     'id' => $this->id,
        //     'title' => $this->title,
        //     'price' => $this->price,
        //     'details' => $this->details,
        //     'image' => $this->image,
        //     // 'promotion' => new PromotionResource($this->whenLoaded('promotion')),

        //     // 'category' => CategoryResource::collection($this->category),
        //     'promotion' => PromotionResource::collection($this->promotion),
        // ];
        // Conditionally include promotion details if promotion_id is not null
        // if ($this->promotion_id !== null) {
        //     $data['promotion'] = new PromotionResource($this->whenLoaded('promotion'));
        // }

        return $data;

    }
}
