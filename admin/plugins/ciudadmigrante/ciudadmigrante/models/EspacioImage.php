<?php namespace CiudadMigrante\CiudadMigrante\Models;

use Model;
use Session;

/**
 * Model
 */
class EspacioImage extends Model
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
    public $table = 'ciudadmigrante_ciudadmigrante_espacio_images';

    /*
     * Relations
     */
    public $attachOne = [
        'image' => 'System\Models\File'
    ];


/*    public function beforeSave()
    {
        if (!$this->sort_order) {
            $this->sort_order = self::where('espacio_id', $this->espacio_id)->max('sort_order') + 1;
        }
        
    }
*/
    public function getNextSortOrder($espacioId)
    {
        return self::where('espacio_id', $espacioId)->max('sort_order') + 1;
    }


}
