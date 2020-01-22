def main():
    valeur_entree = int(input("Valeur d'entrée : "))
    duree_de_vie = int(input("Durée de vie de l'amortissement : "))
    day, month, year = map(int, input("Date de mise en service (jour mois année) : ").split())
    amortissement_lineaire(valeur_entree, duree_de_vie, day, month, year)


def amortissement_lineaire(valeur_entree, duree_vie, days, month, year, valeur_residuelle=0):

    # Première ligne : Prorata Temporis
    valeur_entree -= valeur_residuelle
    first_year = premiere_annee(days, month)
    vcn = valeur_entree
    annuite = round(valeur_entree / duree_vie)
    prorata_temporis = round(annuite * premiere_annee(days, month))
    amortissements_cumulees = prorata_temporis
    line(1, vcn, prorata_temporis, prorata_temporis, vcn-prorata_temporis)
    vcn -= prorata_temporis

    # Le corps du tableau
    for annee in range(2, duree_vie + 1):
        amortissements_cumulees += annuite
        line(annee, vcn, annuite, amortissements_cumulees, vcn-annuite)
        vcn -= annuite

    # Fin
    annee += 1
    annuite = vcn
    amortissements_cumulees += vcn
    vcn_fin = 0
    line(annee, vcn, annuite, amortissements_cumulees, vcn-annuite)


def premiere_annee(days, month):
    return (30 * (12 - month) + 30 - days) / 360


def line(year, vcn_debut, annuite, amortissements_cumulees, vcn_fin):
    print("Année : {}".format(year))
    print("VCN (début) : {}".format(vcn_debut))
    print("Annuité : {}".format(annuite))
    print("Amortissements cumulées : {}".format(amortissements_cumulees))
    print("VCN (fin) : {}".format(vcn_fin))
    print()


if __name__ == '__main__':
    main()
