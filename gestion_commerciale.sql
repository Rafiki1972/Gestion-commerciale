-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 19 oct. 2023 à 20:55
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_commerciale`
--

-- --------------------------------------------------------

--
-- Structure de la table `achat`
--

CREATE TABLE `achat` (
  `PurchaseID` int(11) NOT NULL,
  `DateDAchat` date DEFAULT NULL,
  `SupplierID` int(11) DEFAULT NULL,
  `MontantTotal` decimal(10,2) DEFAULT NULL,
  `Notes` text DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `achat`
--

INSERT INTO `achat` (`PurchaseID`, `DateDAchat`, `SupplierID`, `MontantTotal`, `Notes`, `last_modification`) VALUES
(2, '2023-10-13', NULL, 400.00, 'test note', '2023-10-13'),
(6, '2023-10-19', 4, 1350.00, 'dfdfd', '2023-10-19'),
(7, '2023-10-19', 4, 600.00, 'jr jr ,', '2023-10-19');

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `ArticleID` int(11) NOT NULL,
  `NomDeLArticle` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Code` varchar(50) DEFAULT NULL,
  `Cout` decimal(10,2) DEFAULT NULL,
  `PrixDeVente` decimal(10,2) DEFAULT NULL,
  `product_image` varchar(1500) NOT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`ArticleID`, `NomDeLArticle`, `Description`, `Code`, `Cout`, `PrixDeVente`, `product_image`, `created_at`, `last_modification`) VALUES
(32, 'Khtek', 'Khtek has big boobs', '1078', 25.00, 98.00, 'image_1694904072445.png', '2023-09-16', '2023-09-16'),
(33, 'Atay bn3na3', 'Best drink to drink', 'PROD-2076', 200.00, 199.00, 'image_1696627765361.png', '2023-10-06', '2023-10-06'),
(34, 'coffe', 'coffee is the best', 'PROD-4144', 250.00, 125.00, 'image_1697451904892.JPG', '2023-10-16', '2023-10-18'),
(35, 'Water', 'Water is nice', 'PROD-2235', 300.00, 199.00, 'image_1697452009285.jpeg', '2023-10-16', '2023-10-16');

-- --------------------------------------------------------

--
-- Structure de la table `articleachat`
--

CREATE TABLE `articleachat` (
  `PurchaseItemID` int(11) NOT NULL,
  `PurchaseID` int(11) DEFAULT NULL,
  `ArticleID` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `PrixUnitaire` decimal(10,2) DEFAULT NULL,
  `SousTotal` decimal(10,2) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articleachat`
--

INSERT INTO `articleachat` (`PurchaseItemID`, `PurchaseID`, `ArticleID`, `Quantite`, `PrixUnitaire`, `SousTotal`, `created_at`, `last_modification`) VALUES
(3, 2, 33, 2, 200.00, 400.00, '2023-10-13', '2023-10-13'),
(7, 6, 34, 3, 250.00, 750.00, '2023-10-19', '2023-10-19'),
(8, 6, 35, 2, 300.00, 600.00, '2023-10-19', '2023-10-19'),
(9, 7, 35, 2, 300.00, 600.00, '2023-10-19', '2023-10-19');

-- --------------------------------------------------------

--
-- Structure de la table `articlevente`
--

CREATE TABLE `articlevente` (
  `SaleItemID` int(11) NOT NULL,
  `SaleID` int(11) DEFAULT NULL,
  `ArticleID` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `PrixUnitaire` decimal(10,2) DEFAULT NULL,
  `SousTotal` decimal(10,2) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articlevente`
--

INSERT INTO `articlevente` (`SaleItemID`, `SaleID`, `ArticleID`, `Quantite`, `PrixUnitaire`, `SousTotal`, `created_at`, `last_modification`) VALUES
(9, 13, 32, 1, 98.00, 98.00, '2023-10-13', '2023-10-13'),
(10, 13, 33, 2, 199.00, 398.00, '2023-10-13', '2023-10-13'),
(11, 14, 32, 1, 98.00, 98.00, '2023-10-13', '2023-10-13'),
(12, 15, 32, 2, 98.00, 196.00, '2023-10-16', '2023-10-16'),
(13, 15, 33, 2, 199.00, 398.00, '2023-10-16', '2023-10-16'),
(14, 15, 35, 1, 199.00, 199.00, '2023-10-16', '2023-10-16'),
(15, 16, 33, 1, 199.00, 199.00, '2023-10-16', '2023-10-16'),
(16, 17, 33, 1, 199.00, 199.00, '2023-10-18', '2023-10-18'),
(17, 17, 35, 2, 199.00, 398.00, '2023-10-18', '2023-10-18'),
(21, 19, 34, 2, 125.00, 250.00, '2023-10-19', '2023-10-19'),
(22, 19, 35, 2, 199.00, 398.00, '2023-10-19', '2023-10-19');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `ClientID` int(11) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `NomDeFamille` varchar(50) NOT NULL,
  `NumeroDeContact` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `ConditionsDePaiement` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`ClientID`, `Prenom`, `NomDeFamille`, `NumeroDeContact`, `Email`, `ConditionsDePaiement`, `created_at`, `last_modification`) VALUES
(5, 'Ahmed', 'Harmouch', '6862616786', 'mustaphaharmouch1972@gmail.com', 'Contrat thrth', '2023-09-16', '2023-10-16'),
(9, 'Mustapha', 'Harmouch', '25', 'mustaphaharmouch1972@gmail.com', 'Contrat', '2023-09-16', '2023-09-16'),
(10, 'Must', 'Harmouch', '25', 'mustaphaharmouch1972@gmail.com', 'Contrat', '2023-09-16', '2023-09-17');

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE `employe` (
  `EmployeeID` int(11) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `NomDeFamille` varchar(50) NOT NULL,
  `NumeroDeContact` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Poste` varchar(100) NOT NULL,
  `Salaire` decimal(10,0) NOT NULL,
  `GestionDesEmployes` tinyint(1) NOT NULL,
  `GestionDesArticles` tinyint(1) NOT NULL,
  `GestionDesClient` tinyint(1) NOT NULL,
  `GestionDesFournisseur` tinyint(1) NOT NULL,
  `GestionDeStock` tinyint(1) NOT NULL,
  `GestionDesAchats` tinyint(1) NOT NULL,
  `GestionDesVentes` tinyint(1) NOT NULL,
  `GestionDesFactures` tinyint(1) NOT NULL,
  `GestionDesResourcesHumaine` tinyint(1) NOT NULL,
  `created_at` date NOT NULL,
  `last_modification` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `employe`
--

INSERT INTO `employe` (`EmployeeID`, `Prenom`, `NomDeFamille`, `NumeroDeContact`, `Email`, `Password`, `Poste`, `Salaire`, `GestionDesEmployes`, `GestionDesArticles`, `GestionDesClient`, `GestionDesFournisseur`, `GestionDeStock`, `GestionDesAchats`, `GestionDesVentes`, `GestionDesFactures`, `GestionDesResourcesHumaine`, `created_at`, `last_modification`) VALUES
(9, 'Souka', ' SR', '060873153', 'souka@gmail.com', '$2b$10$.1eVp4TpqW0IvG9XzDVKEuxyrUMpgcKPCzf5KH32lMfBcQzULyinS', 'Job 2', 2500, 1, 1, 0, 0, 1, 1, 1, 1, 1, '2023-10-03', '2023-10-17');

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE `fournisseur` (
  `SupplierID` int(11) NOT NULL,
  `NomDuFournisseur` varchar(100) NOT NULL,
  `NumeroDeContact` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `ConditionsDePaiement` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`SupplierID`, `NomDuFournisseur`, `NumeroDeContact`, `Email`, `ConditionsDePaiement`, `created_at`, `last_modification`) VALUES
(4, 'Mustapha', '0608731353', 'mustaphaharmouch1972@gmail.com', 'contrat cdn', '2023-09-17', '2023-10-18'),
(5, 'Hayat', '25', 'mustaphaharmouch1972@gmail.com', 'contrat', '2023-09-17', '2023-09-17'),
(6, 'Hayat', '25', 'mustaphaharmouch1972@gmail.com', 'contrat', '2023-09-17', '2023-09-17');

-- --------------------------------------------------------

--
-- Structure de la table `production`
--

CREATE TABLE `production` (
  `ProductionID` int(11) NOT NULL,
  `DateDeProduction` date DEFAULT NULL,
  `NomDuProduit` varchar(100) NOT NULL,
  `QuantiteProduite` int(11) DEFAULT NULL,
  `Cout` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `production`
--

INSERT INTO `production` (`ProductionID`, `DateDeProduction`, `NomDuProduit`, `QuantiteProduite`, `Cout`) VALUES
(2, '2023-10-19', 'Khtek', 25, 525.00),
(3, '2023-10-05', 'Khtek', 200, 100.00);

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

CREATE TABLE `stock` (
  `StockID` int(11) NOT NULL,
  `Supplier` varchar(50) NOT NULL,
  `NomDuProduit` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `QuantiteDisponible` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stock`
--

INSERT INTO `stock` (`StockID`, `Supplier`, `NomDuProduit`, `Description`, `QuantiteDisponible`) VALUES
(17, 'Hayat', 'coffee', 'dfdfd', 200),
(22, 'Hayat', 'Atay bn3na3', 'note for testing', 198),
(23, 'Hayat', 'Water', 'gzergz', 251);

-- --------------------------------------------------------

--
-- Structure de la table `timesheet`
--

CREATE TABLE `timesheet` (
  `TimesheetID` int(11) NOT NULL,
  `EmployeeID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `HeuresTravaillees` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `timesheet`
--

INSERT INTO `timesheet` (`TimesheetID`, `EmployeeID`, `Date`, `HeuresTravaillees`) VALUES
(3, 9, '2023-10-17', 20.00),
(4, 9, '2023-10-05', 12.00);

-- --------------------------------------------------------

--
-- Structure de la table `transactioncompte`
--

CREATE TABLE `transactioncompte` (
  `TransactionID` int(11) NOT NULL,
  `DateDeLaTransaction` date DEFAULT NULL,
  `TypeDeTransaction` varchar(20) DEFAULT NULL,
  `Montant` decimal(10,2) DEFAULT NULL,
  `Notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transactioncompte`
--

INSERT INTO `transactioncompte` (`TransactionID`, `DateDeLaTransaction`, `TypeDeTransaction`, `Montant`, `Notes`) VALUES
(3, '2023-10-18', 'Purchase', 150.00, 'Now the first note ( hope so )'),
(5, '2023-10-18', 'Sale', 120.00, 'test'),
(6, '2023-10-19', 'Expense', 200.00, 'rah hmad li 7azq wdwerna m3ah');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `username`, `Email`, `Password`, `created_at`, `last_modification`) VALUES
(1, 'musta', 'musta@gmail.com', '$2a$12$fYMIhNA4dJGZIeBRJI1LVOXOc8nQO6qqv0CvMzlpOHcW6GqhpRMmi', '2023-08-20', '2023-08-20');

-- --------------------------------------------------------

--
-- Structure de la table `vente`
--

CREATE TABLE `vente` (
  `SaleID` int(11) NOT NULL,
  `DateDeVente` date DEFAULT NULL,
  `ClientID` int(11) DEFAULT NULL,
  `MontantTotal` decimal(10,2) DEFAULT NULL,
  `Notes` text DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vente`
--

INSERT INTO `vente` (`SaleID`, `DateDeVente`, `ClientID`, `MontantTotal`, `Notes`, `last_modification`) VALUES
(13, '2023-10-13', 9, 516.00, 'This is a note for Ahmed zaml', '2023-10-13'),
(14, '2023-10-13', 10, 98.00, 'had syed 7azq ', '2023-10-13'),
(15, '2023-10-16', 10, 793.00, 'dfdfa', '2023-10-16'),
(16, '2023-10-16', 9, 199.00, '25273', '2023-10-16'),
(17, '2023-10-18', 5, 597.00, 'vente note', '2023-10-18'),
(19, '2023-10-19', 5, 648.00, 'dfagaer', '2023-10-19');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `achat`
--
ALTER TABLE `achat`
  ADD PRIMARY KEY (`PurchaseID`),
  ADD KEY `SupplierID` (`SupplierID`);

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`ArticleID`);

--
-- Index pour la table `articleachat`
--
ALTER TABLE `articleachat`
  ADD PRIMARY KEY (`PurchaseItemID`),
  ADD KEY `PurchaseID` (`PurchaseID`),
  ADD KEY `ArticleID` (`ArticleID`);

--
-- Index pour la table `articlevente`
--
ALTER TABLE `articlevente`
  ADD PRIMARY KEY (`SaleItemID`),
  ADD KEY `SaleID` (`SaleID`),
  ADD KEY `ArticleID` (`ArticleID`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`ClientID`);

--
-- Index pour la table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`EmployeeID`);

--
-- Index pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD PRIMARY KEY (`SupplierID`);

--
-- Index pour la table `production`
--
ALTER TABLE `production`
  ADD PRIMARY KEY (`ProductionID`);

--
-- Index pour la table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`StockID`);

--
-- Index pour la table `timesheet`
--
ALTER TABLE `timesheet`
  ADD PRIMARY KEY (`TimesheetID`),
  ADD KEY `EmployeeID` (`EmployeeID`);

--
-- Index pour la table `transactioncompte`
--
ALTER TABLE `transactioncompte`
  ADD PRIMARY KEY (`TransactionID`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `vente`
--
ALTER TABLE `vente`
  ADD PRIMARY KEY (`SaleID`),
  ADD KEY `ClientID` (`ClientID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `achat`
--
ALTER TABLE `achat`
  MODIFY `PurchaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `ArticleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `articleachat`
--
ALTER TABLE `articleachat`
  MODIFY `PurchaseItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `articlevente`
--
ALTER TABLE `articlevente`
  MODIFY `SaleItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `ClientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `employe`
--
ALTER TABLE `employe`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  MODIFY `SupplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `production`
--
ALTER TABLE `production`
  MODIFY `ProductionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `StockID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `timesheet`
--
ALTER TABLE `timesheet`
  MODIFY `TimesheetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `transactioncompte`
--
ALTER TABLE `transactioncompte`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `vente`
--
ALTER TABLE `vente`
  MODIFY `SaleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `achat`
--
ALTER TABLE `achat`
  ADD CONSTRAINT `achat_ibfk_1` FOREIGN KEY (`SupplierID`) REFERENCES `fournisseur` (`SupplierID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `articleachat`
--
ALTER TABLE `articleachat`
  ADD CONSTRAINT `articleachat_ibfk_1` FOREIGN KEY (`PurchaseID`) REFERENCES `achat` (`PurchaseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articleachat_ibfk_2` FOREIGN KEY (`ArticleID`) REFERENCES `article` (`ArticleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `articlevente`
--
ALTER TABLE `articlevente`
  ADD CONSTRAINT `articlevente_ibfk_1` FOREIGN KEY (`SaleID`) REFERENCES `vente` (`SaleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articlevente_ibfk_2` FOREIGN KEY (`ArticleID`) REFERENCES `article` (`ArticleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `timesheet`
--
ALTER TABLE `timesheet`
  ADD CONSTRAINT `timesheet_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employe` (`EmployeeID`);

--
-- Contraintes pour la table `vente`
--
ALTER TABLE `vente`
  ADD CONSTRAINT `vente_ibfk_1` FOREIGN KEY (`ClientID`) REFERENCES `client` (`ClientID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
