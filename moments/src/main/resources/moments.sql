/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.27 : Database - moments
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`moments` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `moments`;

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `content` varchar(100) NOT NULL COMMENT '评论内容',
  `moments_id` bigint NOT NULL COMMENT '朋友圈id',
  `user_id` char(24) NOT NULL COMMENT '评论用户',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  `reply_id` int NOT NULL DEFAULT '0' COMMENT '回复评论的id',
  PRIMARY KEY (`id`),
  KEY `id&momentId` (`moments_id`),
  CONSTRAINT `id&momentId` FOREIGN KEY (`moments_id`) REFERENCES `moments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `comment` */

insert  into `comment`(`id`,`content`,`moments_id`,`user_id`,`time`,`reply_id`) values (5,'test',4,'63304f26ea3643d7a12f286a','2022-09-30 13:45:54',0),(6,'ok',4,'63304f26ea3643d7a12f286a','2022-09-30 13:48:10',0),(15,'99\'',4,'63304f26ea3643d7a12f286a','2022-09-30 18:48:23',5),(16,'ok',4,'6337113e49b36e3972772afc','2022-09-30 23:55:00',5);

/*Table structure for table `image` */

DROP TABLE IF EXISTS `image`;

CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '图片链接',
  `moments_id` bigint DEFAULT NULL COMMENT '发表的id',
  `type` smallint NOT NULL DEFAULT '1' COMMENT '类型',
  PRIMARY KEY (`id`),
  KEY `momentsId` (`moments_id`),
  CONSTRAINT `momentsId` FOREIGN KEY (`moments_id`) REFERENCES `moments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `image` */

insert  into `image`(`id`,`url`,`moments_id`,`type`) values (1,'t',4,1);

/*Table structure for table `like` */

DROP TABLE IF EXISTS `like`;

CREATE TABLE `like` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` char(24) NOT NULL COMMENT '用户id',
  `moment_id` bigint NOT NULL COMMENT '朋友圈id',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
  PRIMARY KEY (`id`,`user_id`,`moment_id`),
  KEY `moment_id&id` (`moment_id`),
  CONSTRAINT `moment_id&id` FOREIGN KEY (`moment_id`) REFERENCES `moments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `like` */

insert  into `like`(`id`,`user_id`,`moment_id`,`time`) values (6,'63304f26ea3643d7a12f286a',1,'2022-09-30 14:28:56');

/*Table structure for table `moments` */

DROP TABLE IF EXISTS `moments`;

CREATE TABLE `moments` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `content` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '内容',
  `user_id` char(24) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `moments` */

insert  into `moments`(`id`,`content`,`user_id`,`time`) values (1,'test','63304f26ea3643d7a12f286a','2022-09-28 12:50:47'),(4,'test','63304f26ea3643d7a12f286a','2022-09-29 12:50:47');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
