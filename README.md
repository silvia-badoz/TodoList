# Project TodoList avec Typescript et Angular

## Installation et lancement 
Prérequis : vous aurez besoin d'avoir Node et NPM préalablement installé sur votre ordinateur.  
Pour installer ce projet localement, ouvrez un terminal, placez vous dans le répertoire voulu et entrez la commande suivante :  
```text
git clone https://github.com/silvia-badoz/TodoList
```

Entrez dans le projet puis entrez les commandes suivantes :  
`npm install`  
`npm start`  

Enfin, ouvrez un navigateur et aller à l'adresse suivante :  
`http://localhost:4200/` 


## Librairies utilisées
`angular-autofocus-fix`  
`@angular/fire`  
`jquery`  
`popper.js`  
`bootstrap`  


## Fonctionnalités développpées 
- [Effacer tout](#effacer-tout)
- [Version responsive](#version-responsive)
- [Local Storage](#local-storage)
- [Identification par Firebase](#identification-par-firebase) 

## Effacer tout 
Cette fonctionnalité permet d'effacer toutes les tâches de la liste, à la fois dans la liste ainsi que dans le local storage mis en place.  
Pour l'utiliser, il suffit de cliquer sur le bouton **Delete all** qui apparaît en dessous des tâches ajoutées.  
Attention, il faut ajouter au moins une tâche pour voir ce bouton apparaître.  
Cette fonctionnalité ne m'a pas posé de problème particulier. J'ai seulement dû adapté la taille du footer pour que ce bouton suppplémentaire s'intègre joliment à la Todo List. 

## Version responsive 
Cette fonctionnalité est permise grâce à l'installation et l'utilisation de bootstrap dans le projet.  
Si vous réduisez la taille de votre fenêtre dans le navigateur, vous aurez toujours la même disposition des éléments les uns par rapport aux autres. 

## Local Storage
Cette fonctionnalité je trouve est la plus intéressante de celles que j'ai implémenté parce qu'elle permet de conserver localement les tâches entrées préalablement et donc cela permet de donner tout son sens à la todo list, qui doit nous afficher constamment les tâches faites et à faire.  
J'ai eu quelques difficultés pour l'implémentation de cette fonctionnalité du fait qu'il y a plusieurs manières possibles de la faire, j'ai donc eu un peu de mal pour trier toutes les informations que j'ai trouvé. 

## Identification par Firebase 
Cette fonctionnalité permet de se créer un compte ou de se connecter une fois qu'un compte a été créé. Une fois authentifié, vous aurez accès à votre todo list.  
Pour créer un compte cliquez sur le bouton "Registration".  
Pour vous connecter cliquez sur "Connection". Vous pouvez utiliser un compte fraîchement créé et / ou celui-ci :  
* email address : **user@user.com**
* password : **useruser**  

J'ai aimé développer cette fonctionnalité car elle m'a permise d'ajouter beaucoup d'éléments à mon projet comme des images et des composants.  
Une difficulté rencontrée lors de l'implémentation de cette fonctionnalité a été au niveau des routes à ajouter. J'ai aussi également eu un problème avec le bouton "Registration" qui ne fonctionnait pas car dans le formulaire, j'avais autorisé les mots de passe à 4 caractères minimum alors qu'avec Firebase il en faut 6 minimum.  


