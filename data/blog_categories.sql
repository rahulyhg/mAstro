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
-- Table structure for table `blog_categories`
--

CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `cid` int(255) NOT NULL COMMENT 'Parent category id',
  `title` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `link` varchar(3000) COLLATE utf8_unicode_ci NOT NULL,
  `des` longtext COLLATE utf8_unicode_ci NOT NULL,
  `time` char(15) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `cid`, `title`, `link`, `des`, `time`) VALUES
(1, 0, 'Góc tâm sự', 'goc-tam-su', '', ''),
(2, 0, 'Truyện ngắn', 'truyen-ngan', '', ''),
(3, 0, 'Truyện dài', 'truyen-dai', '', ''),
(4, 0, 'Chiêm tinh học', 'chiem-tinh-hoc', '', ''),
(5, 4, 'Bí mật 12 cung hoàng đạo', 'bi-mat-hoang-dao', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
