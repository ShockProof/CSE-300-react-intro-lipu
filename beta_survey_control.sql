-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2018 at 08:29 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beta_survey_control`
--

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `formatJSON` varchar(555) DEFAULT NULL,
  `DesignerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `form`
--

INSERT INTO `form` (`id`, `name`, `formatJSON`, `DesignerID`) VALUES
(1, 'Survey Mohakhali', '[{\"name\":\"Name\",\"type\":\"varchar(255)\"},{\"name\":\"Email\",\"type\":\"varchar(255)\"},{\"name\":\"Address\",\"type\":\"varchar(255)\"},{\"name\":\"Phone\",\"type\":\"int\"},{\"name\":\"Monthly_Income\",\"type\":\"int\"},{\"name\":\"Property_Worth\",\"type\":\"int\"}]', 1),
(2, 'Survey Firmgate', '[{\"name\":\"Name\",\"type\":\"varchar(255)\"},{\"name\":\"Email\",\"type\":\"varchar(255)\"},{\"name\":\"Address\",\"type\":\"varchar(255)\"},{\"name\":\"Phone\",\"type\":\"int\"},{\"name\":\"Monthly_Income\",\"type\":\"int\"},{\"name\":\"Property\",\"type\":\"varchar(255)\"}]', 1),
(3, 'Survey Mohammadpur', '[{\"name\":\"Name\",\"type\":\"varchar(255)\"},{\"name\":\"Email\",\"type\":\"varchar(255)\"},{\"name\":\"Address\",\"type\":\"varchar(255)\"},{\"name\":\"Phone\",\"type\":\"int\"},{\"name\":\"Monthly_Income\",\"type\":\"int\"},{\"name\":\"Property_Worth\",\"type\":\"int\"}]', 1),
(4, 'UAP Students', '[{\"name\":\"Name\",\"type\":\"varchar(255)\"},{\"name\":\"CGPA\",\"type\":\"int\"},{\"name\":\"RegistrationID\",\"type\":\"int\"}]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `form_1`
--

CREATE TABLE `form_1` (
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `Monthly_Income` int(11) DEFAULT NULL,
  `Property_Worth` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `form_2`
--

CREATE TABLE `form_2` (
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `Monthly_Income` int(11) DEFAULT NULL,
  `Property` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `form_3`
--

CREATE TABLE `form_3` (
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `Monthly_Income` int(11) DEFAULT NULL,
  `Property_Worth` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `form_4`
--

CREATE TABLE `form_4` (
  `Name` varchar(255) DEFAULT NULL,
  `CGPA` int(11) DEFAULT NULL,
  `RegistrationID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `form_4`
--

INSERT INTO `form_4` (`Name`, `CGPA`, `RegistrationID`) VALUES
(' Syed Zafrul Lipu', 3, 13101062),
(' Yasin Arafat', 4, 13101068),
(' Nahid Hasan Prodhan', 3, 12201029);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(33) DEFAULT NULL,
  `pass` varchar(33) DEFAULT NULL,
  `email` varchar(33) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `role` varchar(33) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `pass`, `email`, `gender`, `role`) VALUES
(1, 'Syed Zafrul Lipu', 'algocode', 'zafrullipu@gmail.com', 'male', 'designer'),
(2, 'Shamim tourist', 'tourist', 'shamim@tourist.com', 'male', 'employee'),
(3, 'Tabia Afrose Promi', 'algo123', 'promi@gmail.com', 'female', 'designer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
