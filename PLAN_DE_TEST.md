# PLAN DE TESTS

## City Explorer - Carte de France Interactive

* **Projet :** City Explorer – Carte de France Interactive
* **Auteur :** Vincent Desoeuvre  
* **Contexte :** TP 2 – Plan de Test & Pyramide des Tests

Ce document présente la stratégie de test appliquée au projet **City Explorer** dans le cadre du TP2 Plan de test & Pyramide des tests.

> La campagne de test de ce TP se concentre exclusivement sur la fonctionnalité de **filtrage par région**.

---

## 1. Objectifs de la campagne de test

- vérifier que le **filtre des régions** fonctionne correctement ;
- identifier les risques les plus importants liés à cette fonctionnalité ;
- mettre en œuvre les **4 niveaux de test** :
    - tests unitaires
    - tests d’intégration
    - tests système
    - tests d’acceptation

---

## 2. Périmètre des tests

### Inclus dans le périmètre
La campagne de test porte uniquement sur le **filtre des régions** :
- chargement de la liste des régions ;
- sélection d’une région dans l’interface ;
- envoi de la valeur sélectionnée au backend ;
- récupération des villes correspondant à la région choisie ;
- mise à jour de la liste des villes ;
- recentrage/zoom de la carte sur la région sélectionnée ;
- cohérence entre la région choisie et les résultats affichés.

---

## 3. Stratégie globale de test

 * **pyramide des tests**

### 3.1 Tests unitaires
Tester une logique simple et isolée liée au filtre régional.

Exemples :
- récupération de la configuration d’une région ;
- vérification de la présence d’une région dans la configuration ;

### 3.2 Tests d’intégration
Tester l’intégration entre plusieurs couches de l’application.

Exemple visé :
- appel de l’endpoint `GET /api/cities/regions`
- appel de l’endpoint `GET /api/cities/nearby` avec une région donnée
- vérification du statut HTTP et du format JSON retourné

### 3.3 Tests système
Tester l’application complète depuis l’interface utilisateur.

Exemple visé :
- ouverture de l’application ;
- sélection d’une région dans la liste déroulante ;
- validation du filtre ;
- vérification de la mise à jour des résultats visibles.

### 3.4 Tests d’acceptation
Vérifier manuellement que la fonctionnalité répond bien au besoin utilisateur.

---

## 4. Analyse des Risques

- les **risques projet**
- les **risques produit**

- **Évaluation (matrice IEC 61508)**

### 4.1 Risques projet & Risques produit

|                 | Anecdotique | Peu Impactant | Impactant | Catastrophique |
|-----------------|-------------|---------------|-----------|----------------|
| Invraisemblable | -           | -             | -         | -              |
| Peu probable    | -           | -             | Projet : Mauvaise synchronisation entre les conteneurs Docker pendant l’exécution des tests         | -              |
| Probable        | -           | -             | Projet : Temps insuffisant pour tester plus d’une fonctionnalité         | Produit : La liste des régions ne se charge pas correctement depuis l’API              |
| Certain         | -           | -             | -         | Produit : Une région sélectionnée affiche des villes d’une autre région              |


---

## 5. Cahier de Recette (Tests d'Acceptation)

| ID | Description du scénario | Résultat attendu | Statut |
|----|-------------------------|------------------|--------|
| T-ACC-01 | Filtrage par région "Bretagne" sans autres critères | Seules les villes de Bretagne s'affichent sur la carte et dans la liste. | Pass |
| T-ACC-02 | Recherche avec distance max de 20km autour d'un point | Les villes affichées sont bien situées dans le rayon de 20km. | Pass |
| T-ACC-03 | Filtrage par population (> 100 000 habitants) | La liste ne contient que des grandes villes (ex: Rennes, Nantes si en Bretagne). | Pass |

---

## 6. Livrables

1.  **PLAN_DE_TEST.md** : Stratégie et analyse des risques.
2.  **Tests Unitaires** : `backend/tests/unit/formatters.test.js`
3.  **Tests d'Intégration** : `backend/tests/integration/cities.integration.test.js`
4.  **Tests Système** : Dossier `frontend/cypress`

---
Plan de test réalisé par Vincent Desoeuvre.