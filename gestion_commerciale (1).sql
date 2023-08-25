-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 26 août 2023 à 21:05
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
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(31, 'fuck it ', 'Your sense of adventure doesn’t just disappear when you have kids, so why should your family holiday options be limited? ', '1078', 25.00, 20.00, 'image_1693064134844.png', '2023-08-26', '2023-08-26');

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

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE `employe` (
  `EmployeeID` int(11) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `NomDeFamille` varchar(50) NOT NULL,
  `NumeroDeContact` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Poste` varchar(100) DEFAULT NULL,
  `Salaire` decimal(10,2) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Structure de la table `production`
--

CREATE TABLE `production` (
  `ProductionID` int(11) NOT NULL,
  `DateDeProduction` date DEFAULT NULL,
  `NomDuProduit` varchar(100) NOT NULL,
  `QuantiteProduite` int(11) DEFAULT NULL,
  `Cout` decimal(10,2) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

CREATE TABLE `stock` (
  `StockID` int(11) NOT NULL,
  `NomDuProduit` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `QuantiteDisponible` int(11) DEFAULT NULL,
  `PointDeReapprovisionnement` int(11) DEFAULT NULL,
  `Emplacement` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `timesheet`
--

CREATE TABLE `timesheet` (
  `TimesheetID` int(11) NOT NULL,
  `EmployeeID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `HeuresTravaillees` decimal(6,2) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transactioncompte`
--

CREATE TABLE `transactioncompte` (
  `TransactionID` int(11) NOT NULL,
  `DateDeLaTransaction` date DEFAULT NULL,
  `TypeDeTransaction` varchar(20) DEFAULT NULL,
  `Montant` decimal(10,2) DEFAULT NULL,
  `Notes` text DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `username`, `user_type`, `email`, `password`, `created_at`, `last_modification`) VALUES
(1, 'musta', 'admin', 'musta@gmail.com', '1234', '2023-08-20', '2023-08-20'),
(2, 'ahmed', 'worker', 'ahmed@gmail.com', '1234', '2023-08-20', '2023-08-20');

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
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `PurchaseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `ArticleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `articleachat`
--
ALTER TABLE `articleachat`
  MODIFY `PurchaseItemID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `articlevente`
--
ALTER TABLE `articlevente`
  MODIFY `SaleItemID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `ClientID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `employe`
--
ALTER TABLE `employe`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  MODIFY `SupplierID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `production`
--
ALTER TABLE `production`
  MODIFY `ProductionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `StockID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `timesheet`
--
ALTER TABLE `timesheet`
  MODIFY `TimesheetID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `transactioncompte`
--
ALTER TABLE `transactioncompte`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `vente`
--
ALTER TABLE `vente`
  MODIFY `SaleID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `achat`
--
ALTER TABLE `achat`
  ADD CONSTRAINT `achat_ibfk_1` FOREIGN KEY (`SupplierID`) REFERENCES `fournisseur` (`SupplierID`);

--
-- Contraintes pour la table `articleachat`
--
ALTER TABLE `articleachat`
  ADD CONSTRAINT `articleachat_ibfk_1` FOREIGN KEY (`PurchaseID`) REFERENCES `achat` (`PurchaseID`),
  ADD CONSTRAINT `articleachat_ibfk_2` FOREIGN KEY (`ArticleID`) REFERENCES `article` (`ArticleID`);

--
-- Contraintes pour la table `articlevente`
--
ALTER TABLE `articlevente`
  ADD CONSTRAINT `articlevente_ibfk_1` FOREIGN KEY (`SaleID`) REFERENCES `vente` (`SaleID`),
  ADD CONSTRAINT `articlevente_ibfk_2` FOREIGN KEY (`ArticleID`) REFERENCES `article` (`ArticleID`);

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
