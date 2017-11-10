<?php namespace CiudadMigrante\CiudadMigrante\Api;

use Illuminate\Routing\Controller;
use Input;
use CiudadMigrante\CiudadMigrante\Models\Relato;
use RainLab\Translate\Classes\Translator;

class Relatos extends Controller
{

    public function index()
    {
        Translator::instance()->setLocale(Input::get('lang'));

        $query = Relato::where('publicado', '1')
                        ->with('image')
                        ->with('puntos_de_acogida')
                        ->orderBy('sort_order', 'asc');

        $result = $query->get(); 

        $return = [];

        if ($result) foreach ($result as $item) {           
            if ($item->image) {
                $item->image_url = $item->image->getThumb(null,360);
            }
            $return[$item->id] = $item;
        }

        return response()->json($return, 200, array(), JSON_PRETTY_PRINT);
    }

}