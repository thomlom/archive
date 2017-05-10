LOMBART Thomas
VASILEV Martin

Projet réalisé:
Sudoku

Tâches réalisées:

- Gestion d'une grille de sudoku
- Résoudre une grille de sudoku

Extensions réalisées:

- Représentation graphique du chemin suivi par le solveur.
- À partir d’une grille à solution unique, chercher des grilles ayant moins de cases remplies
 et ayant toujours une solution unique. Nous avons appelé cette fonction simplify_grid()
- Montrer les états successifs de la grille durant la résolution (y compris les retours en arrière).
- Interface graphique permettant de jouer au sudoku et le résoudre

Exemples d'utilisation:

Résoudre une simple grille:
python3 main.py 490001007000045030382600050003070401800902005907030600030006529020850000500700013

Simplifier une grile:
python3 main.py -s 490001007000045030382600050003070401800902005907030600030006529020850000500700013

Voir les étapes successives de la grille durant la résolution:
python3 main.py -t 490001007000045030382600050003070401800902005907030600030006529020850000500700013

Obtenir une représentation graphique du chemin suivi par le solveur:
python3 main.py -i 490001007000045030382600050003070401800902005907030600030006529020850000500700013

Jouer au Sudoku/Voir la résolution avec l'interface graphique:
python3 interface.py
