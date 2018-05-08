-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 04, 2018 at 07:14 PM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `gordons_kitchen`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_history`
--

CREATE TABLE `account_history` (
  `user_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_signed_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `completed`
--

CREATE TABLE `completed` (
  `user_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `score_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `dish_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `difficulty` varchar(45) NOT NULL,
  `unlocked_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`dish_id`, `name`, `difficulty`, `unlocked_at`) VALUES
(1, 'greek pizza', 'easy', 3),
(2, 'pb&j', 'easy', 0),
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

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `url` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(1, 'ingredient', 'dough', NULL),
(2, 'ingredient', 'toast', NULL),
(3, 'ingredient', 'bread', NULL),
(4, 'ingredient', 'peanut butter', NULL),
(5, 'ingredient', 'jelly', NULL),
(6, 'ingredient', 'bananas', NULL),
(7, 'ingredient', 'hot sauce', NULL),
(8, 'ingredient', 'bqq sauce', NULL),
(9, 'ingredient', 'cheese', NULL),
(10, 'ingredient', 'sardines', NULL),
(11, 'ingredient', 'eggs', NULL),
(12, 'ingredient', 'chicken', NULL),
(13, 'ingredient', 'steak', NULL),
(14, 'ingredient', 'pepperoni', NULL),
(15, 'ingredient', 'spinach', NULL),
(16, 'ingredient', 'peppers', NULL),
(17, 'ingredient', 'olives', NULL),
(18, 'ingredient', 'olive oil', NULL),
(19, 'ingredient', 'soda', NULL),
(20, 'ingredient', 'water', NULL),
(21, 'cook time', '1', NULL),
(22, 'cook time', '2', NULL),
(23, 'cook time', '5', NULL),
(24, 'cook time', '10', NULL),
(25, 'cook time', '15', NULL),
(26, 'cook time', '30', NULL),
(27, 'cook time', '45', NULL),
(28, 'cook time', '60', NULL),
(29, 'cook time', '0', NULL);

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
  `text` varchar(45) NOT NULL,
  `image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `positive` tinyint(1) NOT NULL,
  `image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE `steps` (
  `step_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `execution_order` int(11) DEFAULT NULL,
  `option_id` int(11) DEFAULT NULL,
  `prompt_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`step_id`, `dish_id`, `execution_order`, `option_id`, `prompt_id`) VALUES
(1, 1, 1, 1, NULL),
(2, 1, 1, 2, NULL),
(3, 1, 1, 3, NULL),
(4, 1, 2, 18, NULL),
(5, 1, 2, 5, NULL),
(6, 1, 2, 6, NULL),
(7, 1, 3, 16, NULL),
(8, 1, 3, 15, NULL),
(9, 1, 3, 19, NULL),
(10, 1, 4, 21, NULL),
(11, 1, 4, 23, NULL),
(12, 1, 4, 24, NULL),
(13, 1, 4, 25, NULL),
(14, 2, 1, 3, NULL),
(15, 2, 1, 20, NULL),
(16, 2, 1, 14, NULL),
(17, 2, 2, 5, NULL),
(18, 2, 2, 7, NULL),
(19, 2, 2, 13, NULL),
(20, 2, 3, 28, NULL),
(21, 2, 3, 29, NULL),
(22, 2, 3, 27, NULL),
(23, 2, 3, 26, NULL),
(24, 3, 1, 3, NULL),
(25, 3, 1, 1, NULL),
(26, 3, 1, 15, NULL),
(27, 3, 2, 7, NULL),
(28, 3, 2, 9, NULL),
(29, 3, 2, 19, NULL),
(30, 3, 3, 21, NULL),
(31, 3, 3, 22, NULL),
(32, 3, 3, 23, NULL),
(33, 3, 3, 18, NULL),
(34, 4, 1, 11, NULL),
(35, 4, 1, 1, NULL),
(36, 4, 1, 10, NULL),
(37, 4, 2, 16, NULL),
(38, 4, 2, 6, NULL),
(39, 4, 2, 5, NULL),
(40, 4, 3, 15, NULL),
(41, 4, 3, 12, NULL),
(42, 4, 3, 13, NULL),
(43, 4, 4, 9, NULL),
(44, 4, 4, 14, NULL),
(45, 4, 4, 6, NULL),
(46, 4, 5, 29, NULL),
(47, 4, 5, 25, NULL),
(48, 4, 5, 27, NULL);

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

-- --------------------------------------------------------

--
-- Table structure for table `users_roles`
--

CREATE TABLE `users_roles` (
  `user_id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `xp_reward`
--

CREATE TABLE `xp_reward` (
  `dish_id` int(11) NOT NULL,
  `penalties` int(11) NOT NULL,
  `reward` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `xp_reward`
--

INSERT INTO `xp_reward` (`dish_id`, `penalties`, `reward`) VALUES
(1, 0, 1000),
(1, 1, 800),
(1, 2, 600),
(1, 3, 400);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_history`
--
ALTER TABLE `account_history`
  ADD PRIMARY KEY (`user_id`);

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
  ADD PRIMARY KEY (`dish_id`),
  ADD UNIQUE KEY `dish_id_UNIQUE` (`dish_id`);

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
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `prompts`
--
ALTER TABLE `prompts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`step_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `dish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `step_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
