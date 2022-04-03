/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 17/03/2022 17:36:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` varchar(90) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES ('1', 'Gucci');
INSERT INTO `category` VALUES ('2', 'Vans');
INSERT INTO `category` VALUES ('3', 'Converse');
INSERT INTO `category` VALUES ('4', 'Adidas');
INSERT INTO `category` VALUES ('5', 'Nike');
COMMIT;

-- ----------------------------
-- Table structure for color
-- ----------------------------
DROP TABLE IF EXISTS `color`;
CREATE TABLE `color` (
  `id` varchar(90) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of color
-- ----------------------------
BEGIN;
INSERT INTO `color` VALUES ('1', 'Xanhh');
INSERT INTO `color` VALUES ('2', 'Đỏ');
INSERT INTO `color` VALUES ('3', 'Vàng');
COMMIT;

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `id` int NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `amount` int NOT NULL,
  `Orders_id` int NOT NULL,
  `User_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of payment
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` double NOT NULL,
  `Category_id` varchar(45) NOT NULL,
  `Color_id` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `img` text,
  `Size_id` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES ('5', 'VANS FLAME SK8-HI REISSUE', 1900000, '2', '1', 'Flame là bộ sưu tập chủ lực của thương hiệu VANS gồm 3 phiên bản Old Skool, Slip-on, Sk8-Hi với ngoại hình bắt lửa nóng phỏng tay, tô điểm những ngọn lửa đỏ rực trên nền canvas và suede đen tuyền, cùng màu trắng ở đế, đường chỉ và da lót bên trong, là những phiên bản không bao giờ lỗi thời và được nhiều vận động viên trượt ván, BMX chính hiệu chào đón cho tủ giày của mình.', 'p6.jpg', '1');
INSERT INTO `product` VALUES ('19', 'VANS SK8-HI CLASSIC NAVY/WHITE', 1950000, '3', '2', 'Flame là bộ sưu tập chủ lực của thương hiệu VANS gồm 3 phiên bản Old Skool, Slip-on, Sk8-Hi với ngoại hình bắt lửa nóng phỏng tay, tô điểm những ngọn lửa đỏ rực trên nền canvas và suede đen tuyền, cùng màu trắng ở đế, đường chỉ và da lót bên trong, là những phiên bản không bao giờ lỗi thời và được nhiều vận động viên trượt ván, BMX chính hiệu chào đón cho tủ giày của mình.', 'p5.jpg', '1');
INSERT INTO `product` VALUES ('67', 'VANS CANVAS OLD SKOOL CLASSIC TRUE WHITE', 1750000, '4', '1', 'Flame là bộ sưu tập chủ lực của thương hiệu VANS gồm 3 phiên bản Old Skool, Slip-on, Sk8-Hi với ngoại hình bắt lửa nóng phỏng tay, tô điểm những ngọn lửa đỏ rực trên nền canvas và suede đen tuyền, cùng màu trắng ở đế, đường chỉ và da lót bên trong, là những phiên bản không bao giờ lỗi thời và được nhiều vận động viên trượt ván, BMX chính hiệu chào đón cho tủ giày của mình.', 'p1.jpg', '2');
INSERT INTO `product` VALUES ('1647505785470', 'Lê Minh Huy', 1234, '1', '3', 'fsdsda', 'p6.jpg', '1');
COMMIT;

-- ----------------------------
-- Table structure for size
-- ----------------------------
DROP TABLE IF EXISTS `size`;
CREATE TABLE `size` (
  `id` varchar(90) NOT NULL,
  `name` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of size
-- ----------------------------
BEGIN;
INSERT INTO `size` VALUES ('1', 'S');
INSERT INTO `size` VALUES ('3', 'M');
INSERT INTO `size` VALUES ('4', 'L');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(90) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(90) NOT NULL,
  `phone` varchar(90) NOT NULL,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'admin', 'admin@gmail.com', '123', '962796473', 'ADMIN');
INSERT INTO `user` VALUES ('1647420367509', 'Huy Le', 'user@gmail.com', '123', '0356614606', 'USER');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
