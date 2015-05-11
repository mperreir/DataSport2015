liste <- read.csv("~/projects/hyblab/DataSport2015/creps_haut_niveau/scripts/liste.csv")

# Compter les fédérations par département
fede_dep <- liste[, c("Code.département", "Fédération")]
table_fede_dep <- table(fede_dep$Fédération, fede_dep$Code.département)

# Compter les pratiquants par département
part_dep <- liste[, c("Code.département", "NOM", "Prénom")]
table_part_dep <- table(part_dep$Code.département)

data_frame_fede <- as.data.frame.matrix(table_fede_dep)
fede_nantes <- data_frame_fede["44"]