function grabZipCodeData(zipCode1, zipCode2) {
    var url = ("https://search.onboard-apis.com/communityapi/v2.0.0/Area/Full/?AreaId=ZI" + zipCode1);
    var data = {}
    var headers = {
        'Accept': 'application/json',
        'apikey': ATTOM_API_KEY
    }

    function responseHandler(response) {

        var url = ("https://search.onboard-apis.com/communityapi/v2.0.0/Area/Full/?AreaId=ZI" + zipCode2);
        var data = {}
        var headers = {
            'Accept': 'application/json',
            'apikey': ATTOM_API_KEY
        }
        var extraParams = {
            'zipCode1Data': response
        }

        makeAjaxGetCall(url, headers, data, buildCharts, extraParams);

        function buildCharts(combinedResponse) {

            google.charts.load('current', {
                packages: ['corechart', 'bar']
            });
            google.charts.setOnLoadCallback(drawProjectedPopulationChart.bind(null, combinedResponse));

            function drawProjectedPopulationChart(rawData) {

                var zipCode1 = rawData.zipCode1Data.response.inputparameter.AreaId.substring(2);
                var zipCode2 = rawData.response.inputparameter.AreaId.substring(2);
                var zipCode1Data = rawData.zipCode1Data.response.result.package.item[0];
                var zipCode2Data = rawData.response.result.package.item[0];

                var data = google.visualization.arrayToDataTable([
                    ['Zip Code',
                        '10 year forecast.',
                        '5 year forecast.',
                        'Current',
                        '2010',
                        '2000',
                        '1990'
                    ],
                    [zipCode1,
                        Number.parseInt(zipCode1Data.poppy_10),
                        Number.parseInt(zipCode1Data.poppy_5),
                        Number.parseInt(zipCode1Data.popcy),
                        Number.parseInt(zipCode1Data.pop_10),
                        Number.parseInt(zipCode1Data.pop_00),
                        Number.parseInt(zipCode1Data.pop_90)
                    ],
                    [zipCode2,
                        Number.parseInt(zipCode2Data.poppy_10),
                        Number.parseInt(zipCode2Data.poppy_5),
                        Number.parseInt(zipCode2Data.popcy),
                        Number.parseInt(zipCode2Data.pop_10),
                        Number.parseInt(zipCode2Data.pop_00),
                        Number.parseInt(zipCode2Data.pop_90)
                    ]
                ]);

                var options = {
                    height: 500,
                    title: 'Projected population',
                    chartArea: {
                        width: '80%'
                    },
                    //colors: ['#b0120a', '#ffab91'],
                    hAxis: {
                        title: 'Population',
                        minValue: 0
                    },
                    vAxis: {
                        title: 'Zip Code'
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById('project_pop_chart'));
                chart.draw(data, options);
            }
        }
    }

    makeAjaxGetCall(url, headers, data, responseHandler);
}