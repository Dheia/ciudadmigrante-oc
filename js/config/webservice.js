
/* Rename this file to "webservice.js" */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {

        "user_login"                    : "dummy-webservice/user_login.json",
        "user_has_access"               : "dummy-webservice/user_has_access.json",

        "get_alerts"                    : "dummy-webservice/get_alerts.json",
        "get_blocked_products"          : "dummy-webservice/get_blocked_products.json",
        "data_get_popup_alerts"         : "dummy-webservice/get_popup_alerts.json",
        "data_get_signals_L9_flow"      : "dummy-webservice/data_get_signals_L9_flow.json",
        "data_get_signals_M1_flow"      : "dummy-webservice/data_get_signals_M1_flow.json",
        "data_get_edi_files_flow"       : "dummy-webservice/data_get_edi_files_flow.json",
        "data_get_glt_wires_flow"       : "dummy-webservice/data_get_glt_wires_flow.json",

        "get_agvs"                      : "dummy-webservice/get_agvs.php",
        "update_agv"                    : "dummy-webservice/empty.json",
        "get_storage_position_niches"   : "dummy-webservice/get_storage_position_niches.json",
        "get_semaphores"                : "dummy-webservice/get_semaphores.json",
        "update_semaphore"              : "dummy-webservice/empty.json",
        "get_transport_belts"           : "dummy-webservice/get_transport_belts.json",
        "update_transport_belt"         : "dummy-webservice/empty.json",
        "process_get_popup_alerts"      : "dummy-webservice/get_popup_alerts.json",

        "get_readers_for_blocking"      : "dummy-webservice/get_readers.json",
        "blockings_get_blocked_products": "dummy-webservice/get_blocked_products.json",
        "block_products"                : "dummy-webservice/block_products.json",
        "unblock_products"              : "dummy-webservice/unblock_products.json",
        "select_reader_for_blocking"    : "dummy-webservice/select_reader.json",
        "get_reading_for_blocking"      : "dummy-webservice/get_reader_reading.json",
        "block_products_from_file"      : "dummy-webservice/block_products_from_file.json",
        "unblock_products_from_file"    : "dummy-webservice/unblock_products_from_file.json",

        "get_readers_for_receiving"     : "dummy-webservice/get_readers.json",
        "receive_products"              : "dummy-webservice/receive_products.json",
        "select_reader_for_receiving"   : "dummy-webservice/select_reader.json",
        "get_reading_for_receiving"     : "dummy-webservice/get_reading_for_manual_mode.json",
        "receive_products_from_file"    : "dummy-webservice/receive_products_from_file.json",
        
        "get_readers_for_manual_mode"   : "dummy-webservice/get_readers.json",
        "get_actions"                   : "dummy-webservice/manual_get_actions.json",
        "select_reader_for_manual_mode" : "dummy-webservice/select_reader.json",
        "get_reading_for_manual_mode"   : "dummy-webservice/get_reading_for_manual_mode.json",
        "select_action"                 : "dummy-webservice/select_action.json",
        "manual_get_file_actions"       : "dummy-webservice/manual_get_file_actions.json",
        "upload_actions_file"           : "dummy-webservice/upload_actions_file.json",
        "manual_get_notification_actions"        : "dummy-webservice/manual_get_notification_actions.json",
        "manual_generate_notification"           : "dummy-webservice/manual_generate_notification.json",

        "get_parameters"                : "dummy-webservice/get_parameters.json",
        "save_parameters"               : "dummy-webservice/empty.json",
        "parameters_get_pause_status"   : "dummy-webservice/parameters_get_pause_status.json",

        "vis_reception_get_glt_in_asn"      : "dummy-webservice/vis_reception_get_glt_in_asn.json",
        "vis_reception_get_asn"             : "dummy-webservice/vis_reception_get_asn.json",
        "vis_reception_get_read_in_process" : "dummy-webservice/vis_reception_get_read_in_process.json",
        "vis_reception_get_alerts"          : "dummy-webservice/vis_reception_get_alerts.json",
        "vis_reception_get_glt_incoming"    : "dummy-webservice/vis_reception_get_glt_incoming.json",
        "vis_reception_generate_notification" : "dummy-webservice/vis_reception_generate_notofication.json",

        "enter_Login"                   : "dummy-webservice/enter.json",
        "enter_Data"                    : "dummy-webservice/enter.json",
        "enter_Reception"               : "dummy-webservice/enter.json",
        "enter_Lockings"                : "dummy-webservice/enter.json",
        "enter_Manual"                  : "dummy-webservice/enter.json",
        "enter_Process"                 : "dummy-webservice/enter.json",
        "enter_Parameters"              : "dummy-webservice/enter.json",
        "enter_VisuReception"            : "dummy-webservice/enter.json",

        "exit_Data"                     : "dummy-webservice/exit.json",
        "exit_Reception"                : "dummy-webservice/exit.json",
        "exit_Lockings"                 : "dummy-webservice/exit.json",
        "exit_Manual"                   : "dummy-webservice/exit.json",
        "exit_Process"                  : "dummy-webservice/exit.json",
        "exit_Parameters"               : "dummy-webservice/exit.json",
        "exit_VisuReception"             : "dummy-webservice/exit.json"

    }

}