var ATTOM_API_KEY = '736f1130096aa92549d800921bca8e8c';
var GOOGLE_API_KEY = 'AIzaSyDUXdBkAnO21_I-Rp16IlMg6JDpVOsFF8s';
var MAIL_GUN_API_KEY = 'd46e6ab02c2e7f1e58d7d698e759fa6a-7bce17e5-cb901164';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAIq7RfSqW77MyT-OtoZazPfqxxiwVRfRw",
    authDomain: "blt-project-ucb-bootcamp.firebaseapp.com",
    databaseURL: "https://blt-project-ucb-bootcamp.firebaseio.com",
    projectId: "blt-project-ucb-bootcamp",
    storageBucket: "blt-project-ucb-bootcamp.appspot.com",
    messagingSenderId: "1008476463053",
    appId: "1:1008476463053:web:49943fcc17a1597d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var FIREBASE_DATABASE = firebase.database();

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

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
  } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  
  // copy the selection
  var succeed;
  try {
        succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
  }
  
  if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
      // clear temporary content
      target.textContent = "";
  }
  return succeed;
}