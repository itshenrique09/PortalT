<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Messages;
use App\Models\User;

class MessagesController extends Controller
{
    public function index()
    {
        $messages = Messages::all();
        return response()->json($messages);
    }

    public function store(Request $request)
    {
        // Check if the user is authenticated
        if (auth()->check()) {
            // Assuming the user is authenticated, you can get the authenticated user
            $user = auth()->user();
    
            // Check if the 'message' field is present in the request
            if ($request->has('message')) {
                // Create a new message associated with the authenticated user
                $message = new Messages([
                    'user_id' => $user->id,
                    'message' => $request->input('message'),
                ]);
                $message->save();
    
                return response()->json('Message created!');
            } else {
                // Handle the case where the 'message' field is missing in the request
                return response()->json('Message content is missing in the request', 400);
            }
        } else {
            // Handle the case where the user is not authenticated
            return response()->json('User not authenticated', 401);
        }
    }

    public function destroy($id){
    // Check if the user is authenticated
    if (auth()->check()) {
        // Assuming the user is authenticated, you can get the authenticated user
        $user = auth()->user();

        // Find the message by ID
        $message = Messages::find($id);

        // Check if the message exists
        if ($message) {
            // Check if the authenticated user is the owner of the message
            if ($user->id === $message->user_id) {
                // Delete the message
                $message->delete();
                return response()->json('Message deleted!');
            } else {
                // Handle the case where the authenticated user is not the owner of the message
                return response()->json('Unauthorized to delete this message', 403);
            }
        } else {
            // Handle the case where the message with the given ID is not found
            return response()->json('Message not found', 404);
        }
    } else {
        // Handle the case where the user is not authenticated
        return response()->json('User not authenticated', 401);
    }
}
}