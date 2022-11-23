[![coverage report](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/badges/main/coverage.svg)](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/-/commits/main) 

# Prosjekt 4 - IT2810 Webutvikling

## Kommandoer

Se README i backend og frontend for videre kommandoer for å kjøre prosjektet. Begge må kjøre for at applikasjonen skal fungere.

### How to test - rask guide

* Vanlige tester
    - Backend -> `cd backend && npm run test`
    - Frontend -> `cd frontend && npm run test`
* E2E
    1. Start backend -> `cd backend && npm run dev`. Dette starter backend i test modus
    2. kjør cypress -> `cd frontend && npm run cypress` *For at dette skal fungere riktig så kan ikke frontend kjøre samtidig som dette kalles*


## Oppgaven vi valgte 

Til prosjekt 4 har vi valgt å kombinere to av de mulige oppgavene. Vi valgte å forbedre og systematisk enhetsteste backend og klient fra prosjekt 3 (oppgave b) og å perfeksjonere klient og backend fra prosjekt 3 (oppgave c). Vi har tatt utgangspunkt i å løse all kritikk vi fikk i tilbakemeldingene fra prosjekt 3, samt å sikte oss inn på en testdekningsgrad av applikasjonen på 100%. 

## Tilbakemeldinger fra prosjekt 3

* Reset page - mulighet til å tilbakestille nettsiden uten å laste inn siden på nytt
* Snapshot testing - benytte oss av snapshot tester
* Tabbing through the games - mulighet til å navigere hele nettsiden med tastaturet
* Display the games in a grid - benytte ubrukt plass på siden til forhåndsvisning av spill
* Dark mode for sustainability - mulighet for å velge darkmode
* Comments in the code - mer kommentarer i koden for å forklare komplisert funksjonalitet
* Disable sort button - ikke mulig å klikke på sorter-knappen når ingen parametre er valgt
* Dynamic loading of data - ikke vise reviews eller ratings dersom informasjonen mangler i databasen
* Problem with sorting on price - når man sorterer på pris (lav-høy) så skal man se de billigste spillene først, og ikke de som mangler pris
* Improve size of tags box - forstørre listen man velger fra når man velger tags

### Hvordan har vi gått frem for å forbedre disse?

#### Frontend

Vi startet med å sette opp issues for alle tilbakemeldingene vi fikk, for å kunne forbedre applikasjonen fra et brukerperspektiv. Av enkle quick-fixes har vi gjort følgende: 
* Laget en knapp som tilbakestiller alle filtre og sorteringer man har valgt
* Deaktivert sorteringsknappen når ingen krav er valgt
* Endret størrelsen på tags-boksen så man lettere kan se alle tagsene man har å velge mellom.

Av mer krevende inngrep har vi innført funksjonalitet for å vise tre spill i bredden i grid-format når skjermen er bred nok. Selve spillkortet har også fått et nytt design som er mer estetisk og viser mer relevant informasjon. Vi har også fikset problematikk rundt at applikasjonen viste ratings og reviews, selvom denne informasjonen manglet fra databasen. Vi hadde også et problem med at om man sorterte på pris, ascending, kom de spillene som manglet pris opp først. Dette er jo ikke det man leter etter om man sorterer for billigste spill, og vi har fikset dette problemet. 

Siden viser nå tre spill i bredden istedenfor ett som det var i forrige utgave. Vi mener dette var bedre bruk av plass, og at det gjør at applikasjonen ser bedre ut. Denne avgjørelsen er også basert på tilbakemeldingene vi har fått. 

Nettsiden er også nå bedre egnet til å navigere kun gjennom tastaturet. Dette skriver vi mer om i Web tilgjengelighet.

#### Backend

Vi fikk ikke noen kommentarer på backenden vår. Dermed har det ikke blitt gjort noen funksjonelle endringer i backenden i denne delen av prosjektet. Det er skrevet flere tester til backend og dette diskuteres mer senere i dokumentasjonen.

#### Web tilgjengelighet

En tilbakemelding vi fikk gikk på muligheten til å nagivere nettsiden gjennom tastaturet. I prosjekt 3 viste ikke netssiden hvilket spill som var i fokus når man tabbet gjennom spillene. Dette løste vi ved å endre fargen på spillkortene på onFocus til en gråfarge som fungerte for både vanlig og darkmode. Basert på tilbakemeldinger har vi også valgt å forbedre kommenteringen vår i koden. Dette gjør koden mer tilgjengelig for alle, og man kan også lettere forstå hvorfor den er bygget opp som den er. 

#### Bærekraftig webutvikling

Den største endringen vi har gjort i forhold til å gjøre applikasjonen mer bærekraftig er å implementere darkmode. Her har vi for å holde det enkelt valgt å bruke MaterialUI sitt "dark" tema, som fungerte vel. Vi har en enkel knapp i headeren til å bytte tema, som også forteller deg hva slags tema du bruker nå. Vi har også sjekket at fargene fungerer som de skal, og har noen steder i applikasjonen vært nødt til å endre enkelte tekstfarger slik at alt skal synes godt og fortsatt være tilgjengelig. Dark mode er ikke bare mindre anstrengende for øynene, men sparer også strøm. Vi valgte også å benytte os av localStorage til å huske brukerens valg. At vi ikke hadde dark mode ble kommentert i flere av tilbakemeldingene våre, og vi så det som hensiktsmessig å implementere det.

## Testing i prosjekt 4

### Frontend

[![coverage report](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/badges/main/coverage.svg)](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/-/commits/main) 

(Merk når det snakkes om testdekningsgrad i dette avsnittet er det kun snakk om i frontend)

Vi tester nå alt i applikasjonen som skal kunne testes. Dette går fra alt som stores til komponenter og deres funskjoner. Som man ser på testdekningsgraden over er vi nærme 100%. En grunnen til at vi ikke nådde 100% er fordi at dekningsgraden ikke alltid klarer å forstå hva som faktisk er testet, og at MUI-biblioteket vi har en del funksjonalitet som er ekstremt vanskelig å teste. Et eksempel på dette er testing av `slider` komponenten. Den er wrappet i flere runder med `div` og `span` elementer med varierende ID'er som gjør det vanskelig å hente ut riktig. Derfor har vi testet så godt som mulig med den tiden vi hadde til rådighet. Vi valgte å ikke bruke mye tid på å teste ekstremt sjeldne edge-cases, men heller teste på mer realistiske tilfeller.

Selvom appen nesten er 100% dekket av tester er vi klar over at dette ikke reflekterer at appen er perfekt dekket, men dekningsgraden var et godt utgangspunkt for å skrive tester. Dette har også gjort at vi har vært nødt til å gå grundig til verks og dermed testet så godt som alt av edge-cases.

### Pipeline added 

En pipeline er et viktig verktøy for å kunne drive med CI/CD (continous integration and continous delivery/deployment). Pipelinen vi opprettet i dette prosjektet kjører koden og testene våre, og sørger for at det ikke har dukket opp noen endringer som enten gir feilmeldinger eller som gjør at noen av testene våre feiler. Dette har hjulpet oss flere ganger under utviklingen med å plukke opp feil før vi fikk merget koden vår til main. Dette er et enkelt grep som kan forhindre at små feil kan bli liggende i koden. Det gjør det også lett for oss å ha en oversikt på testdekningsgraden uten å trenge å kjøre koden selv.

### Komponenttesting

Alle komponentene i prosjektet er grundig testet. Vi har testet komponentene i isolasjon, siden det er mest hensiktsmessig å teste de individuelt. Her har dekningsgraden av testene vært et godt verktøy for å ikke glemme å teste noe. Dekningsgraden har pekt på hvilke linjer som har manglet testing, som har gjort at ingenting har sklidd under radaren.

### Snapshottesting

Vi er kjent med at verdien av snapshottesting mye debattert i utviklermiljøet. I et virkelig prosjekt ville vi ikke nødvendigvis benyttet oss av dette. Vi har valgt å ta det med i dette prosjektet for å lære om hvordan man implementerer snapshottesting.

### Backend

I backend har vi forbedret testdekningsgraden til 100%. Alle endpoints'ene er testet. Dette kan ses ved å kjøre testene i backend. 

### End 2 End

E2E testing vår er ganske uendret fra prosjekt 3, siden vi gjorde det grundig den gang. Det vi har gjort i prosjekt 4 er å tilpasse de eksisterende testene til endringene som er gjort på nettsiden.
