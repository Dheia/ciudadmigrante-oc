<?php namespace Fencus\GoogleMapsWidgets\formwidgets;

use Backend\Classes\FormWidgetBase;
use Fencus\GoogleMapsWidgets\Models\Settings as MapsSettings;
use ApplicationException;
use Lang;

class AddressFinder extends FormWidgetBase
{

	protected $defaultAlias = 'address-finder';
	
    public function widgetDetails()
    {
        return [
            'name'        => 'Address Finder',
            'description' => 'Address Finder'
        ];
    }
	
    public function init()
    {
    	$this->fillFromConfig([
    	]);
    }
    
    protected function loadAssets()
    {
    	
    }
    
    
    public function render()
    {
   		$this->vars['name'] = $this->formField->getName();
   		$this->vars['value'] = $this->getLoadValue();
   		$this->vars['api_key'] = MapsSettings::get('api_key');
		if(!$this->previewMode)
		{
			$this->addJs('js/addressfinder.js');
		}
    	return $this->makePartial('addressfinder');
    }
}
