<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Register extends Model
{



    protected $fillable = [

        'user_name',
        'email',
        'password',
        'email_verified_at',
        'remember_token',

    ];
    use HasFactory;
}
