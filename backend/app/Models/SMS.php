<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SMS extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var protected
     */
    protected $table = 'sms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'from', 'to', 'message'
    ];
}
