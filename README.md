
# MathWebSearch frontend
[![Build Status](https://travis-ci.org/MathWebSearch/frontend.svg?branch=master)](https://travis-ci.org/MathWebSearch/frontend)

A frontend for the MWS search engine using create-react-app and Typescript

## Configuring
The configuring is done with various environment variables:
  - REACT_APP_MWS_MODE if set to **'API'** then a mwsapid daemon is expected in the backend otherwise a MWS daemon is expected (default)
  - REACT_APP_MWSAPI_URL set the url of the [MWSAPI daemon](https://github.com/MathWebSearch/mwsapi) (default: localhost:3001)
  - REACT_APP_MWS_URL sets the url of the [MWS daemon](https://github.com/MathWebSearch/mws) (default: localhost:9090)
  - REACT_APP_LATEXML_URL url for the [LaTeXML daemon](https://github.com/MathWebSearch/latexml-mws-docker) (default: localhost:8080)

  - REACT_APP_MWS_BRANDING_TITLE sets the title in the header
  - REACT_APP_MWS_BRANDING_URL sets the url when clicked on this title
  - REACT_APP_DISABLE_EXAMPLES when set to **'true'** disables the example button (by default not set)
  - REACT_APP_DISABLE_SYMBOLS when set to **'true'** disables the symbols button (by default not set)

## Usage:
  -
      ```
      $ npm install
      $ npm start
      ```
      starts an development server on http://localhost:3000

   -
      ```  
      $ npm install
      $ npm run production
      ```
      starts a provisional production build that uses [express.js](https://expressjs.com/) to serve the static files and proxy the backend calls

   - for convenience there is also a dockerfile to create an docker image


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
