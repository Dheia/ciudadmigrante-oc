<?php namespace CiudadMigrante\CiudadMigrante\Api;

use Illuminate\Routing\Controller;
use Input;
use CiudadMigrante\CiudadMigrante\Models\Espacio;
use RainLab\Translate\Classes\Translator;

class Espacios extends Controller
{

    public function index()
    {
        Translator::instance()->setLocale(Input::get('lang'));

        $categories = [];
        if (Input::get('categories')) {
            $categories = explode(',', Input::get('categories'));
        }

        $query = Espacio::where('publicado', '1')
                        ->with('image')
                        ->orderBy('sort_order', 'asc');

        if ($categories) {
            $query->whereHas('categories', function($query) use ($categories) {
                $query->whereIn('id', $categories);
            });
        }
                        

        $result = $query->get(); 

        $return = [];

        if ($result) foreach ($result as $item) {           
            if ($item->image) {
                $item->image_url = $item->image->getThumb(null,null);
            }
            
            $return[$item->id] = $item;
        }

        return response()->json($return, 200, array(), JSON_PRETTY_PRINT);
    }

}