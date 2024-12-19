CREATE DATABASE IF NOT EXISTS Planning;
USE Planning;
DROP TABLE IF EXISTS `evenement`;
CREATE TABLE IF NOT EXISTS `evenement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomevent` varchar(255) NOT NULL,
  `jourdepart` date DEFAULT NULL,
  `jourfin` date DEFAULT NULL,
  `heuredepart` time DEFAULT NULL,
  `heurefin` time DEFAULT NULL,
  `colorevent` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;