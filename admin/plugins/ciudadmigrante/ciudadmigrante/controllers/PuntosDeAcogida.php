<?php namespace CiudadMigrante\CiudadMigrante\Controllers;

use Backend\Classes\Controller;
use BackendMenu;
use CiudadMigrante\CiudadMigrante\Models\PuntoDeAcogida;

class PuntosDeAcogida extends Controller
{
    public $implement = [
        'Backend\Behaviors\ListController',
        'Backend\Behaviors\FormController', 
        'Backend\Behaviors\RelationController',
        'Backend\Behaviors\ImportExportController',
    ];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';
    public $relationConfig = 'config_relations.yaml';
    public $importExportConfig = 'config_import_export.yaml';


    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('CiudadMigrante.CiudadMigrante', 'main-menu-item', 'side-menu-item');
        $this->addCss('/plugins/ciudadmigrante/ciudadmigrante/assets/css/styles.css');
    }



    public function formExtendFields($form)
    {
        if ($form->getField('latlng')->value) {
            list($lat, $lng) = explode(',', $form->getField('latlng')->value);
            $form->getField('latlng')->value = '{"lat":'.$lat.',"lng":'.$lng.'}';
        }
    }


    public function listInjectRowClass($record, $definition = null)
    {
        if (!$record->publicado) {
            return 'draft';
        }
    }

}
