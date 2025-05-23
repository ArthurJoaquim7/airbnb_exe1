<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'where', 'country', 'price', 'category', 'image', 'features'];
    protected $casts = [
        'features' => 'array',
    ];
}
