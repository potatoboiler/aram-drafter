# ARAM Drafter
Because custom ARAM lobbies do not have rerolls in champion select, this tool was made to select 30 random champions, as though every player had two rerolls to choose from. 

[Link to the actual app/page can be found here](https://potatoboiler.github.io/aram-drafter/).

## Miscellaneous
This app was boostrapped using [create-react-app](https://github.com/facebook/create-react-app).

Apparently if you have an undefined key access, spaces will render as underscores.

## Updating workflow 
TODO: make this less manual.

1. Uncomment the appopriate lines in fetch.js, and then run `npm run fetch`
    - If you are fetching names, take the full console output and paste that into `CHAMPS`
    - If you are fetching images, take the outputted images from `scripts/img` and paste them into `public/ico`.
2. `npm run build && npm run deploy`