# Descriptif du projet

Média : notre de votre média

Sujet : description du sujet

Equipe : Pâte a CREPS

Patricipants : 
- EDNA : Fabien Mahé, Adrien Frey
- Polytech : Tom Dupisre, Antoine Chalifour
- STAPS : Pauline Roussel, Manon Daguin, Fanny Tourancheau, Amélie Pouillaude

# Installation

## Installation de l'ensemble des dépendances 
Il faudra tout d'abord installer l'ensemble des dépendances du projet : 
`npm install && bower install`

(Si Bower n'est pas installé, `npm install -g bower`)
npm install permet d'installer les dépendances de build du projet.
bower install permet d'installer les librairies utilisée dans la page html.

## Build du projet
### En mode développement
`grunt less` permet de compiler tous les fichiers less dans le fichier main.css.

### En mode production
`grunt build` permet de compiler les fichiers less, puis de minimifier les fichiers css et js pour alléger les chargements.


# Informations complémentaires
  
