```mermaid
Sequence Diagram;
    participant browser
    participant server
    participant database

    browser-->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    deactivate server

```
