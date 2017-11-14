<?php namespace CiudadMigrante\CiudadMigrante\Models;

use Model;

/**
 * Model
 */
class PuntoDeAcogida extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'ciudadmigrante_ciudadmigrante_puntos_de_acogida';

    public $belongsToMany = [
        'categories' => [
            'CiudadMigrante\CiudadMigrante\Models\Category', 
            'table' => 'ciudadmigrante_ciudadmigrante_punto_de_acogida_has_category', 
            'order' => 'sort_order'
        ]
    ];


    public function beforeSave()
    {
        if ($this->latlng) {
            $latlng = json_decode($this->latlng);
            $this->latlng = $latlng->lat.','.$latlng->lng;
        }           
    }



    
}
