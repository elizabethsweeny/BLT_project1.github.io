$(document).ready(function () {

    var reportID = $.urlParam('REPORT_ID');
    if (reportID !== undefined && reportID != null) {
        $("#compareZipCodeButton").hide();
        $("#shareReportButton").hide();
        $("#zipCode1Input").attr("disabled", true);
        $("#zipCode2Input").attr("disabled", true);
        retrieveReportInfo(reportID);
    }

    $('#copyLinkToClipBoardButton').on('click', function (s, e) {
        copyToClipboard(document.getElementById("reportLinkInput"));
        fallbackCopyTextToClipboard($('#reportLinkInput').val());
    });

    $('#compareZipCodeButton').on('click', function (s, e) {

        zipCode1 = $('#zipCode1Input').val();
        zipCode2 = $('#zipCode2Input').val();
        $("#compareZipCodeButton").attr("disabled", true);
        $('#shareReportButton').attr("disabled", true);
        $("#compareZipCodeButton").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' +
            '&nbsp;&nbsp;Retrieving Data...');
        $('#loadingSign').removeClass('hiddenSign');
        $('#carouselExampleControls').addClass('hiddenSign');
        grabZipCodeData(zipCode1, zipCode2);

    });

    $('#shareReportButton').on('click', function (s, e) {

        zipCode1 = $('#zipCode1Input').val();
        zipCode2 = $('#zipCode2Input').val();

        var reportId = createShareReportLink(zipCode1, zipCode2);

    });

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

        var url = ("https://search.onboard-apis.com/communityapi/v2.0.0/Area/Full/?AreaId=ZI" + zipCode1);
        var data = {}
        var headers = {
            'Accept': 'application/json',
            'apikey': '736f1130096aa92549d800921bca8e8c'
        }

        function responseHandler(response) {
            var printedText = JSON.stringify(response, undefined, 4);

            //TESTING CONSOLE
            //console.log(response);
            //console.log(response.response.result.package.item[0].popdnsty);

            document.getElementById("APIreturn").value = printedText;
            document.getElementById('ATTOM_COMMUNITY_ATTRIBUTES__textarea').value = printedText;
        }

        makeAjaxGetCall(url, headers, data, responseHandler);

    });
});