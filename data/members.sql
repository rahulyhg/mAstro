-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 01, 2016 at 06:53 PM
-- Server version: 5.6.14
-- PHP Version: 5.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `astro`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `uip` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `cover` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `bcoin` int(255) NOT NULL,
  `gender` char(1) COLLATE utf8_unicode_ci NOT NULL COMMENT 'm:male|f:female',
  `online` int(1) NOT NULL,
  `friends` longtext COLLATE utf8_unicode_ci NOT NULL,
  `lang` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `noti` int(255) NOT NULL,
  `noti_new` int(255) NOT NULL,
  `time` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `last_activity` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `lastlog_time` char(15) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `uip`, `type`, `username`, `last_name`, `first_name`, `avatar`, `cover`, `bcoin`, `gender`, `online`, `friends`, `lang`, `noti`, `noti_new`, `time`, `last_activity`, `lastlog_time`) VALUES
(1, '', '', 'admin', 'The', 'Admin', 'http://localhost/bonita/data/img/Paris-5.jpg', 'http://localhost/bonita/data/img/Paris-8.jpg', 1000, 'f', 1, '2,3', 'vn', 0, 1, '', '', '1436683868'),
(2, '', '', 'miamor', 'West', 'Miamor', 'http://localhost/bonita/data/img/Venice.jpg', 'http://localhost/bonita/data/img/Paris-8.jpg', 1000, 'f', 1, '1,3', 'vn', 0, 0, '', '', '1437226724'),
(3, '', '', 'minhanh158', 'Nguyen', 'Anh', 'http://localhost/bonita/data/img/Venice.jpg', 'http://localhost/bonita/data/img/Paris-8.jpg', 1000, 'm', 0, '1,2', 'vn', 0, 0, '', '', '1436077765');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
