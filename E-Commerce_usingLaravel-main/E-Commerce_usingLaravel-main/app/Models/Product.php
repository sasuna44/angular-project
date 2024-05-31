<?php

namespace App\Models;
use App\Models\Promotion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'image', 'price', 'details','wishlist','promotion_id'];

    public function productCategory()
    {
        return $this->hasOne(ProductCategory::class);
    }

    public function category()
    {
        return $this->belongsToMany(Category::class, 'product_categories', 'product_id', 'category_id');
    }
    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }
    public function orderItems()
{
    return $this->hasMany(OrderItem::class);
}


}
