<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Messages;

class MessagesController extends Controller
{
    public function index()
    {
        $messages = Messages::all();
        return response()->json($messages);
    }
}
