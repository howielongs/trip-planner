CREATE DATABASE  IF NOT EXISTS `trip_planner` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trip_planner`;
-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (x86_64)
--
-- Host: 127.0.0.1    Database: trip_planner
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
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `activity_id` int NOT NULL,
  `activity_name` varchar(255) NOT NULL,
  `start_date` char(10) NOT NULL,
  `itinerary_id` int NOT NULL,
  `lon` int DEFAULT NULL,
  `lat` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `fk_itinerary_id` (`itinerary_id`),
  CONSTRAINT `fk_itinerary_id` FOREIGN KEY (`itinerary_id`) REFERENCES `itinerary` (`itinerary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinerary`
--

DROP TABLE IF EXISTS `itinerary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerary` (
  `itinerary_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `itinerary_name` varchar(255) NOT NULL,
  `start_date` char(10) NOT NULL,
  `end_date` char(10) NOT NULL,
  `created_date` char(10) NOT NULL,
  `activity_count` int DEFAULT NULL,
  PRIMARY KEY (`itinerary_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `itinerary_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerary`
--

LOCK TABLES `itinerary` WRITE;
/*!40000 ALTER TABLE `itinerary` DISABLE KEYS */;
INSERT INTO `itinerary` VALUES (1,1,'Summer Vacation','2024-06-01','2025-06-15','2024-05-01',NULL),(2,1,'yuh','not given','00-00-0000','12-05-2024',NULL),(3,1,'here','12-11-2003','00-00-0000','00-00-0000',NULL),(5,2,'day trip','12-11-2024','00-00-0000','00-00-0000',NULL),(6,2,'daytrip','12-11-2024','00-00-0000','00-00-0000',NULL);
/*!40000 ALTER TABLE `itinerary` ENABLE KEYS */;
UNLOCK TABLES;

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
  `description` varchar(255) DEFAULT NULL,
  `imageurl` varchar(10000) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  PRIMARY KEY (`suggestion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suggestions`
--

LOCK TABLES `suggestions` WRITE;
/*!40000 ALTER TABLE `suggestions` DISABLE KEYS */;
INSERT INTO `suggestions` VALUES (1,'Zareen’s','365 S California Ave, Palo Alto, CA 94306','dining','A cozy restaurant offering authentic Pakistani and Indian cuisine.','https://www.paloaltoonline.com/wp-content/uploads/2020/10/httpsdanielabrown.comembarcaderoblogsblog_photos124468-1.jpg',37.426818,-122.144352),(2,'Tony’s Pizza Napoletana','1570 Stockton St, San Francisco, CA 94133','dining','A renowned pizza spot serving Neapolitan-style pizzas in San Francisco.','https://tonyspizzanapoletana.com/wp-content/uploads/2024/10/webres_Tonys_Exterior1.webp',37.800316,-122.409058),(3,'House of Prime Rib','1906 Van Ness Ave, San Francisco, CA 94109','dining','An iconic steakhouse in San Francisco known for its prime rib.','https://www.houseofprimerib.net/assets/images/d7.jpg',37.793381,-122.422501),(4,'San Tung','1031 Irving St, San Francisco, CA 94122','dining','A famous Chinese restaurant offering delicious wings and noodles.','https://images.squarespace-cdn.com/content/v1/618b56bbb50653019ebdecaf/1637524608020-8MZCM5FA5F08XONTLWVE/san+tung.jpg',37.76371,-122.468994),(5,'Minnie Bell’s Soul Movement','5959 Shellmound St, Emeryville, CA 94608','dining','A soulful eatery known for its southern-style fried chicken and sides.','https://cdn.vox-cdn.com/thumbor/3Gayrk2COx3Z6jOZVFVC-swqWK4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16276075/ChefFernay_LaCocinaEvent.jpg',37.839359,-122.293098),(6,'Golden Gate Bridge','San Francisco, CA 94129','sightseeing','A world-famous suspension bridge and an iconic symbol of San Francisco.','https://www.queenanne.com/resourcefiles/things-to-do/golden-gate-bridge-at-san-francisco-california.jpg',37.8176155,-122.4783123),(7,'Alcatraz Island','San Francisco, CA 94133','sightseeing','A historic island and former prison located in the San Francisco Bay.','https://upload.wikimedia.org/wikipedia/commons/1/17/Alcatraz_2021.jpg',37.8267213,-122.422759),(8,'Muir Woods National Monument','1 Muir Woods Rd, Mill Valley, CA 94941','sightseeing','A serene national monument featuring towering redwood trees.','https://www.nps.gov/common/uploads/cropped_image/primary/9EB2D49C-F3A5-5C25-C01902867F788B2E.jpg?width=1600&quality=90&mode=crop',37.89338,-122.571756),(9,'Fisherman’s Wharf','San Francisco, CA 94133','sightseeing','A popular waterfront neighborhood featuring seafood, shops, and attractions.','https://www.dylanstours.com/wp-content/uploads/2020/02/unnamed-2.png',37.8081325,-122.4165913),(10,'Napa Valley','Napa, CA 94559','sightseeing','A world-famous wine region located in California’s wine country.','https://www.wine-searcher.com/images/region/napa-valley-4716-1-4.jpg?width=734',38.2971367,-122.2855293),(11,'Muir Woods National Monument','1 Muir Woods Rd, Mill Valley, CA 94941','nature','A stunning national monument filled with beautiful redwood trees.','https://www.nps.gov/common/uploads/cropped_image/primary/9EB2D49C-F3A5-5C25-C01902867F788B2E.jpg?width=1600&quality=90&mode=crop',37.89338,-122.571756),(12,'Stinson Beach','Calle Del Sierra, Stinson Beach, CA 94970','nature','A popular beach offering breathtaking ocean views and relaxing vibes.','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/28/3e/8a/stinson-beach-from-above.jpg?w=1200&h=-1&s=1',37.8994745,-122.6439445),(13,'Mount Tamalpais State Park','3801 Panoramic Hwy, Mill Valley, CA 94941','nature','A beautiful state park known for hiking and scenic views.','https://www.parks.ca.gov/pages/471/images/P0071439.JPG',37.9037441,-122.6037352),(14,'Point Reyes National Seashore','1 Bear Valley Rd, Point Reyes Station, CA 94956','nature','A coastal seashore with picturesque views and unique wildlife.','https://olemahouse.com/wp-content/uploads/2020/02/Point-Reyes-Hiking-800x533-1.jpg',38.041889,-122.789731),(15,'Half Moon Bay State Beach','95 Kelly Ave, Half Moon Bay, CA 94019','nature','A gorgeous beach destination ideal for picnics and outdoor activities.','https://thatsmypark.org/wp-content/uploads/2022/07/HalfMoonBaySB-2022Jul-131-Victoria-Y-1024x683.jpg',37.4650177,-122.4428699),(16,'Westfield San Francisco Centre','865 Market St, San Francisco, CA 94103','shopping','A high-end shopping center with a variety of luxury stores.','https://unionsquareshop.com/assets/img/stores/san-francisco-centre-westfield/san-francisco-centre-westfield-03.jpg',37.7839412,-122.4074787),(17,'Stanford Shopping Center','660 Stanford Shopping Center, Palo Alto, CA 94304','shopping','A premier shopping destination in Palo Alto.','https://assets.simpleviewinc.com/simpleview/image/upload/crm/sanmateoca/stanford-shopping-center-06_D29A73A4-5056-A36A-0BD77515A934EA08-d29a72c45056a36_d29a7412-5056-a36a-0bd8e298a44aa886.jpg',37.4431921,-122.1709163),(18,'Santana Row','377 Santana Row, San Jose, CA 95128','shopping','A vibrant retail and dining area in San Jose.','https://www.hotelvalencia-santanarow.com/files/6723/22290260_ImageLargeWidth.jpg',37.3193489,-121.948609),(19,'Embarcadero Center','1 Embarcadero Center, San Francisco, CA 94111','shopping','An iconic center in San Francisco known for shopping and events.','https://marinmagazine.com/wp-content/uploads/2023/08/boston-properties-native-partner-article-embarcadero-center-stairs.jpg',37.7948146,-122.399697),(20,'Stoneridge Shopping Center','1 Stoneridge Mall Rd, Pleasanton, CA 94588','shopping','A large shopping mall in Pleasanton with diverse retail stores.','https://assets.simon.com/propertyimages/1242/stoneridge-shopping-center-16.jpg',37.6913761,-121.9231414);
/*!40000 ALTER TABLE `suggestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'kimaya davis','kimayamariee@gmail.com',NULL),(2,'Kimaya Davis','kmdavis@scu.edu',NULL);
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

-- Dump completed on 2024-12-06 16:43:38
