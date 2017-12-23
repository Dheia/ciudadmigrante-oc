<?php namespace CiudadMigrante\CiudadMigrante\Api;

use Illuminate\Routing\Controller;
use CiudadMigrante\CiudadMigrante\Models\Settings as Model;

class Settings extends Controller
{


    public function index()
    {
    	$settings = Model::instance();

    	$return = [];
    	$return['background_audio'] = $settings->background_audio->path;

    	return response()->json($return, 200, array(), JSON_PRETTY_PRINT);
    }

}