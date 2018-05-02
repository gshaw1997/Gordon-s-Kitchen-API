CREATE SCHEMA `gordons_kitchen` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `gordons_kitchen`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `total_xp` INT NULL,
  PRIMARY KEY (`id`)), UNIQUE INDEX `id_UNIQUE` (`id` ASC);

CREATE TABLE `gordons_kitchen`.`account_history` (
  `user_id` INT NOT NULL,
  `created_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_signed_on` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`));

CREATE TABLE `gordons_kitchen`.`friends` (
  `player_id` INT NOT NULL,
  `user_id` INT NOT NULL);

CREATE TABLE `gordons_kitchen`.`player_level` (
  `xp` INT NOT NULL,
  `level_num` INT NOT NULL,
  `level_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL);

CREATE TABLE `gordons_kitchen`.`dishes` (
  `dish_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `difficulty` VARCHAR(45) NOT NULL,
  `unlocked_at` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`dish_id`),
  UNIQUE INDEX `dish_id_UNIQUE` (`dish_id` ASC));

CREATE TABLE `gordons_kitchen`.`xp_reward` (
  `dish_id` INT NOT NULL,
  `penalties` INT NOT NULL,
  `reward` INT NOT NULL,
  PRIMARY KEY (`dish_id`));

CREATE TABLE `gordons_kitchen`.`steps` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `execution_order` INT NULL,
  `option_id` INT NOT NULL,
  `prompt_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `gordons_kitchen`.`options` (
  `id` INT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `image_id` INT NOT NULL,
  `reaction_id` INT,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `gordons_kitchen`.`prompts` (
  `id` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `image_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `gordons_kitchen`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `gordons_kitchen`.`reaction` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `gordons_kitchen`.`completed` (
  `user_id` INT NOT NULL,
  `dish_id` INT NOT NULL,
  `score_id` INT NOT NULL);

CREATE TABLE `gordons_kitchen`.`scores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `score` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

--   USER ROLES ?
