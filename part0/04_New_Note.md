sequenceDiagram
    participant browser
    participant server
    participant user

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser: JavaScript document
    deactivate server

    Note right of browser: The browser executes the JavaScript code to fetch the JSON from sever

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: JSON data
    deactivate server

    Note right of browser: The browser calls the callback function that renders the notes from the JSON file

    user->>browser: enters data into input box
    user->>browser: clicks save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note left of server: User input is sent to server and page is refreshed 
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML document
    deactivate server


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser: JavaScript document
    deactivate server

    Note right of browser: The browser executes the JavaScript code to fetch the updated JSON from sever

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: JSON data
    deactivate server

    Note right of browser: The browser calls the callback function that renders the notes from the JSON file, includes new input