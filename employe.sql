-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 20 sep. 2023 à 01:40
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

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
  `GestionDesArticles` tinyint(1) NOT NULL,
  `GestionDesClient` tinyint(1) NOT NULL,
  `GestionDesFournisseur` tinyint(1) NOT NULL,
  `GestionDeStock` tinyint(1) NOT NULL,
  `GestionDesAchats` tinyint(1) NOT NULL,
  `GestionDesVentes` tinyint(1) NOT NULL,
  `GestionDesFactures` tinyint(1) NOT NULL,
  `GestionDesResourcesHumaine` tinyint(1) NOT NULL,
  `created_at` date DEFAULT NULL,
  `last_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`EmployeeID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `employe`
--
ALTER TABLE `employe`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
