# COVID-19 Spain

![Heroku CD](https://github.com/elias-garcia/covid-19-spain/workflows/Heroku%20CD/badge.svg)

The aim of this project is to normalize and centralize data from the daily
reports made by the spanish government about the COVID-19 pandemic and expose
them through a REST API for further analysis, like, for example, tracking the
evolution of the virus along the time on each autonomous community.

Another motivation for this project is to have undistorted COVID-19 related data
that can be filtered and aggregated to create more advanced charts than those
shown by the media. The first thing is achieved by reading directly the reports
published by the spanish government and don't rely in other third party data
sources, and the second one is accomplished by exposing the data extracted from
this reports through a REST API.

The dashboard is publicly avaibale at
[https://covid-19-spain-tracker.herokuapp.com](https://covid-19-spain-tracker.herokuapp.com).

The REST API is also available at
[https://covid-19-spain-api.herokuapp.com](https://covid-19-spain-api.herokuapp.com).
You can find the documentation for the available endpoints at the end of this
README.

# How does it works?

The spanish government publish a daily report about the COVID-19 disease in a
pdf format. The application runs an scraper hourly using a cron job that will
try to fetch the next report. If it's available, it will parse its content and
store it in MongoDB.

All of the published reports are very different between them, so you can expect
`null` values for a field not present in a report.

- **Cases**: The number of COVID-19 confirmed cases.
- **Deaths**: The number of deaths due to the COVID-19 disease.
- **Hospitalized**: The number of people hospitalized.
- **ICU**: The number of people in intensive care unit.
- **Recovered**: The number of people who recovered from the COVID-19 disease.

All this data will be then available through the API.

# Installation

You can deploy the whole application in your favorite OS using `docker` and
`docker-compose`.

## Production

NOTE: The application is designed to run at the free tier of Heroku, so
currently the server will run as a single service, but you can follow the next
steps to deploy it using `docker-compose`.

1. Rename the `.env.template` file to `.env`.

2. Run:

   ```shell
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
   ```

## Development

1. Rename the `.env.template` file to `.env`.

2. Run:

   ```shell
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
   ```

# REST API endpoints

A Postman collection is included in the repo, so you can just import it and
you'll see all the available endpoints with their available query params for a
more advanced filtering.

## GET /autonomous-communities

List all of the spanish autonomous communities available to use in the
`autonomousCommunities` query parameter of the `GET /reports` endpoint.

## GET /reports

List all of the reports made publicly available by the government. Each report
contains the values reported for each autonomous community.

- Query parameters:

  - **from**: Date in ISO 8601 format from which you want to retrieve the
    reports.
  - **to**: Date in ISO 8601 format to which you want to retrieve the reports.
  - **autonomousCommunities**: Comma seppared list of the autonomous communities
    values to be included in the report.
  - **sortField**: String which represents the field by which we want to order
    the results.
  - **sortOrder**: The order for the sorting: "asc" or "desc".
  - **limit**: A number representing how many reports we want to retrieve. This
    is specially useful to retrieve the most recent report.

## GET /accumulated-values

Get the accumulated values for the latest report available and the diff with the
previous one.

# License

COVID-19 Spain is an [Elías García](https://eliasgarciade.dev) open source
project, distributed under the
[GNU General Public License v3.0](https://github.com/elias-garcia/covid-19-spain/blob/master/LICENSE).
