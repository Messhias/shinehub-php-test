<?php

namespace App\Http\Controllers;

use App\Models\SMS;
use Illuminate\Http\Request;
use DB;

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
        $results = DB::select("SELECT * from sms where sms.from or sms.to like '%{$id}%' group by sms.to");

        return response()->json(
            [
                'code' => 200,
                'payload' => $results,
                'completed_at' => date('Y-m-d H:m:i'),
                'statusText' => 'OK',
                'status' => true
            ]
        );
    }

    /**
     * Add new sms message
     *
     * @param  object $data
     * @return Response
     */
     public function create(Request $request)
     {
         return response()->json(
             [
                 'code' => 201,
                 'payload' => SMS::create($request->input('sms')),
                 'completed_at' => date('Y-m-d H:m:i'),
                 'statusText' => 'OK',
                 'status' => true
             ]
         );
     }
}
