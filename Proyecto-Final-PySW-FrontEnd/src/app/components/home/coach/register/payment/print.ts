import { defaultColors } from "ng2-charts";

export class printStyle {    
      constructor(){
        
    }

    getStyle()
    {
        let style = " .container-pay[_ngcontent-sab-c70] {\
            border: 2px solid rgb(5, 3, 3);\
            border-radius: 20px 20px 20px 20px;\
        }\
        .mx-auto {\
            margin-right: auto!important;\
            margin-left: auto!important;\
        }\
        .col-10 {\
            flex: 0 0 auto;\
            width: 100%;\
        }\
        .row {\
            --bs-gutter-x: 1.5rem;\
            --bs-gutter-y: 0;\
            display: flex;\
            flex-wrap: wrap;\
            margin-top: calc(var(--bs-gutter-y) * -1);\
            margin-right: calc(var(--bs-gutter-x)/ -2);\
            margin-left: calc(var(--bs-gutter-x)/ -2);\
        }\
        form {\
            display: block;\
            margin-top: 0em;\
        }\
        .container-pay{\
            border: 2px solid rgb(5, 3, 3);\
            border-radius: 20px 20px 20px 20px;\
        }\
        .total-tr{\
                background-color: darkgrey;\
              }\
        "
        return style;
    }
}