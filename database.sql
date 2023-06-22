-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3308
-- Час створення: Чрв 22 2023 р., 13:22
-- Версія сервера: 10.3.22-MariaDB
-- Версія PHP: 7.3.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `playaround`
--

-- --------------------------------------------------------

--
-- Структура таблиці `analytics`
--

CREATE TABLE `analytics` (
  `id` int(11) NOT NULL,
  `store_id` varchar(36) CHARACTER SET utf8 NOT NULL,
  `source_id` int(2) NOT NULL,
  `action_id` int(2) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `analytics`
--

INSERT INTO `analytics` (`id`, `store_id`, `source_id`, `action_id`, `count`) VALUES
(25, '493e3dd3-e29c-4302-8b31-33de6e3db74e', 1, 1, 6),
(26, '493e3dd3-e29c-4302-8b31-33de6e3db74e', 1, 2, 0),
(27, '493e3dd3-e29c-4302-8b31-33de6e3db74e', 2, 1, 17),
(28, '493e3dd3-e29c-4302-8b31-33de6e3db74e', 2, 2, 3);

-- --------------------------------------------------------

--
-- Структура таблиці `analytics_action`
--

CREATE TABLE `analytics_action` (
  `id` int(11) NOT NULL,
  `action` varchar(10) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `analytics_action`
--

INSERT INTO `analytics_action` (`id`, `action`) VALUES
(1, 'view'),
(2, 'click');

-- --------------------------------------------------------

--
-- Структура таблиці `analytics_source`
--

CREATE TABLE `analytics_source` (
  `id` int(11) NOT NULL,
  `source` varchar(10) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `analytics_source`
--

INSERT INTO `analytics_source` (`id`, `source`) VALUES
(1, 'col'),
(2, 'rec');

-- --------------------------------------------------------

--
-- Структура таблиці `stores`
--

CREATE TABLE `stores` (
  `id` varchar(36) CHARACTER SET utf8 NOT NULL,
  `name` varchar(40) CHARACTER SET utf8 NOT NULL,
  `access_token` varchar(255) CHARACTER SET utf8 NOT NULL,
  `access_token_hash` varchar(64) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `stores`
--

INSERT INTO `stores` (`id`, `name`, `access_token`, `access_token_hash`) VALUES
('493e3dd3-e29c-4302-8b31-33de6e3db74e', 'e2bdb2-2.myshopify.com', '6c46d2758f2ecf8863d59907f46eda871627b9a3ccbec3dc2a7b273b1d187ca0d9b57d4c6e408b4039f0acd23d8194c1ea7b1290f73817d90b76bd61ffe68aba', '5239bc45785021529a2a6a66fa3836550f0229583043f910713fd5d365e40660');

-- --------------------------------------------------------

--
-- Структура таблиці `users`
--

CREATE TABLE `users` (
  `id` varchar(36) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email_hash` varchar(64) CHARACTER SET utf8 NOT NULL,
  `password` varchar(60) CHARACTER SET utf8 NOT NULL,
  `secret` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `users`
--

INSERT INTO `users` (`id`, `email`, `email_hash`, `password`, `secret`) VALUES
('478cde12-34c8-412f-b235-4dda68e0ac36', '1cd5ebaa6847fd3c4b4b2ca3a6a1989a09f54ca503ca91914b4b0816087ceec9', '336ccdb186fbb8bfcfc87bf13b92e5ee3afd441da6b16c826eeeba070e928682', '$2a$12$33Tha/UrDZGTy5v/2WCif.QX7gUVb9/Vd/W.VKeal/359ODHdRMmC', '9bfa07cbe1ec3ca636daeaad34380a75e56830746298bc3b582129ff87ced27e5fb78176778701575f2276cd5909a9ec58477ce75e74cfd7aa090c0034611c01'),
('f6fec48b-93cb-47dc-850a-f62780069bf2', '12b60a1647a64ec8eadd093b6d47ddcbb8a91da6d6600a6d8798c42b8e595a36b0652417c6de8838710ecaadd3ac7c52', '52d3c0a6d04b535d9c75924552a3d0853f06ff706acbe191343fca0737e17854', '$2a$12$dr0qm89E7LdsH0yK7zB39e6dUE6ZHQESewNh2JjBa0UqSTB5CHXcW', '3f4f4032a84d025a4adcafaf1072822a018fd8d44d46e5348fba34314344b5390879401299e4e60c1b5c99ce846471b8845cfed85884156e11c0c65533026658');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `source_id` (`source_id`),
  ADD KEY `action_id` (`action_id`);

--
-- Індекси таблиці `analytics_action`
--
ALTER TABLE `analytics_action`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `analytics_source`
--
ALTER TABLE `analytics_source`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `analytics`
--
ALTER TABLE `analytics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблиці `analytics_action`
--
ALTER TABLE `analytics_action`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблиці `analytics_source`
--
ALTER TABLE `analytics_source`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `analytics`
--
ALTER TABLE `analytics`
  ADD CONSTRAINT `analytics_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`),
  ADD CONSTRAINT `analytics_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `analytics_source` (`id`),
  ADD CONSTRAINT `analytics_ibfk_3` FOREIGN KEY (`action_id`) REFERENCES `analytics_action` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
