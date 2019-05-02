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
            google.charts.setOnLoadCallback(drawProjectedGenderPopulationChart.bind(null, combinedResponse));
            google.charts.setOnLoadCallback(drawAgePopulationChart.bind(null, combinedResponse));
           
            function drawAgePopulationChart(rawData) {

                var zipCode1 = rawData.zipCode1Data.response.inputparameter.AreaId.substring(2);
                var zipCode2 = rawData.response.inputparameter.AreaId.substring(2);
                var zipCode1Data = rawData.zipCode1Data.response.result.package.item[0];
                var zipCode2Data = rawData.response.result.package.item[0];

                var dataZipCode1 = google.visualization.arrayToDataTable([
                    ['Age', 'Total'],
                    ['0-4', Number.parseInt(zipCode1Data.age00_04)],
                    ['5-9', Number.parseInt(zipCode1Data.age05_09)],
                    ['10-14', Number.parseInt(zipCode1Data.age10_14)],
                    ['15-19', Number.parseInt(zipCode1Data.age15_19)],
                    ['20-24', Number.parseInt(zipCode1Data.age20_24)],
                    ['25-29', Number.parseInt(zipCode1Data.age25_29)],
                    ['30-34', Number.parseInt(zipCode1Data.age30_34)],
                    ['35-39', Number.parseInt(zipCode1Data.age35_39)],
                    ['40-44', Number.parseInt(zipCode1Data.age40_44)],
                    ['45-49', Number.parseInt(zipCode1Data.age45_49)],
                    ['50-54', Number.parseInt(zipCode1Data.age50_54)],
                    ['55-59', Number.parseInt(zipCode1Data.age55_59)],
                    ['60-64', Number.parseInt(zipCode1Data.age60_64)],
                    ['65-69', Number.parseInt(zipCode1Data.age65_69)],
                    ['70-74', Number.parseInt(zipCode1Data.age70_74)],
                    ['75-79', Number.parseInt(zipCode1Data.age75_79)],
                    ['80-84', Number.parseInt(zipCode1Data.age80_84)],
                    ['85+', Number.parseInt(zipCode1Data.agegt85)]
                ]);

                var dataZipCode2 = google.visualization.arrayToDataTable([
                    ['Age', 'Total'],
                    ['0-4', Number.parseInt(zipCode2Data.age00_04)],
                    ['5-9', Number.parseInt(zipCode2Data.age05_09)],
                    ['10-14', Number.parseInt(zipCode2Data.age10_14)],
                    ['15-19', Number.parseInt(zipCode2Data.age15_19)],
                    ['20-24', Number.parseInt(zipCode2Data.age20_24)],
                    ['25-29', Number.parseInt(zipCode2Data.age25_29)],
                    ['30-34', Number.parseInt(zipCode2Data.age30_34)],
                    ['35-39', Number.parseInt(zipCode2Data.age35_39)],
                    ['40-44', Number.parseInt(zipCode2Data.age40_44)],
                    ['45-49', Number.parseInt(zipCode2Data.age45_49)],
                    ['50-54', Number.parseInt(zipCode2Data.age50_54)],
                    ['55-59', Number.parseInt(zipCode2Data.age55_59)],
                    ['60-64', Number.parseInt(zipCode2Data.age60_64)],
                    ['65-69', Number.parseInt(zipCode2Data.age65_69)],
                    ['70-74', Number.parseInt(zipCode2Data.age70_74)],
                    ['75-79', Number.parseInt(zipCode2Data.age75_79)],
                    ['80-84', Number.parseInt(zipCode2Data.age80_84)],
                    ['85+', Number.parseInt(zipCode2Data.agegt85)]
                ]);

                var options = {
                    title: 'Population by Age',
                    pieHole: 0.4,
                    chartArea: {
                        width: '80%'
                    },
                    height: 500,
                };

                var chart1 = new google.visualization.PieChart(document.getElementById('age_pop_chart1'));
                chart1.draw(dataZipCode1, options);
                var chart2 = new google.visualization.PieChart(document.getElementById('age_pop_chart2'));
                chart2.draw(dataZipCode2, options);
            }

            function drawProjectedGenderPopulationChart(rawData) {

                var zipCode1 = rawData.zipCode1Data.response.inputparameter.AreaId.substring(2);
                var zipCode2 = rawData.response.inputparameter.AreaId.substring(2);
                var zipCode1Data = rawData.zipCode1Data.response.result.package.item[0];
                var zipCode2Data = rawData.response.result.package.item[0];

                var dataZipCode1 = google.visualization.arrayToDataTable([
                    ['Gender', '% of Population'],
                    ['Male', Number.parseInt(zipCode1Data.popmale)],
                    ['Female', Number.parseInt(zipCode1Data.popfemale)]
                ]);

                var dataZipCode2 = google.visualization.arrayToDataTable([
                    ['Gender', '% of Population'],
                    ['Male', Number.parseInt(zipCode2Data.popmale)],
                    ['Female', Number.parseInt(zipCode2Data.popfemale)]
                ]);

                var options = {
                    title: 'Population by Gender',
                    pieHole: 0.4,
                    chartArea: {
                        width: '80%'
                    },
                    height: 500,
                };

                var chart1 = new google.visualization.PieChart(document.getElementById('gender_pop_chart1'));
                chart1.draw(dataZipCode1, options);
                var chart2 = new google.visualization.PieChart(document.getElementById('gender_pop_chart2'));
                chart2.draw(dataZipCode2, options);
            }

        }

        function drawProjectedPopulationChart(rawData) {

            var zipCode1 = rawData.zipCode1Data.response.inputparameter.AreaId.substring(2);
            var zipCode2 = rawData.response.inputparameter.AreaId.substring(2);
            var zipCode1Data = rawData.zipCode1Data.response.result.package.item[0];
            var zipCode2Data = rawData.response.result.package.item[0];

            var data1 = google.visualization.arrayToDataTable([
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
                ]
            ]);

            var data2 = google.visualization.arrayToDataTable([
                ['Zip Code',
                    '10 year forecast.',
                    '5 year forecast.',
                    'Current',
                    '2010',
                    '2000',
                    '1990'
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
                    width: '60%'
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
            var chart1 = new google.visualization.BarChart(document.getElementById('project_pop_chart1'));
            chart1.draw(data1, options);
            var chart2 = new google.visualization.BarChart(document.getElementById('project_pop_chart2'));
            chart2.draw(data2, options);
        }
    }

    makeAjaxGetCall(url, headers, data, responseHandler);
}