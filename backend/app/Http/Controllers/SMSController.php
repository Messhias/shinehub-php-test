<?php

namespace App\Http\Controllers;

use App\Models\SMS;

class SMSController extends Controller
{
    /**
     * Retrieve the SMS`s for the given ID (to field).
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return response()->json(
            [
                'code' => 200,
                'payload' => SMS::where('to', $id)
                    ->groupBy('from')
                    ->get(),
                'completed_at' => date('Y-m-d H:m:i'),
                'statusText' => 'complete',
                'status' => true
            ]
        );
    }
}
