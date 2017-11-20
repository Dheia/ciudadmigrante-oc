<?php namespace KubaMarkiewicz\Translations\Controllers;

use Backend\Classes\Controller;
use BackendMenu;
use KubaMarkiewicz\Translations\Models\Translation;
use Backend\Models\BrandSetting;
use Flash;
use RainLab\Translate\Classes\Translator;
use Lang;
use RainLab\Translate\Models\Locale as LocaleModel;
use Session;


class Translations extends Controller
{
    public $implement = ['Backend\Behaviors\ListController','Backend\Behaviors\FormController'];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';

    public function __construct()
    {
        parent::__construct();

        $this->addCss('/plugins/kubamarkiewicz/translations/assets/css/styles.css');
    }


    public function section($section = null, $locale = null)
    {
        if (!Session::get('translationsLocale')) {
            Session::put('translationsLocale', LocaleModel::getDefault()->code);
        }
        if ($locale) {
            Session::put('translationsLocale', $locale);
        }

        $cmsLang = Lang::getLocale();
        Translator::instance()->setLocale(Session::get('translationsLocale'));

        $query = Translation::orderBy('sort_order', 'asc');
        $result = $query->get();

        $sections = [];
        $items = [];

        if ($result) foreach ($result as $item) {
            // find item section
            $sectionsData = explode('.', $item->code);
            array_pop($sectionsData);
            $sectionRef = &$sections; 
            if ($sectionsData) foreach ($sectionsData as $key) {
                $sectionRef = &$sectionRef[$key];
            }
            // add item to return
            if (implode('.', $sectionsData) == $section) {
                $items[] = $item;
            }
        }

        Translator::instance()->setLocale($cmsLang);

        // dump($sections); exit;

        $this->vars['section'] = $section;
        $this->vars['sections'] = $sections;
        $this->vars['items'] = $items;

        $this->vars['languages'] = LocaleModel::listEnabled();
        $this->vars['language'] = Session::get('translationsLocale');

        $this->vars['secondary_color'] = BrandSetting::get('secondary_color');


        /*
         * Make form widget
         */
        $config = new \stdClass;
        $config->model = new Translation;
        $config->fields = [];
        $config->data = [];
        if ($items) foreach ($items as $item) {
            $slug = str_replace('.','\.',$item->code);
            $config->fields[$slug] = [
                'label' => substr($item->code, (strrpos($item->code, '.')) + 1)
            ];
            switch ($item->type) {
                case 'richeditor':
                    $config->fields[$slug]['type'] = 'richeditor';
                    $config->fields[$slug]['size'] = 'small';
                    $config->fields[$slug]['toolbarButtons'] = 'paragraphFormat|bold|italic|clearFormatting|align|outdent|indent|formatOL|formatUL|insertHR|insertLink|insertFile|insertImage|insertVideo|insertTable|fullscreen|html';
                    break;
                default:
                    $config->fields[$slug]['type'] = 'textarea';
                    $config->fields[$slug]['size'] = 'tiny';
                    $item->translation = str_replace(["<br>", "<br/>", "<br />"], "", $item->translation);
                    break;
            }
            $config->data[$slug] = $item->translation;
        }

        $form = $this->makeWidget('Backend\Widgets\Form', $config);
        $form->bindToController();

        $this->vars['form'] = $form;
    }



    public function section_onSave($section)
    {
        Translator::instance()->setLocale(Session::get('translationsLocale'));
        // dump(post()); exit;

        $data = post();

        foreach ($data as $key => $value) if (!in_array($key, ['_session_key', '_token', 'redirect'])) {
            $key = str_replace('\_', '.', $key);

            $row = Translation::where('code', $key)->first();
            if ($row) {
                if (!$row->type) {
                    $value = nl2br($value);
                }
                $row->translation = $value;
                $row->save();
            }
        }

        Flash::success('backend::lang.form.update_success');
    }
}