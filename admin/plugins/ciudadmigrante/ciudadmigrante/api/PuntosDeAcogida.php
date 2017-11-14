<?php namespace CiudadMigrante\CiudadMigrante\Api;

use Illuminate\Routing\Controller;
use Input;
use CiudadMigrante\CiudadMigrante\Models\PuntoDeAcogida;
use RainLab\Translate\Classes\Translator;

class PuntosDeAcogida extends Controller
{

    public function index()
    {
        // Translator::instance()->setLocale(Input::get('lang'));

        $categories = [];
        if (Input::get('categories')) {
            $categories = explode(',', Input::get('categories'));
        }
        

        $query = PuntoDeAcogida::where('publicado', '1');

        if ($categories) {
            $query->whereHas('categories', function($query) use ($categories) {
                $query->whereIn('id', $categories);
            });
        }

        $result = $query->get(); 

        $return = [];

        if ($result) foreach ($result as $item) {

            // validate url
            if ($item->web) {
                $web = trim($item->web);
                if (strpos($web, 'https://') !== false) {       // contains https
                }
                elseif (strpos($web, 'http://') !== false) {    // contains http
                }
                else {                                          // does not contains https nor http
                    $web = 'http://'.$web;
                }
                $item->web = $web;
            }


            $return[] = $item;
        }

        return response()->json($return, 200, array(), JSON_PRETTY_PRINT);
    }

}