function hidefields(fields) {
    for (i = 0; i < fields.length; i++) {
        $(fields[i]).hide();
    }
}

brokenseal = true;
datetimeString = '';

function renderResponse(i, len, data) {
    setTimeout(function () {
        count = i + 1;
        total = len - 1;
        message = data.name;
        value = data.status;
        if (i != len ) {
            $("#progress-msg").html($("#progress-msg").html() + 'Step ' + count.toString() + ' of ' + len.toString() + "... " + message + '</span>');
            $("#progress-msg").html($("#progress-msg").html() + ' [' + markMappings[value] + ']<br>')
        }
        setTimeout(function () {
            if (i == len - 1) {
                if (value == "passed" || value == "done") {
                    $("#progress-msg").html($("#progress-msg").html() + "<br>Success! The certificate has been verified with Blockchain.")
                    $("#verified").show();
                }
                else {
                    $("#progress-msg").html($("#progress-msg").html() + "Oops! The certificate could not be verified with Blockchain.");
                    if (brokenseal) {
                        mssg = brokenSealMssg("CUIDADO! ESTE PRODUCTO PARECE ORIGINAL PERO OTRA PERSONA LO ABRIO ANTES EL ");
                        $("#progress-msg").html($("#progress-msg").html() + "<br><b><font color=\"red\">" + mssg + datetimeString + "</b></font>");
                    }
                    $("#not-verified").show();
                }
            }
            else {
                //$("#progress-msg").html($("#progress-msg").html() + ' [' + markMappings[value] + ']<br>')
            }
        }, 75)

    }, timeDelay * i);
}

timeDelay = 180;
markMappings = { "passed": "PASS", "failed": "FAIL", "done": "DONE", "not_started": "NOT STARTED" }

$(document).ready(function () {
    $("#verify-button,#verify-button-AX2,#verify-button-interoleo").click(function () {
        hidefields(["#not-verified", "#verified"]);
        $("#progress-msg").html("");
        var data = $(this).attr('value');
        var uid = JSON.parse(data.replace(/'/g, '"')).uid;

        var item1 = { "name": "Checking certificate has not been tampered with", "status": "passed" }
        var item2 = { "name": "Checking certificate has not expired", "status": "passed" }
        var item3 = { "name": "Checking not revoked by issuer", "status": "passed" }
        var item4 = { "name": "Checking authenticity", "status": "failed" }
        res = [item1, item2, item3, item4]
        $("#progress-msg").show();
        if (res == null) {
            $("#progress-msg").html($("#progress-msg").html() + "Oops! There was an issue connecting to the Blockchain.info API")
        }
        else {

            for (i = 0; i < res.length; i++) {
                renderResponse(i, res.length, res[i]);
            }
            if (res[0].status == "passed" && res[1].status == "passed" && res[2].status == "passed" && res[3].status == "passed" && res[4].status == "failed") {
                brokenseal = true;
                datetimeString = res[4].name.substring(24, 41) + ' UTC)';
            }
        }
    });
});
