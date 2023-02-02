<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\SendEmailNotification;

class NotificationController extends Controller
{
    public function sendNotification()
    {
        $user=User::all();
        Notification::send($user, new SendEmailNotification());
        dd('done');
    }
}
