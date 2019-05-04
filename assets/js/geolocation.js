////  Global Vars
var editClntInfoAutocompleteZipCode1, editClntInfoAutocompleteZipCode2;
var marker1, marker2;
var zipCode1Map, zipCode2Map;
var addrStreet = "",
    addressComponets = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

var options = {
    types: ['(regions)'],
    componentRestrictions: {
        country: "us"
    }
};

function initEditClntInfoAutoComplete() {

    editClntInfoAutocompleteZipCode1 = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('zipCode1Input')), options);

    zipCode1Map = new google.maps.Map(document.getElementById('mapZipCode1'), {
        center: {
            lat: -33.8688,
            lng: 151.2195
        },
        zoom: 10
    });

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    editClntInfoAutocompleteZipCode1.bindTo('bounds', zipCode1Map);
    marker1 = new google.maps.Marker({
        map: zipCode1Map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    editClntInfoAutocompleteZipCode2 = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('zipCode2Input')), options);

    zipCode2Map = new google.maps.Map(document.getElementById('mapZipCode2'), {
        center: {
            lat: -33.8688,
            lng: 151.2195
        },
        zoom: 10
    });

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    editClntInfoAutocompleteZipCode2.bindTo('bounds', zipCode2Map);
    marker2 = new google.maps.Marker({
        map: zipCode2Map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    editClntInfoAutocompleteZipCode1.addListener('place_changed', fillInEditClntInfoAddress1);
    editClntInfoAutocompleteZipCode2.addListener('place_changed', fillInEditClntInfoAddress2);
}

function fillInEditClntInfoAddress1() {

    marker1.setVisible(false);

    var place = editClntInfoAutocompleteZipCode1.getPlace();

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        zipCode1Map.fitBounds(place.geometry.viewport);
    } else {
        zipCode1Map.setCenter(place.geometry.location);
    }

    marker1.setPosition(place.geometry.location);
    marker1.setVisible(true);
    zipCode1Map.setZoom(13);

    for (var i = 0; i < place.address_components.length; i++) {

        var addressType = place.address_components[i].types[0];
        if (addressComponets[addressType]) {
            var val = place.address_components[i][addressComponets[addressType]];

            assignEditFrmAddrFieldsVal1(addressType, val);
        }

    }

    //if (addrStreet != "")
    //document.getElementById("zipCode1Input").value = addrStreet;

}

function fillInEditClntInfoAddress2() {
    
    marker2.setVisible(false);

    var place = editClntInfoAutocompleteZipCode2.getPlace();

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        zipCode2Map.fitBounds(place.geometry.viewport);
    } else {
        zipCode2Map.setCenter(place.geometry.location);
    }

    marker2.setPosition(place.geometry.location);
    marker2.setVisible(true);
    zipCode2Map.setZoom(13); 

    for (var i = 0; i < place.address_components.length; i++) {

        var addressType = place.address_components[i].types[0];
        if (addressComponets[addressType]) {
            var val = place.address_components[i][addressComponets[addressType]];
            assignEditFrmAddrFieldsVal2(addressType, val);
        }

    }

    //if (addrStreet != "")
    //document.getElementById("zipCode2Input").value = addrStreet;

}

function assignEditFrmAddrFieldsVal1(addressType, val) {

    switch (addressType) {
        case "administrative_area_level_1":
            //document.getElementById("").value = val;
            break;
        case "locality":
            //document.getElementById("").value = val;
            break;
        case "country":
            //document.getElementById("").value = val;
            break;
        case "postal_code":
            document.getElementById("zipCode1Input").value = val;
            break;
        case "street_number":
        case "route":
            addrStreet += " " + val;
            break;
    }
}

function assignEditFrmAddrFieldsVal2(addressType, val) {

    switch (addressType) {
        case "administrative_area_level_1":
            //document.getElementById("").value = val;
            break;
        case "locality":
            //document.getElementById("").value = val;
            break;
        case "country":
            //document.getElementById("").value = val;
            break;
        case "postal_code":
            document.getElementById("zipCode2Input").value = val;
            break;
        case "street_number":
        case "route":
            addrStreet += " " + val;
            break;
    }
}