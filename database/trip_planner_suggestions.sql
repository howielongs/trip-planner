CREATE DATABASE  IF NOT EXISTS `trip_planner` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trip_planner`;
-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (x86_64)
--
-- Host: localhost    Database: trip_planner
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `suggestions`
--

DROP TABLE IF EXISTS `suggestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suggestions` (
  `suggestion_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  PRIMARY KEY (`suggestion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suggestions`
--

LOCK TABLES `suggestions` WRITE;
/*!40000 ALTER TABLE `suggestions` DISABLE KEYS */;
INSERT INTO `suggestions` VALUES (1,'Zareen’s','365 S California Ave, Palo Alto, CA 94306','dining'),(2,'Tony’s Pizza Napoletana','1570 Stockton St, San Francisco, CA 94133','dining'),(3,'House of Prime Rib','1906 Van Ness Ave, San Francisco, CA 94109','dining'),(4,'San Tung','1031 Irving St, San Francisco, CA 94122','dining'),(5,'Minnie Bell’s Soul Movement','5959 Shellmound St, Emeryville, CA 94608','dining'),(6,'Golden Gate Bridge','San Francisco, CA 94129','sightseeing'),(7,'Alcatraz Island','San Francisco, CA 94133','sightseeing'),(8,'Muir Woods National Monument','1 Muir Woods Rd, Mill Valley, CA 94941','sightseeing'),(9,'Fisherman’s Wharf','San Francisco, CA 94133','sightseeing'),(10,'Napa Valley','Napa, CA 94559','sightseeing'),(11,'Muir Woods National Monument','1 Muir Woods Rd, Mill Valley, CA 94941','nature'),(12,'Stinson Beach','Calle Del Sierra, Stinson Beach, CA 94970','nature'),(13,'Mount Tamalpais State Park','3801 Panoramic Hwy, Mill Valley, CA 94941','nature'),(14,'Point Reyes National Seashore','1 Bear Valley Rd, Point Reyes Station, CA 94956','nature'),(15,'Half Moon Bay State Beach','95 Kelly Ave, Half Moon Bay, CA 94019','nature'),(16,'Westfield San Francisco Centre','865 Market St, San Francisco, CA 94103','shopping'),(17,'Stanford Shopping Center','660 Stanford Shopping Center, Palo Alto, CA 94304','shopping'),(18,'Santana Row','377 Santana Row, San Jose, CA 95128','shopping'),(19,'Embarcadero Center','1 Embarcadero Center, San Francisco, CA 94111','shopping'),(20,'Stoneridge Shopping Center','1 Stoneridge Mall Rd, Pleasanton, CA 94588','shopping');
/*!40000 ALTER TABLE `suggestions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-06 18:01:50
