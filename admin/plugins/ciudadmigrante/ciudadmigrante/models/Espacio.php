<?php namespace CiudadMigrante\CiudadMigrante\Models;

use Model;

/**
 * Model
 */
class Espacio extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;
    
    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'ciudadmigrante_ciudadmigrante_espacios';

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];
 
    public $translatable = ['name', 'descripcion', 'button_title'];


    /*
     * Relations
     */
    public $attachOne = [
        'image' => 'System\Models\File'
    ];
    
    public $belongsToMany = [
        'categories' => [
            'CiudadMigrante\CiudadMigrante\Models\Category', 
            'table' => 'ciudadmigrante_ciudadmigrante_espacio_has_category', 
            'order' => 'sort_order'
        ],
    ];

    public $hasMany = [
        'images' => [
            'CiudadMigrante\CiudadMigrante\Models\EspacioImage', 
            'order' => 'sort_order asc',
            'delete' => true
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
