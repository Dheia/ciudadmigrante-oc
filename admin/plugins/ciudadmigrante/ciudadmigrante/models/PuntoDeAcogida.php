<?php namespace CiudadMigrante\CiudadMigrante\Models;

use Model;
use CiudadMigrante\CiudadMigrante\Models\Settings;
use RainLab\Translate\Classes\Translator;
use KubaMarkiewicz\Translations\Models\Translation;
use Input;

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

    protected $guarded = [];


    public function beforeSave()
    {
        Translator::instance()->setLocale(Input::get('lang'));

        if ($this->latlng) {
            $latlng = json_decode($this->latlng);
            $this->latlng = $latlng->lat.','.$latlng->lng;
        }   

        // send email to user
        if ($this->isDirty('publicado') && $this->publicado && $this->usuario_email) {

            // send email to admin ---------------------------------------------------------------------
            $subject = Translation::translate('emails.Punto ayuda publicado.Asunto del email', 'Tu punto de ayuda ha sido publicado');
            $message = Translation::translate('emails.Punto ayuda publicado.Mensaje del email', "Tu punto de ayuda ha sido publicado en la web de Ciudad Migrante\nhttp://ciudadmigrante.es");

            $result = mail($this->usuario_email, $subject, $message, 'From: Ciudad Migrante <'.Settings::get('admin_email').'>');

        };     
    }


    public function getBooleanOptions()
    {
        return [
            0 => 'No',
            1 => 'Si'
        ];
    }
    
}
