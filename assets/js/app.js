$(document).ready(function () {

    // ZILLOW API Key: X1-ZWz1h1dha4cc97_68qz7
    var ZILLOW_API_ID = 'X1-ZWz1h1dha4cc97_68qz7';

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

    $('#zillowCallButton').on('click', function (s) {

        var ZillowURL = "https://www.zillow.com/webservice/GetSearchResults.htm";

        $.ajax({
                type: "GET",
                dataType: "xml",
                contentType: 'text/xml',
                crossDomain: true,
                jsonp: "callback",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                },
                url: ZillowURL,
                data: {
                    'zws-id': ZILLOW_API_ID,
                    'address': '948 Grant St',
                    'citystatezip': '94590',
                    'rentzestimate': true,
                    'output': 'xml'
                },
                crossDomain: true,
                success: function (xmlResponse, e) {
                    var xmlResult = $(xmlResponse).find('result')[0];

                }
            })
            .done(function (data) {
                console.log("done");
            })
            .fail(function (xhr, textStatus, errorThrown) {
                alert(xhr.responseText);
                alert(textStatus);
            });


    });
});