<?php namespace CiudadMigrante\CiudadMigrante\Api;

use Illuminate\Routing\Controller;
use Input;
use RainLab\Translate\Classes\Translator;
use KubaMarkiewicz\Translations\Models\Translation;
use View;

class Metadata extends Controller
{


    public function index()
    {
        $data = [
            'title'         => 'Ciudad Migrante',
            'description'   => Translation::translate('compartir.descripcion'),
            'image'   		=> Translation::translate('compartir.url de imagen'),
        ];

        return View::make('ciudadmigrante.ciudadmigrante::metadata', $data);
    }

}