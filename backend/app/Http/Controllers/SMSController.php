<?php

namespace App\Http\Controllers;

use App\Models\SMS;
use Illuminate\Http\Request;
use DB;
use Log;

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
        try {
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
        } catch (\Exception $e) {

            Log::error($e);
            return response()->json([
               'code' => 501,
               'payload' => 'Error',
               'completed_at' => date('Y-m-d H:m:i'),
               'statusText' => 'Fail',
               'status' => false
            ]);
        }
    }

    /**
     * Add new sms message
     *
     * @param  object $data
     * @return Response
     */
     public function create(Request $request)
     {
         try {
             $done = false;
             if (count($request->input('sms')) > 3) {
                 foreach ($request->input('sms') as $key => $value) {
                     $done = SMS::create($value);
                 }
             } else {
                 $done = SMS::create($request->input('sms'));
             }

             return response()->json(
                 [
                     'code' => 201,
                     'payload' => $done,
                     'completed_at' => date('Y-m-d H:m:i'),
                     'statusText' => 'OK',
                     'status' => true
                 ]
             );
         } catch (\Exception $e) {
             Log::error($e);
             return response()->json([
                'code' => 501,
                'payload' => 'Error',
                'completed_at' => date('Y-m-d H:m:i'),
                'statusText' => 'Fail',
                'status' => false
             ]);
         }

     }
}
