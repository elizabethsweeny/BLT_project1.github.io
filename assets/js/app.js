$(document).ready(function () {



    //Variables for user input.
    //5 digit integer zip code.
    var zipCode1 = 0;
    var zipCode2 = 0;

    //Graph 1: Reading Analysis
    //Cost associated with magazing and newspaper subscriptions, nonsubscriptions and books. National average is 100.
    //(response.response.result.package.item[0].expread);
    var zipCode1_expread = 0;
    var zipCode2_expread = 0;

    //Graph 2: Foreclosure and Crime Comparison
    //Total crime risk. Average national value is 100.
    //(response.response.result.package.item[0].cocrmcytotc);
    var zipCode1_cocrmcytotc = 0;
    var zipCode2_cocrmcytotc = 0;
    //Total number of dwellings vacant in the area.
    //(response.response.result.package.item[0].dwlvacnt);
    var zipCode1_dwlvacnt = 0;
    var zipCode2_dwlvacnt = 0;

    //Below is a scalable implementation that we may decide to use later on. For now we are going to use a hardcoded variable schema.
    // //First zip code, first paramater value and field name from API.
    // var zipCode1_param1_value;
    // var zipCode1_param1_fieldname;

    // //First zip code, second paramater value and field name from API.
    // var zipCode1_param2_value;
    // var zipCode1_param2_fieldname;

    // //Second zip code, first paramater value and field name from API.
    // var zipCode2_param1_value;
    // var zipCode2_param1_fieldname;

    // //Second zip code, second paramater value and field name from API.
    // var zipCode2_param2_value;
    // var zipCode2_param2_fieldname;

    $('#compareZipCodeButton').on('click', function (s, e) {

        zipCode1 = $('#zipCode1Input').val();
        zipCode2 = $('#zipCode2Input').val();

        grabZipCodeData(zipCode1, zipCode2);

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