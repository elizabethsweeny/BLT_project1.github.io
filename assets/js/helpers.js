var ATTOM_API_KEY = '736f1130096aa92549d800921bca8e8c';
var GOOGLE_API_KEY = 'AIzaSyDUXdBkAnO21_I-Rp16IlMg6JDpVOsFF8s';

var XML_PARSER;

if (typeof window.DOMParser != "undefined") {
    XML_PARSER = function (xmlStr) {
        return new window.DOMParser().parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
    new window.ActiveXObject("Microsoft.XMLDOM")) {
    XML_PARSER = function (xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}


function makeAjaxGetCall(queryURL, extraHeaders, dataParams, callBack, extraParams) {

    var ajaxHeaders = {
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Methods': 'GET'
    };

    var ajaxExtraParams = {};

    for (var key in extraHeaders) {
        if (extraHeaders.hasOwnProperty(key)) {
            ajaxHeaders[key] = extraHeaders[key];
        }
    }

    if (extraParams !== undefined && extraParams != null) {
        for (var key in extraParams) {
            if (extraParams.hasOwnProperty(key)) {
                ajaxExtraParams[key] = extraParams[key];
            }
        }
    }

    $.ajax({
            type: "GET",
            //dataType: "json",
            //contentType: 'text/json',
            passedParameters: extraParams,
            jsonp: "callback",
            crossDomain: true,
            headers: ajaxHeaders,
            url: queryURL,
            data: dataParams,
            success: function (response, e) {
                if (this.passedParameters !== undefined && this.passedParameters != null) {
                    for (var key in this.passedParameters) {
                        if (this.passedParameters.hasOwnProperty(key)) {
                            response[key] = this.passedParameters[key];
                        }
                    }
                }
                callBack(response);
            }
        })
        .done(function (data) {
            console.log("done");
        })
        .fail(function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
        });

}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}