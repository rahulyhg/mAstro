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
-- Table structure for table `blog_cmts`
--

CREATE TABLE IF NOT EXISTS `blog_cmts` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `uid` int(255) NOT NULL,
  `uip` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `iid` int(255) NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `likes` longtext COLLATE utf8_unicode_ci NOT NULL,
  `dislikes` longtext COLLATE utf8_unicode_ci NOT NULL,
  `show` int(1) NOT NULL DEFAULT '1',
  `time` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `blog_cmts`
--

INSERT INTO `blog_cmts` (`id`, `uid`, `uip`, `iid`, `content`, `likes`, `dislikes`, `show`, `time`) VALUES
(1, 2, '', 3, '&lt;p&gt;&lt;span style="color: rgb(34, 34, 34); font-family: ''dejavu sans mono'', monospace; font-size: 11px; line-height: normal; white-space: pre-wrap; background-color: rgb(255, 255, 255);"&gt;meditor-iframe&lt;/span&gt;&lt;span style="color: rgb(34, 34, 34); font-family: ''dejavu sans mono'', monospace; font-size: 11px; line-height: normal; white-space: pre-wrap; background-color: rgb(255, 255, 255);"&gt;meditor-iframe&lt;/span&gt;&lt;br&gt;&lt;/p&gt;', '', '', 1, '1436758387'),
(2, 2, '', 3, '&lt;p&gt;Test again~ &lt;b&gt;Shit!&lt;/b&gt;&lt;/p&gt;', '', '', 1, '1436758548');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
