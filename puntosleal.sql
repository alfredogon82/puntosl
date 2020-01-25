CREATE DATABASE  IF NOT EXISTS `puntosleal` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `puntosleal`;
-- MySQL dump 10.13  Distrib 5.5.62, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: puntosleal
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `value` float NOT NULL,
  `points` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'40a2e0a0ae80f64de505c07176912ca3','2020-01-23 15:10:00',10000,10,1),(2,'40a2e0a0ae80f64de505c07176912ca3','2020-01-24 02:32:23',20000,20,0),(3,'40a2e0a0ae80f64de505c07176912ca3','2020-01-24 04:49:38',3000,100,1),(4,'40a2e0a0ae80f64de505c07176912ca3','2020-01-24 04:54:14',3000,100,1);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `birth_date` datetime NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('40a2e0a0ae80f64de505c07176912ca3','alfredo','gonzalez','1982-11-10 00:00:00','alfredogon82@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('a251476e76eee6f6b7ff7224324eddf2','alfredo','gonzalez','1982-11-10 00:00:00','alfredogon821@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('eeee7aa2dca6cb928b7f61e78daf5507','alfredo','gonzalez','1982-11-10 00:00:00','alfredogo821@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('34b9f9cf7d09eb401310c838ebd33c62','alfredo','gonzalez','1982-11-10 00:00:00','alfrdogo821@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('c6f3ce6b386ce1023c635ce8d3cee6cf','alfredo','gonzalez','1982-11-10 00:00:00','alfrdogao821@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('5411f0fc7880b951ae5d348b79cb95d5','alfredo','gonzalez','1982-11-10 00:00:00','alfdogao821@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('7e1dcbcf759713432c4b9f31fdf09614','alfredo','gonzalez','1982-11-10 00:00:00','aldogao821@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('16e0108ce839cd2afffd5fa275adc041','alfredo','gonzalez','1982-11-10 00:00:00','aldoga821@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('d5f94f5667fbe0a2a50a91dc579f5fc6','alfredo','gonzalez','1982-11-10 00:00:00','aldoga4521@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('372cc8aa0099ddf42163d78d04b49481','alfredo','gonzalez','1982-11-10 00:00:00','aldogauu4521@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('e9b12dbb8a22c9d5586a5c2fdc12d02e','alfredo','gonzalez','1982-11-10 00:00:00','aldoqgauu4521@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('33af06c5f32480ced5ee64f19fcf6b77','alfredo','gonzalez','1982-11-10 00:00:00','aldoqgauu4521yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e'),('bcaf97335e278db0d8e7c6f05b5e30c6','alfredo','gonzalez','1982-11-10 00:00:00','aldous4521@yahoo.com','1b01e2c0c85001ef5684bbf3a457f99e');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-24 19:37:42
