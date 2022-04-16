
# MathWebSearch frontend

![Build Status](https://github.com/MathWebSearch/frontend/workflows/CI/badge.svg)
[![DockerHub Status](https://img.shields.io/docker/automated/mathwebsearch/frontend.svg)](https://hub.docker.com/r/mathwebsearch/frontend/)

A frontend for the MWS search engine using NextJS and TypeScript

## Configuring
The configuring is done with various environment variables:
  - REACT_APP_MWS_MODE if set to **'API'** then a mwsapid daemon is expected in the backend otherwise a MWS daemon is expected (default)
  - REACT_APP_MWSAPI_URL set the url of the [MWSAPI daemon](https://github.com/MathWebSearch/mwsapi) (default: localhost:3001)
  - REACT_APP_MWS_URL sets the url of the [MWS daemon](https://github.com/MathWebSearch/mws) (default: localhost:9090)
  - REACT_APP_LATEXML_URL url for the [LaTeXML daemon](https://github.com/MathWebSearch/latexml-mws-docker) (default: localhost:8080)
  - REACT_APP_LOG_FILEPATH if set, search queries are logged in this csv file (by default not set)

  - REACT_APP_MWS_BRANDING_TITLE sets the title in the header
  - REACT_APP_MWS_BRANDING_URL sets the url when clicked on this title
  - REACT_APP_DISABLE_EXAMPLES when set to **'true'** disables the example button (by default not set)
  - REACT_APP_DISABLE_SYMBOLS when set to **'true'** disables the symbols button (by default not set)
  - REACT_APP_MWS_FOOTER_TEXT sets the text for the information box at the bottom of the page (empty by default) 
  - REACT_APP_THEME_NR set to {1, 2, 3} for choosing the {green, blue, red} theme (green default)

<br/>

The environment variables for arXiv search (ar5Search) can be set using:

```
source ./set_ar5search_env.sh
```

## Usage:
  -
      ```
      $ yarn install
      $ yarn dev
      ```
      starts an development server on http://localhost:3000

   -
      ```
      $ yarn install
      $ yarn build
      $ yarn start
      ```
      starts a provisional production build  to serve the static files and proxy the backend calls

   - for convenience there is also a dockerfile to create an docker image


## Accessing Logs:
The server maintains the search queries as a csv file. These queries can be accessed at `<server_url>/api/getqueries`.

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a [copy of the GNU General Public License](LICENSE)
along with this program.  If not, see <https://www.gnu.org/licenses/>.
