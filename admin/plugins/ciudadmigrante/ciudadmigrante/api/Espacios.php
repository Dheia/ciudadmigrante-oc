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
                        ->with('image_map')
                        ->with('images.image')
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
            if ($item->image_map) {
                $item->image_map_url = $item->image_map->getThumb(540,null);
            }
            
            $return[] = $item;
        }

        return response()->json($return, 200, array(), JSON_PRETTY_PRINT);
    }


    public function find($id)
    {
        Translator::instance()->setLocale(Input::get('lang'));

        $query = Espacio::where('id', $id)
                        ->with('images.image');

        $result = $query->first();   

        return response()->json($result, 200, array(), JSON_PRETTY_PRINT);
    }

}