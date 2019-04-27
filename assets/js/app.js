$(document).ready(function () {

    var ATTOM_API_KEY = '736f1130096aa92549d800921bca8e8c';
    var ZILLOW_API_KEY = 'X1-ZWz1h1dha4cc97_68qz7';

    var parseXml;

    if (typeof window.DOMParser != "undefined") {
        parseXml = function (xmlStr) {
            return new window.DOMParser().parseFromString(xmlStr, "text/xml");
        };
    } else if (typeof window.ActiveXObject != "undefined" &&
        new window.ActiveXObject("Microsoft.XMLDOM")) {
        parseXml = function (xmlStr) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
        };
    } else {
        throw new Error("No XML parser found");
    }

    function makeAjaxGetCall(queryURL, extraHeaders, dataParams, callBack) {

        var ajaxHeaders = {
            //'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Methods': 'GET'
        };

        for (var key in extraHeaders) {
            if (extraHeaders.hasOwnProperty(key)) {
                ajaxHeaders[key] = extraHeaders[key];
            }
        }

        $.ajax({
                type: "GET",
                //dataType: "json",
                //contentType: 'text/json',
                jsonp: "callback",
                crossDomain: true,
                headers: ajaxHeaders,
                url: queryURL,
                data: dataParams,
                success: function (response, e) {
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

    $('#ATTOM_PROPERTY_ADDRESS_BUTTON').on('click', function (s, e) {

        var url = 'https://search.onboard-apis.com/propertyapi/v1.0.0/property/address';
        var zipCode = '94105';
        var pageNumber = 1;
        var pageSize = 20;

        var data = {
            'postalcode': zipCode,
            'page': pageNumber,
            'pagesize': pageSize
        }
        var headers = {
            'Accept': 'application/json',
            'apikey': '736f1130096aa92549d800921bca8e8c'
        }

        function responseHandler(response) {
            var printedText = JSON.stringify(response, undefined, 4);
            document.getElementById('ATTOM_PROPERTY_ADDRESS__textarea').value = printedText;
        }

        makeAjaxGetCall(url, headers, data, responseHandler);

    });

    $('#ATTOM_SCHOOLS_SNAPSHOT_BUTTON').on('click', function (s, e) {

        var url = 'https://search.onboard-apis.com/propertyapi/v1.0.0/school/snapshot';
        var data = {
            'latitude': '39.731234',
            'longitude': '-75.581182',
            'radius': '5',
            'filetypetext': 'private'
        }
        var headers = {
            'Accept': 'application/json',
            'apikey': '736f1130096aa92549d800921bca8e8c'
        }

        function responseHandler(response) {
            var printedText = JSON.stringify(response, undefined, 4);
            document.getElementById('ATTOM_SCHOOLS_SNAPSHOT__textarea').value = printedText;
        }

        makeAjaxGetCall(url, headers, data, responseHandler);

    });

    $('#ATTOM_COMMUNITY_ATTRIBUTES_BUTTON').on('click', function (s, e) {

        var url = 'https://search.onboard-apis.com/communityapi/v2.0.0/attribute/lookup';
        var data = {
        }
        var headers = {
            'Accept': 'application/json',
            'apikey': '736f1130096aa92549d800921bca8e8c'
        }

        function responseHandler(response) {
            var printedText = JSON.stringify(response, undefined, 4);
            document.getElementById('ATTOM_COMMUNITY_ATTRIBUTES__textarea').value = printedText;
        }

        makeAjaxGetCall(url, headers, data, responseHandler);

    });


});