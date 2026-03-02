sequenceDiagram
    participant browser
    participant server
    participant user

    Note right of browser: The page is fully rendered

    user->>browser: Inputs new note
    user->>browser: Clicks the save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: Input data is sent
    activate server
    server->>browser: {"message":"note created"}
    deactivate server
    Note right of browser: New user input is displayed
