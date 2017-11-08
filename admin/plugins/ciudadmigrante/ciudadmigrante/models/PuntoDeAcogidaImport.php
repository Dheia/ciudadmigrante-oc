<?php namespace CiudadMigrante\CiudadMigrante\Models;

use CiudadMigrante\CiudadMigrante\Models\PuntoDeAcogida;
use CiudadMigrante\CiudadMigrante\Models\Category;

/**
 * Model
 */
class PuntoDeAcogidaImport extends \Backend\Models\ImportModel
{
    /**
     * @var array The rules to be applied to the data.
     */
    public $rules = [];

    public function importData($results, $sessionKey = null)
    {
        foreach ($results as $row => $data) {

            // try {
                $item = new PuntoDeAcogida();
                $item->name = $data['name'];
                $item->telefono = $data['telefono'];
                $item->email = $data['email'];
                $item->direccion = $data['direccion'];
                $item->codigo_postal = $data['codigo_postal'];
                $item->ciudad = $data['ciudad'];
                $item->web = $data['web'];
                $item->save();
                

                if ($data['ayuda_legal'] == 'si') {
                    $item->categories()->add(Category::find(3));
                }
                if ($data['empleo'] == 'si') {
                    $item->categories()->add(Category::find(4));
                }
                if ($data['acogida'] == 'si') {
                    $item->categories()->add(Category::find(1));
                }
                if ($data['lengua'] == 'si') {
                    $item->categories()->add(Category::find(2));
                }
                if ($data['vivienda'] == 'si') {
                    $item->categories()->add(Category::find(5));
                }
                if ($data['atencion_social'] == 'si') {
                    $item->categories()->add(Category::find(6));
                }
                if ($data['mujeres'] == 'si') {
                    $item->categories()->add(Category::find(8));
                }
                if ($data['salud'] == 'si') {
                    $item->categories()->add(Category::find(10));
                }
                if ($data['educacion'] == 'si') {
                    $item->categories()->add(Category::find(9));
                }
                if ($data['otros'] == 'si') {
                    $item->categories()->add(Category::find(11));
                }

                $item->save();

                $this->logCreated();
            // }
            // catch (\Exception $ex) {
            //     $this->logError($row, $ex->getMessage());
            // }

        }
    }
}
