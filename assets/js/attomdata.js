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

            $("#compareZipCodeButton").attr("disabled", false);
            $("#compareZipCodeButton").html('Compare Zip Codes');
            $('#loadingSign').addClass('hiddenSign');
            $('#carouselExampleControls').removeClass('hiddenSign');
            $('#shareReportButton').attr("disabled", false);

            google.charts.load('current', {
                packages: ['corechart', 'bar', 'gauge']
            });

            google.charts.setOnLoadCallback(drawProjectedPopulationChart.bind(null, combinedResponse));
            google.charts.setOnLoadCallback(drawProjectedGenderPopulationChart.bind(null, combinedResponse));
            google.charts.setOnLoadCallback(drawAgePopulationChart.bind(null, combinedResponse));
            google.charts.setOnLoadCallback(drawHouseholdIncomeChart.bind(null, combinedResponse));
            google.charts.setOnLoadCallback(drawSafetyChart.bind(null, combinedResponse));

            function drawSafetyChart(rawData) {

                var zipCode1 = rawData.zipCode1Data.response.inputparameter.AreaId.substring(2);
                var zipCode2 = rawData.response.inputparameter.AreaId.substring(2);
                var zipCode1Data = rawData.zipCode1Data.response.result.package.item[0];
                var zipCode2Data = rawData.response.result.package.item[0];


                var dataZipCode1 = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Assault',  Number.parseInt(zipCode1Data.cocrmcyasst)],
                    ['Burglary',  Number.parseInt(zipCode1Data.cocrmcyburg)],
                    ['Larceny',  Number.parseInt(zipCode1Data.cocrmcylarc)],
                    ['Murder',  Number.parseInt(zipCode1Data.cocrmcymurd)]
                ]);

                var dataZipCode2 = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Assault',  Number.parseInt(zipCode2Data.cocrmcyasst)],
                    ['Burglary',  Number.parseInt(zipCode2Data.cocrmcyburg)],
                    ['Larceny',  Number.parseInt(zipCode2Data.cocrmcylarc)],
                    ['Murder',  Number.parseInt(zipCode2Data.cocrmcymurd)]
                ]);

                var options = {
                    width: 500,
                    height: 500,
                    redFrom: 125,
                    redTo: 200,
                    yellowFrom: 100,
                    yellowTo: 125,
                    minorTicks: 5,
                    max: 200
                };

                var chart1 = new google.visualization.Gauge(document.getElementById('weather_risk_chart1'));
                chart1.draw(dataZipCode1, options);
                var chart2 = new google.visualization.Gauge(document.getElementById('weather_risk_chart2'));
                chart2.draw(dataZipCode2, options);
            }

            function drawWeatherRiskChart(rawData) {

                var zipCode1 = rawData.zipCode1Data.response.inputparameter.AreaId.substring(2);
                var zipCode2 = rawData.response.inputparameter.AreaId.substring(2);
                var zipCode1Data = rawData.zipCode1Data.response.result.package.item[0];
                var zipCode2Data = rawData.response.result.package.item[0];


                var dataZipCode1 = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Ozone Index',  Number.parseInt(zipCode1Data.ozone)],
                    ['Particulate Matter Index',  Number.parseInt(zipCode1Data.pm10)],
                    ['Hail Index',  Number.parseInt(zipCode1Data.rskcyhanx)],
                    ['Hurricane Index',  Number.parseInt(zipCode1Data.rskcyhunx)],
                    ['Earthquake Risk',  Number.parseInt(zipCode1Data.rskcyquak)],
                    ['Weather Risk',  Number.parseInt(zipCode1Data.rskcyrisk)],
                    ['Tornado Index',  Number.parseInt(zipCode1Data.rskcytonx)],
                    ['Wind Index',  Number.parseInt(zipCode1Data.rskcywinx)]
                ]);

                var dataZipCode2 = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Ozone Index',  Number.parseInt(zipCode2Data.ozone)],
                    ['Particulate Matter Index',  Number.parseInt(zipCode2Data.pm10)],
                    ['Hail Index',  Number.parseInt(zipCode2Data.rskcyhanx)],
                    ['Hurricane Index',  Number.parseInt(zipCode2Data.rskcyhunx)],
                    ['Earthquake Risk',  Number.parseInt(zipCode2Data.rskcyquak)],
                    ['Weather Risk',  Number.parseInt(zipCode2Data.rskcyrisk)],
                    ['Tornado Index',  Number.parseInt(zipCode2Data.rskcytonx)],
                    ['Wind Index',  Number.parseInt(zipCode2Data.rskcywinx)]
                ]);

                var options = {
                    width: 500,
                    height: 500,
                    redFrom: 90,
                    redTo: 100,
                    yellowFrom: 75,
                    yellowTo: 90,
                    minorTicks: 5
                };

                var chart1 = new google.visualization.Gauge(document.getElementById('weather_risk_chart1'));
                chart1.draw(dataZipCode1, options);
                var chart2 = new google.visualization.Gauge(document.getElementById('weather_risk_chart2'));
                chart2.draw(dataZipCode2, options);
            }

            function drawAgePopulationChart(rawData) {

                var zipCode1 = rawData.zipCode1Data.response.inputparameter.AreaId.substring(2);
                var zipCode2 = rawData.response.inputparameter.AreaId.substring(2);
                var zipCode1Data = rawData.zipCode1Data.response.result.package.item[0];
                var zipCode2Data = rawData.response.result.package.item[0];

                var dataZipCode1 = google.visualization.arrayToDataTable([
                    ['Age', 'Total'],
                    ['0-9', Number.parseInt(zipCode1Data.age00_04) + Number.parseInt(zipCode1Data.age05_09)],
                    ['10-19', Number.parseInt(zipCode1Data.age10_14) + Number.parseInt(zipCode1Data.age15_19)],
                    ['20-29', Number.parseInt(zipCode1Data.age20_24) + Number.parseInt(zipCode1Data.age25_29)],
                    ['30-39', Number.parseInt(zipCode1Data.age30_34) + Number.parseInt(zipCode1Data.age35_39)],
                    ['40-49', Number.parseInt(zipCode1Data.age40_44) + Number.parseInt(zipCode1Data.age45_49)],
                    ['50-59', Number.parseInt(zipCode1Data.age50_54) + Number.parseInt(zipCode1Data.age55_59)],
                    ['60-69', Number.parseInt(zipCode1Data.age60_64) + Number.parseInt(zipCode1Data.age65_69)],
                    ['70-79', Number.parseInt(zipCode1Data.age70_74) + Number.parseInt(zipCode1Data.age75_79)],
                    ['80-85+', Number.parseInt(zipCode1Data.age80_84) + Number.parseInt(zipCode1Data.agegt85)]
                ]);

                var dataZipCode2 = google.visualization.arrayToDataTable([
                    ['Age', 'Total'],
                    ['0-9', Number.parseInt(zipCode2Data.age00_04) + Number.parseInt(zipCode2Data.age05_09)],
                    ['10-19', Number.parseInt(zipCode2Data.age10_14) + Number.parseInt(zipCode2Data.age15_19)],
                    ['20-29', Number.parseInt(zipCode2Data.age20_24) + Number.parseInt(zipCode2Data.age25_29)],
                    ['30-39', Number.parseInt(zipCode2Data.age30_34) + Number.parseInt(zipCode2Data.age35_39)],
                    ['40-49', Number.parseInt(zipCode2Data.age40_44) + Number.parseInt(zipCode2Data.age45_49)],
                    ['50-59', Number.parseInt(zipCode2Data.age50_54) + Number.parseInt(zipCode2Data.age55_59)],
                    ['60-69', Number.parseInt(zipCode2Data.age60_64) + Number.parseInt(zipCode2Data.age65_69)],
                    ['70-79', Number.parseInt(zipCode2Data.age70_74) + Number.parseInt(zipCode2Data.age75_79)],
                    ['80-85+', Number.parseInt(zipCode2Data.age80_84) + Number.parseInt(zipCode2Data.agegt85)]
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
                [zipCode1,
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
                [zipCode2,
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
                legend: {
                    position: 'bottom',
                    alignment: 'start'
                },
                chartArea: {
                    width: '80%'
                },
                //colors: ['#b0120a', '#ffab91'],
                hAxis: {
                    title: 'Population',
                    minValue: 0
                }
            };
            var chart1 = new google.visualization.BarChart(document.getElementById('project_pop_chart1'));
            chart1.draw(data1, options);
            var chart2 = new google.visualization.BarChart(document.getElementById('project_pop_chart2'));
            chart2.draw(data2, options);
        }

        function drawHouseholdIncomeChart(rawData) {

            var zipCode1 = rawData.zipCode1Data.response.inputparameter.AreaId.substring(2);
            var zipCode2 = rawData.response.inputparameter.AreaId.substring(2);
            var zipCode1Data = rawData.zipCode1Data.response.result.package.item[0];
            var zipCode2Data = rawData.response.result.package.item[0];

            var data1 = google.visualization.arrayToDataTable([
                [
                    'Zip Code',
                    '15-35',
                    '35-50',
                    '50-75',
                    '75-100',
                    '100-125',
                    '125-150',
                    '150-200',
                    '200-250',
                    '250-500',
                    '500+'
                ],
                [
                    zipCode1,
                    Number.parseInt(zipCode1Data.hincy00_10) +
                    Number.parseInt(zipCode1Data.hincy10_15) +
                    Number.parseInt(zipCode1Data.hincy15_20) +
                    Number.parseInt(zipCode1Data.hincy20_25) +
                    Number.parseInt(zipCode1Data.hincy25_30) +
                    Number.parseInt(zipCode1Data.hincy30_35),
                    Number.parseInt(zipCode1Data.hincy35_40) +
                    Number.parseInt(zipCode1Data.hincy40_45) +
                    Number.parseInt(zipCode1Data.hincy45_50),
                    Number.parseInt(zipCode1Data.hincy50_60) +
                    Number.parseInt(zipCode1Data.hincy60_75),
                    Number.parseInt(zipCode1Data.hincy75_100),
                    Number.parseInt(zipCode1Data.hincy100_125),
                    Number.parseInt(zipCode1Data.hincy125_150),
                    Number.parseInt(zipCode1Data.hincy150_200),
                    Number.parseInt(zipCode1Data.hincy200_250),
                    Number.parseInt(zipCode1Data.hincy250_500),
                    Number.parseInt(zipCode1Data.hincygt_500)
                ],
                [
                    zipCode2,
                    Number.parseInt(zipCode2Data.hincy00_10) +
                    Number.parseInt(zipCode2Data.hincy10_15) +
                    Number.parseInt(zipCode2Data.hincy15_20) +
                    Number.parseInt(zipCode2Data.hincy20_25) +
                    Number.parseInt(zipCode2Data.hincy25_30) +
                    Number.parseInt(zipCode2Data.hincy30_35),
                    Number.parseInt(zipCode2Data.hincy35_40) +
                    Number.parseInt(zipCode2Data.hincy40_45) +
                    Number.parseInt(zipCode2Data.hincy45_50),
                    Number.parseInt(zipCode2Data.hincy50_60) +
                    Number.parseInt(zipCode2Data.hincy60_75),
                    Number.parseInt(zipCode2Data.hincy75_100),
                    Number.parseInt(zipCode2Data.hincy100_125),
                    Number.parseInt(zipCode2Data.hincy125_150),
                    Number.parseInt(zipCode2Data.hincy150_200),
                    Number.parseInt(zipCode2Data.hincy200_250),
                    Number.parseInt(zipCode2Data.hincy250_500),
                    Number.parseInt(zipCode2Data.hincygt_500)
                ]
            ]);

            var options = {
                height: 500,
                width: '100%',
                title: 'Number of Households by Income',
                legend: {
                    position: 'bottom',
                    alignment: 'start'
                },
                chartArea: {
                    width: '80%'
                },
                //colors: ['#b0120a', '#ffab91'],
                hAxis: {
                    title: 'Income in thousands of $',
                    minValue: 0
                }
            };
            var chart1 = new google.visualization.BarChart(document.getElementById('household_income_chart'));
            chart1.draw(data1, options);

        }
    }

    makeAjaxGetCall(url, headers, data, responseHandler);
}