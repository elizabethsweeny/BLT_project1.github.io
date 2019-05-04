$(document).ready(function () {

});


function createShareReportLink(zipcode1, zipcode2) {

    $('#sharedLinkModal').modal('show');

    $('#sharedLinkModal').off('shown.bs.modal');
    $('#sharedLinkModal').on('shown.bs.modal', function () {

        var reportId = create_UUID();
        FIREBASE_DATABASE.ref('report/' + reportId).set({
            zip1: zipcode1,
            zip2: zipcode2
        });

        var linkAddress = 'https://elizabethsweeny.github.io/BLT_project1.github.io/?REPORT_ID=' + reportId;
        $('#reportLinkInput').val(linkAddress);

        return reportId;
    });

}

function retrieveReportInfo(reportId) {

    return firebase.database().ref('report/' + reportId).once('value').then(function (snapshot) {

        var zipCode1 = (snapshot.val() && snapshot.val().zip1);
        var zipCode2 = (snapshot.val() && snapshot.val().zip2);

        $('#zipCode1Input').val(zipCode1);
        $('#zipCode2Input').val(zipCode2);

        $("#zipCode1Input").attr("disabled", true);
        $("#zipCode2Input").attr("disabled", true);

        $("#compareZipCodeButton").hide();
        $("#shareReportButton").hide();

        grabZipCodeData(zipCode1, zipCode2);

    });

}