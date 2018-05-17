-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 17, 2018 at 04:31 PM
-- Server version: 5.7.22
-- PHP Version: 7.2.3-1ubuntu1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gordons_kitchen`
--
CREATE DATABASE IF NOT EXISTS `gordons_kitchen` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `gordons_kitchen`;

-- --------------------------------------------------------

--
-- Table structure for table `account_history`
--

CREATE TABLE `account_history` (
  `user_id` int(11) NOT NULL,
  `created_on` varchar(255) NOT NULL,
  `last_signed_on` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account_history`
--

INSERT INTO `account_history` (`user_id`, `created_on`, `last_signed_on`) VALUES
(3, '1525887327774', '1526395410886'),
(4, '1526019919968', '1526019991775'),
(5, '1526020127780', '1526020127780'),
(6, '1526020231872', '1526027905359'),
(7, '1526056801801', '1526056892237'),
(8, '1526348972672', '1526348972672');

-- --------------------------------------------------------

--
-- Table structure for table `completed`
--

CREATE TABLE `completed` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `score_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `completed`
--

INSERT INTO `completed` (`id`, `user_id`, `dish_id`, `score_id`) VALUES
(9, 3, 2, 12),
(10, 3, 2, 13),
(11, 3, 3, 14),
(12, 3, 4, 15),
(13, 3, 1, 16),
(14, 3, 2, 17),
(15, 3, 1, 18),
(16, 3, 1, 19),
(17, 3, 2, 20),
(18, 6, 2, 21),
(19, 6, 3, 22),
(20, 6, 4, 23),
(21, 6, 1, 24),
(22, 6, 2, 25),
(23, 6, 3, 26),
(24, 6, 4, 27),
(25, 6, 1, 28),
(26, 6, 4, 29),
(27, 6, 1, 30),
(28, 6, 1, 31),
(29, 6, 1, 32),
(30, 3, 2, 33),
(31, 3, 2, 34),
(32, 7, 2, 35),
(33, 3, 2, 36),
(34, 3, 2, 37),
(35, 3, 2, 38),
(36, 8, 2, 39),
(37, 3, 2, 40);

-- --------------------------------------------------------

--
-- Table structure for table `credits`
--

CREATE TABLE `credits` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `difficulty` varchar(45) NOT NULL,
  `unlocked_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `difficulty`, `unlocked_at`) VALUES
(1, 'greek pizza', 'easy', 3),
(2, 'pb & j', 'easy', 0),
(3, 'grilled cheese', 'easy', 1),
(4, 'veggie omlet', 'easy', 2);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `player_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`player_id`, `user_id`) VALUES
(3, 6),
(3, 7),
(6, 3),
(4, 3),
(7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `url`, `description`) VALUES
(1, 'https://i.imgur.com/3gdJV4K.png', 'banana'),
(2, 'https://i.imgur.com/4iUb456.png', 'toast'),
(3, 'https://i.imgur.com/pKlIhcV.png', 'hot sauce'),
(4, 'https://i.imgur.com/7Wt7IcK.png', 'bbq sauce'),
(5, 'https://i.imgur.com/doTtsmK.png', 'soda'),
(6, 'https://i.imgur.com/9jyTp2V.png', 'olive oil'),
(7, 'https://i.imgur.com/Sr2K9fW.png', 'jelly'),
(8, 'https://i.imgur.com/RmT6HZM.png', 'dough'),
(9, 'https://i.imgur.com/p5xwc2G.png', 'garlic'),
(10, 'https://i.imgur.com/TOThIZd.png', 'onion'),
(11, 'https://i.imgur.com/4manSdq.png', 'tomato'),
(12, 'https://i.imgur.com/b238YaX.png', 'cheese'),
(13, 'https://i.imgur.com/M5lt4vT.png', 'basil'),
(14, 'https://i.imgur.com/051M19Q.png', 'mushroom'),
(15, 'https://i.imgur.com/hDCxkZV.png', 'pepperoni'),
(16, 'https://i.imgur.com/ZRd26vR.png', 'peppers'),
(17, 'https://i.imgur.com/zojZH8s.png', 'steak'),
(18, 'https://i.imgur.com/e448KZ3.png', 'peanut butter'),
(19, 'https://i.imgur.com/7xmeHo1.png', 'chicken'),
(20, 'https://i.imgur.com/FalgioQ.png', 'eggs'),
(21, 'https://i.imgur.com/p2Y7V8w.png', 'bread'),
(22, 'https://i.imgur.com/NRLNUq3.png', 'sardines'),
(23, 'https://i.imgur.com/Vep64Lj.png', 'spinach'),
(24, 'https://i.imgur.com/2BlbwmB.png', 'water'),
(25, 'https://i0.wp.com/freepngimages.com/wp-content/uploads/2016/03/green-olives.png?resize=624%2C631', 'olives'),
(26, 'https://i.imgur.com/CQGefc1.png', '15 min'),
(27, 'https://i.imgur.com/T93iIuU.png', '30 min'),
(28, 'https://i.imgur.com/srKDYZ7.png', '10 min'),
(29, 'https://i.imgur.com/pirAPRb.png', '60 min'),
(30, 'https://i.imgur.com/OKtmRoI.png', '45 min'),
(31, 'https://i.imgur.com/z6oUIBy.png', '1 min'),
(32, 'https://i.imgur.com/D319Io7.png', '2 min'),
(33, 'https://i.imgur.com/vn9nzl2.png', '5 min'),
(34, 'https://i.imgur.com/1OzgY2Z.png', '0 min'),
(35, 'https://i.imgur.com/ynboCHy.png', 'Pizza'),
(36, 'https://i.imgur.com/q2aUciq.png', 'Chef Gordon'),
(37, 'https://i.imgur.com/JSDLLpW.png', 'Mad Gordon'),
(38, 'https://i.imgur.com/bpxnKPG.png', 'Smirking Gordon'),
(39, 'https://i.imgur.com/MJOEKp3.png', 'Sad Gordon');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `type`, `description`, `image_id`) VALUES
(1, 'ingredient', 'dough', 8),
(2, 'ingredient', 'toast', 2),
(3, 'ingredient', 'bread', 2),
(4, 'ingredient', 'peanut butter', 18),
(5, 'ingredient', 'jelly', 7),
(6, 'ingredient', 'bananas', 1),
(7, 'ingredient', 'hot sauce', 3),
(8, 'ingredient', 'bqq sauce', 4),
(9, 'ingredient', 'cheese', 12),
(10, 'ingredient', 'sardines', 22),
(11, 'ingredient', 'eggs', 20),
(12, 'ingredient', 'chicken', 19),
(13, 'ingredient', 'steak', 17),
(14, 'ingredient', 'pepperoni', 15),
(15, 'ingredient', 'spinach', 23),
(16, 'ingredient', 'peppers', 16),
(17, 'ingredient', 'olives', 25),
(18, 'ingredient', 'olive oil', 6),
(19, 'ingredient', 'soda', 5),
(20, 'ingredient', 'water', 24),
(21, 'cook time', '1', 31),
(22, 'cook time', '2', 32),
(23, 'cook time', '5', 33),
(24, 'cook time', '10', 28),
(25, 'cook time', '15', 26),
(26, 'cook time', '30', 27),
(27, 'cook time', '45', 30),
(28, 'cook time', '60', 29),
(29, 'cook time', '0', 34);

-- --------------------------------------------------------

--
-- Table structure for table `player_level`
--

CREATE TABLE `player_level` (
  `xp` int(11) NOT NULL,
  `level_num` int(11) NOT NULL,
  `level_name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `player_level`
--

INSERT INTO `player_level` (`xp`, `level_num`, `level_name`, `description`) VALUES
(0, 0, 'Noobie', 'You\'re a noob'),
(1000, 1, 'Competent', 'You\'re Competent'),
(2000, 2, 'Able', 'You\'re able to be in the kitchen'),
(3000, 3, 'Trained', 'You\'re trained'),
(4000, 4, 'Student', 'You\'re a student'),
(5000, 5, 'Proficent', 'You\'re an ok chef'),
(6000, 6, 'Specialist', 'You\'ve got skillz'),
(7000, 7, 'Quarter Master', 'You\'re got a lot of skillz'),
(8000, 8, 'Master', 'You\'re a master'),
(9000, 9, 'Supreme Master', 'You\'re really good'),
(10000, 10, 'Captain of the Kitchen', 'You\'re almost as good as me now');

-- --------------------------------------------------------

--
-- Table structure for table `prompts`
--

CREATE TABLE `prompts` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `order_num` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  `text` varchar(255) NOT NULL,
  `image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prompts`
--

INSERT INTO `prompts` (`id`, `dish_id`, `order_num`, `type`, `text`, `image_id`) VALUES
(1, 2, 1, 'intro', 'A muscular man in a white apron approaches you, staring. You stand awkwardly. He speaks.', 36),
(2, 2, 2, 'intro', '\"So you think you can cook? We\'ll see about that.\"', NULL),
(3, 2, 1, 'failure', 'Your dish is done. Gordon smiles.', 37),
(4, 2, 2, 'failure', '\"You\'ve got a great future in my industry . . . as my customer.\"', NULL),
(5, 2, 1, 'success', 'Many hours later, your dish is completed.', NULL),
(6, 2, 2, 'success', '\"Delicious. FINALLY, some good food.\"', NULL),
(7, 3, 1, 'intro', 'You can handle the basics I see.', 38),
(8, 3, 1, 'intro', '\"Let\'s see if you can master the art of grilled cheese.\"', NULL),
(9, 3, 1, 'failure', 'Your bread is burnt to a crisp.', 39),
(10, 3, 2, 'failure', '\"Oh no, this sandwich is too cheesy for me\"', NULL),
(11, 3, 1, 'success', 'It\'s a golden perfection.. Marvelous. ', 21),
(12, 3, 2, 'success', '\"Dude... Your sandwich is looking sharp today.\"', NULL),
(13, 3, 1, 'intro', 'Om Nom Nom Nom... Breakfast is essential to start the day offf right.', 36),
(14, 3, 2, 'intro', '\"Morning Chef. Or should I say peasant. I need something light to get my day started. No meat!\"', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `positive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reactions`
--

INSERT INTO `reactions` (`id`, `dish_id`, `text`, `positive`) VALUES
(1, 2, 'What is that? An idiot sandwich?!', 0),
(2, 2, 'Well done mate...', 1),
(7, 2, 'It\'s actually quite nice . . . ', 1),
(8, 2, 'I approve', 1),
(9, 2, 'Call 911 please.', 0),
(10, 2, 'It\'s caught a disease!', 0),
(11, 3, 'How can you mess up grilled cheese?! The recipe is LITERALLY IN THE NAME!', 0),
(12, 4, 'How do you make an omelette look like a skin graft . . .', 0),
(13, 4, 'It’s so raw it’s still running around in the field.', 0),
(14, 3, 'What is that? An idiot sandwich?!', 0),
(15, 4, 'How do you make an omelette look like a skin graft . . .', 0),
(16, 3, 'Well done mate...', 1),
(17, 3, 'It\'s actually quite nice . . . ', 1),
(18, 4, 'I\'ll give that 9 out of 10!', 1),
(19, 4, 'This is bloody delicious.', 1),
(20, 1, 'This is bloody delicious.', 1),
(21, 1, 'Well, it tastes delicious', 1),
(22, 1, 'Finally, some good food.', 1),
(23, 1, 'Call 911', 0),
(24, 1, 'Do you even cook?', 0),
(25, 1, 'Oven baked fake turds!!!', 0);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `score`) VALUES
(12, 800),
(13, 1000),
(14, 1000),
(15, 1000),
(16, 1000),
(17, 400),
(18, 600),
(19, 1000),
(20, 1000),
(21, 1000),
(22, 1000),
(23, 1000),
(24, 1000),
(25, 1000),
(26, 1000),
(27, 1000),
(28, 1000),
(29, 1000),
(30, 1000),
(31, 1000),
(32, 1000),
(33, 400),
(34, 1000),
(35, 1000),
(36, 1000),
(37, 400),
(38, 1000),
(39, 800),
(40, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE `steps` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `execution_order` int(11) DEFAULT NULL,
  `option_id` int(11) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`id`, `dish_id`, `execution_order`, `option_id`, `is_correct`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 1, 2, 0),
(3, 1, 1, 3, 0),
(4, 1, 2, 18, 1),
(5, 1, 2, 5, 0),
(6, 1, 2, 6, 0),
(7, 1, 3, 16, 1),
(8, 1, 3, 15, 1),
(9, 1, 3, 19, 0),
(10, 1, 4, 21, 0),
(11, 1, 4, 23, 0),
(12, 1, 4, 24, 1),
(13, 1, 4, 22, 0),
(14, 2, 1, 3, 1),
(15, 2, 1, 20, 0),
(16, 2, 1, 14, 0),
(17, 2, 2, 5, 1),
(18, 2, 2, 7, 0),
(19, 2, 2, 13, 0),
(20, 2, 3, 28, 0),
(21, 2, 3, 29, 1),
(22, 2, 3, 27, 0),
(23, 2, 3, 26, 0),
(24, 3, 1, 3, 1),
(25, 3, 1, 1, 0),
(26, 3, 1, 15, 0),
(27, 3, 2, 7, 0),
(28, 3, 2, 9, 1),
(29, 3, 2, 19, 0),
(30, 3, 3, 21, 0),
(31, 3, 3, 22, 0),
(32, 3, 3, 23, 1),
(33, 3, 3, 18, 0),
(34, 4, 1, 11, 1),
(35, 4, 1, 1, 0),
(36, 4, 1, 10, 0),
(37, 4, 2, 16, 1),
(38, 4, 2, 6, 0),
(39, 4, 2, 5, 0),
(40, 4, 3, 15, 1),
(41, 4, 3, 12, 0),
(42, 4, 3, 13, 0),
(43, 4, 4, 9, 1),
(44, 4, 4, 14, 0),
(45, 4, 4, 6, 0),
(46, 4, 5, 29, 0),
(47, 4, 5, 25, 1),
(48, 4, 5, 27, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `total_xp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `total_xp`) VALUES
(3, 'gshaw', '$2b$10$So43TnPip9AxaBrxKk9LB.ETN5jtV41Q8Sweq6WXh/OkAMrTjWe1O', 12600),
(4, 'bossChef22', '$2b$10$rTJ60FaUWNxl7bfmOmnOROPf30YS2UOA/VYXEW9SsILNwH3yipQwO', 0),
(5, 'test', '$2b$10$47dwqD5QV2imlQabrgSEFO7IznrGyVgDwL8P8mM91gMBKU5E21ZrW', 0),
(6, 'gordonRamsay', '$2b$10$tgnCj6PBUpg9sHNA.qQ3S.ahYWLtm0ca/Hq/UtV19MMLTZUeUO3CO', 12000),
(7, 'aelmurillo', '$2b$10$J4rV19vg4Qw6PRryq2FgF.yDM3dwiwHt65lSVQ9a9oZx7YaFVYjjW', 1000),
(8, 'readyPlayerOne', '$2b$10$v8cmS/xWEy69C2iFWuywjuwhDr3MW7w3h5AveJ/2v4hj4.zrDJss.', 800);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int(11) NOT NULL,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role`) VALUES
(3, 'player'),
(4, 'player'),
(5, 'player'),
(6, 'player'),
(7, 'player'),
(8, 'player');

-- --------------------------------------------------------

--
-- Table structure for table `xp_reward`
--

CREATE TABLE `xp_reward` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `penalties` int(11) NOT NULL,
  `reward` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `xp_reward`
--

INSERT INTO `xp_reward` (`id`, `dish_id`, `penalties`, `reward`) VALUES
(1, 1, 0, 1000),
(2, 1, 1, 800),
(3, 1, 2, 600),
(4, 1, 3, 400),
(5, 2, 0, 1000),
(6, 2, 1, 800),
(7, 2, 2, 600),
(8, 2, 3, 400),
(9, 3, 0, 1000),
(10, 3, 1, 800),
(11, 3, 1, 600),
(12, 3, 1, 400),
(13, 4, 0, 1000),
(14, 4, 1, 800),
(15, 4, 2, 600),
(16, 4, 3, 400);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_history`
--
ALTER TABLE `account_history`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `completed`
--
ALTER TABLE `completed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_completion` (`user_id`),
  ADD KEY `user_score` (`score_id`);

--
-- Indexes for table `credits`
--
ALTER TABLE `credits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dish_id_UNIQUE` (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `option_image` (`image_id`);

--
-- Indexes for table `prompts`
--
ALTER TABLE `prompts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `dish_prompt` (`dish_id`),
  ADD KEY `prompt_image` (`image_id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dish_reaction` (`dish_id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `dish_step` (`dish_id`),
  ADD KEY `step_option` (`option_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `xp_reward`
--
ALTER TABLE `xp_reward`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dish_reward` (`dish_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `completed`
--
ALTER TABLE `completed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `prompts`
--
ALTER TABLE `prompts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `xp_reward`
--
ALTER TABLE `xp_reward`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_history`
--
ALTER TABLE `account_history`
  ADD CONSTRAINT `user_account_history` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `completed`
--
ALTER TABLE `completed`
  ADD CONSTRAINT `user_completion` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_score` FOREIGN KEY (`score_id`) REFERENCES `scores` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `option_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `prompts`
--
ALTER TABLE `prompts`
  ADD CONSTRAINT `dish_prompt` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `prompt_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `reactions`
--
ALTER TABLE `reactions`
  ADD CONSTRAINT `dish_reaction` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `steps`
--
ALTER TABLE `steps`
  ADD CONSTRAINT `dish_step` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `step_option` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_role` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `xp_reward`
--
ALTER TABLE `xp_reward`
  ADD CONSTRAINT `dish_reward` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
