Small front-end application using ReactJS that displays a filterable list of characters from the movie franchise Star Wars. You will be querying data from an open API called [SWAPI (Star Wars API)](https://swapi.py4e.com/) that should give you access to all data.

## App Overview
The app will consist of a main view that will display the list of characters and a search section, where the user can search the characters by certain criteria based on name. Clicking on one of the characters from the list will open a detail view of this character.

### Character List
The character list should be a simple list that displays the name of the character. Each list entry should be clickable and open the detail view for the selected character when the user clicks the list entry.

### Character Details
The character details that are shown when the user selects a character from the character list should show a brief summary of the character, including the name of the character, the movie the character appeared in, the species of the character and the spaceships associated with the character. For instance for the character "Han Solo", the detail view should display the following information:

> **Name:** Han Solo  
> **Species:** Human  
> **Movies:** Episode IV, Episode V, Episode VI, Episode VII  
> **Spaceships:** Millenium Falcon, Imperial shuttle  
