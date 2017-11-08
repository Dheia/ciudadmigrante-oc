<?php namespace Fencus\GoogleMapsWidgets\formwidgets;

use Backend\Classes\FormWidgetBase;
use Fencus\GoogleMapsWidgets\Models\Settings as MapsSettings;
use ApplicationException;
use Lang;

class LocationSelector extends FormWidgetBase
{

	public $width = "100%";
	public $height = "300px";
	
	protected $defaultAlias = 'location-selector';
	
    public function widgetDetails()
    {
        return [
            'name'        => 'Location Selector',
            'description' => 'Location Selector'
        ];
    }
	
    public function init()
    {
    	$this->fillFromConfig([
    			'width',
    			'height'
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
   		$this->vars['locationDefault'] = MapsSettings::get('location');
   		
   		$this->vars['width'] = $this->width;
   		$this->vars['height'] = $this->height;
   		
		if($this->previewMode)
		{
			$this->addJs('js/locationselector_preview.js');
		}
		else
		{
			$this->addJs('js/locationselector.js');
		}
    	return $this->makePartial('locationselector');
    	
    }
}
