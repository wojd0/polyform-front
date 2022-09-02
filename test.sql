-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 03 Cze 2022, 02:41
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Baza danych: `polyform`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `answers`
--

CREATE TABLE `answers` (
  `answer_id` varchar(12) COLLATE utf8_bin NOT NULL,
  `form_id` varchar(12) COLLATE utf8_bin NOT NULL,
  `answer_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`answer_data`)),
  `creation_date` date NOT NULL DEFAULT current_timestamp(),
  `is_experimental` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` varchar(12) COLLATE utf8_bin NOT NULL,
  `flags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`flags`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `forms`
--

CREATE TABLE `forms` (
  `form_id` varchar(12) COLLATE utf8_bin NOT NULL COMMENT 'Form identifier',
  `user_id` varchar(12) COLLATE utf8_bin DEFAULT NULL COMMENT 'User identifier',
  `url` varchar(8) COLLATE utf8_bin NOT NULL COMMENT 'Url ending of the form',
  `creation_date` date NOT NULL DEFAULT current_timestamp() COMMENT 'Creation date of the form',
  `flags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Special flags' CHECK (json_valid(`flags`)),
  `is_experimental` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'True if the form is created for testing purposes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `forms`
--

INSERT INTO `forms` (`form_id`, `user_id`, `url`, `creation_date`, `flags`, `is_experimental`) VALUES
('2QF2NBMCLYS7', 'TomEZjQt1SXn', '0', '2022-06-03', '{}', 1),
('5GMM83EA6EX7', 'bluzDqOIDT8r', '0', '2022-06-03', '{}', 1),
('5HHJJ5JDXYGZ', 'icdOvveO1ySJ', '0', '2022-06-03', '{}', 1),
('7BI6T9GZGF3I', 'vVs1O6lwDrMJ', '0', '2022-06-03', '{}', 1),
('7YSUJTPBBKBV', 'xZNN8NxcnVkS', '0', '2022-06-03', '{}', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `questions`
--

CREATE TABLE `questions` (
  `question_id` varchar(12) COLLATE utf8_bin NOT NULL,
  `form_id` varchar(12) COLLATE utf8_bin NOT NULL,
  `lang_q` varchar(2) COLLATE utf8_bin NOT NULL,
  `lang_a` varchar(2) COLLATE utf8_bin NOT NULL,
  `question_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`question_data`)),
  `is_experimental` tinyint(1) NOT NULL DEFAULT 0,
  `creation_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `questions`
--

INSERT INTO `questions` (`question_id`, `form_id`, `lang_q`, `lang_a`, `question_data`, `is_experimental`, `creation_date`) VALUES
('1vNxlx8QH5gY', '2QF2NBMCLYS7', 'EN', 'PL', '{}', 1, '2022-06-03'),
('7YpQ3liiRXey', '2QF2NBMCLYS7', 'EN', 'PL', '{}', 1, '2022-06-03'),
('ANmWyikYc2fl', '2QF2NBMCLYS7', 'EN', 'PL', '{}', 1, '2022-06-03'),
('BUS6AvnVlUMn', '5GMM83EA6EX7', 'EN', 'PL', '{}', 1, '2022-06-03'),
('C6ZNYDBH5d1R', '5GMM83EA6EX7', 'EN', 'PL', '{}', 1, '2022-06-03'),
('Fsff9yvitpji', '5GMM83EA6EX7', 'EN', 'PL', '{}', 1, '2022-06-03'),
('OzEtNnkqkVMW', '5GMM83EA6EX7', 'EN', 'PL', '{}', 1, '2022-06-03'),
('Qn6fnUVqT2TS', '5HHJJ5JDXYGZ', 'EN', 'PL', '{}', 1, '2022-06-03'),
('TYcI765Adlgi', '5HHJJ5JDXYGZ', 'EN', 'PL', '{}', 1, '2022-06-03'),
('XPj8qGMjzCzK', '7BI6T9GZGF3I', 'EN', 'PL', '{}', 1, '2022-06-03'),
('i9NpeyNpDfPv', '7BI6T9GZGF3I', 'EN', 'PL', '{}', 1, '2022-06-03'),
('n0tXcbgl3ogl', '7YSUJTPBBKBV', 'EN', 'PL', '{}', 1, '2022-06-03');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` varchar(12) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `nickname` varchar(50) COLLATE utf8_bin NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `date_added` date NOT NULL,
  `secret` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`user_id`, `name`, `nickname`, `is_admin`, `date_added`, `secret`) VALUES
('TomEZjQt1SXn', 'Łukasz', 'luki40', 0, '2022-05-14', 'zaq1@WSX'),
('bluzDqOIDT8r', 'uczen', 'tom231', 0, '2022-06-01', 'nieprzygotowany'),
('icdOvveO1ySJ', 'Julia', '150jula', 0, '2022-05-10', 'formularze100'),
('vVs1O6lwDrMJ', 'Jakub', 'kuba15', 1, '2022-04-13', 'superuser'),
('xZNN8NxcnVkS', 'Anna', 'aniaswd20', 0, '2022-05-30', 'trudnehaslo');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `answer_id` (`answer_id`,`form_id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indeksy dla tabeli `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`form_id`),
  ADD KEY `form_id` (`form_id`),
  ADD KEY `form_id_2` (`form_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `question_id` (`question_id`,`form_id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `forms` (`form_id`);

--
-- Ograniczenia dla tabeli `forms`
--
ALTER TABLE `forms`
  ADD CONSTRAINT `forms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ograniczenia dla tabeli `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `forms` (`form_id`);
COMMIT;