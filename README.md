 
  
<p align="center">
  <img src="https://codefirst.iut.uca.fr/git/lucas.delanier/MovieFinder/raw/branch/master/Documentation/banner_image.png  "  />
</p>

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white)</br>
[![Maintainability Rating](https://codefirst.iut.uca.fr/sonar/api/project_badges/measure?project=MovieFinder&metric=sqale_rating&token=59656240a4130edba83931f3226a84d76ad9028f)](https://codefirst.iut.uca.fr/sonar/dashboard?id=MovieFinder)
[![Reliability Rating](https://codefirst.iut.uca.fr/sonar/api/project_badges/measure?project=MovieFinder&metric=reliability_rating&token=59656240a4130edba83931f3226a84d76ad9028f)](https://codefirst.iut.uca.fr/sonar/dashboard?id=MovieFinder)
[![Security Rating](https://codefirst.iut.uca.fr/sonar/api/project_badges/measure?project=MovieFinder&metric=security_rating&token=59656240a4130edba83931f3226a84d76ad9028f)](https://codefirst.iut.uca.fr/sonar/dashboard?id=MovieFinder)
[![Bugs](https://codefirst.iut.uca.fr/sonar/api/project_badges/measure?project=MovieFinder&metric=bugs&token=59656240a4130edba83931f3226a84d76ad9028f)](https://codefirst.iut.uca.fr/sonar/dashboard?id=MovieFinder)
[![Code Smells](https://codefirst.iut.uca.fr/sonar/api/project_badges/measure?project=MovieFinder&metric=code_smells&token=59656240a4130edba83931f3226a84d76ad9028f)](https://codefirst.iut.uca.fr/sonar/dashboard?id=MovieFinder)
[![Technical Debt](https://codefirst.iut.uca.fr/sonar/api/project_badges/measure?project=MovieFinder&metric=sqale_index&token=59656240a4130edba83931f3226a84d76ad9028f)](https://codefirst.iut.uca.fr/sonar/dashboard?id=MovieFinder)
[![Vulnerabilities](https://codefirst.iut.uca.fr/sonar/api/project_badges/measure?project=MovieFinder&metric=vulnerabilities&token=59656240a4130edba83931f3226a84d76ad9028f)](https://codefirst.iut.uca.fr/sonar/dashboard?id=MovieFinder)


**MovieFinder** est une application mobile qui permet de découvrir des films. Elle propose chaque jour une liste contenant les 20 films les plus tendances du jour. Une fois la liste vidée, vous êtes invités à attendre la fin du décompte, qui est fixé à minuit, afin d'obtenir une nouvelle liste de films journaliers.

## :floppy_disk: FEATURES

Sur la page principale, vous pouvez swipe les cartes pour passer d'un film à l'autre sans faire d'action sur ceux-ci. Pour les faire disparaître de la pile, vous pouvez utiliser les boutons "Watch Later" et "Favourite", respectivement à gauche et à droite, pour les ajouter à la liste correspondante. Vous pouvez également utiliser le bouton "Supprimer" qui est situé au milieu et qui permet de supprimer le film de la pile sans l'affecter à aucune des deux listes citées précédemment. Une fois la liste vide vous devez attendre jusqu'a la fin du décompte fixé a 00:00 pour avir de nouveaux films.

Les listes "WatchLater" et "Favourite" affichent les informations principales des films présents dans les listes. Pour accéder aux informations complètes, il suffit d'appuyer sur le film pour être redirigé sur la page "Info" correspondant au film selectionné.

La page "Info" permet de visualiser toutes les informations d'un film (titre, note moyenne, durée, date de sortie, genres, synopsis, bande annonce, casting, commentaires, films similaires).

Deux thèmes différents sont disponibles : sombre et clair. Ils sont choisis en fonction du thème selectionné sur le téléphone de l'utilisateur. (change uniquement la navigationbar pour le moment pour un soucs d'hestétique)

L'API utilisée est : The Movie DataBase (TMDB) API : https://developers.themoviedb.org/3</br>
Pour afficher nos "Coup de coeur" nous avons développé notre propre API que nous mettrons à jour en fonction de nos propres gouts. disponible ici : https://codefirst.iut.uca.fr/git/lucas.delanier/moviefinder_api
![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## :dizzy: Getting Started

Une fois le dépot cloné, vous pouvez lancer le code sur votre téléphone Android et IOS grace a l'outil [Expo](https://docs.expo.dev/get-started/installation/).

```bash
npx expo start
```
Une fois la commande executée, il vous suffit de scanner le QR à partir de l'application Expo sur android et Caméra pour IOS.</br>

**/!\ Veuillez faire attention à bien etre connecté sur le même réseau (ordinateaur et téléphone).**

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## :gift: OverView

<p align="center">
  <img src="https://codefirst.iut.uca.fr/git/lucas.delanier/MovieFinder/raw/branch/master/Documentation/exemplebackground.png"  />
</p>

## :wrench: SUPPORT
En cas de problème lors de l'utilisation de l'application, vous pouvez nous contacer aux adresses suivantes :


Lucas Delanier : **lucas.delanier@etu.uca.fr** </br>
Louison Parant : **louison.parant@etu.uca.fr** 
![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ✨ Contributors 

<a href = "https://codefirst.iut.uca.fr/git/lucas.delanier">
<img src ="https://codefirst.iut.uca.fr/git/avatars/6a3835d734392fccff3949f7c82a63b9?size=870" height="50px">
</a>
<a href = "https://codefirst.iut.uca.fr/git/louison.parant">
<img src ="https://codefirst.iut.uca.fr/git/avatars/b337a607f680a2d9af25eb09ea457be9?size=870" height="50px">
</a>





                                                        