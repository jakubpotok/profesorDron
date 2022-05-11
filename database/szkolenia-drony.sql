-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2022 at 12:38 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `szkolenia-drony`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `author` varchar(100) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `author_id`, `author`, `title`, `description`, `price`, `image`) VALUES
(11, 10, 'Jakub Potok', 'Nocny kurs szkoleniowy', 'Kurs pozwalający nauczyć się, jak bezpiecznie latać dronem w nocy.', 60, '62688d2ab92b1.jpg'),
(12, 10, 'Jakub Potok', 'Przewodnik Pilota Drona od początkującego do profesjonalisty', 'Ten kurs daje Ci przewagę nad innymi pilotami dronów. Dowiedz się, co jest potrzebne, aby latać - rekreacyjnie lub komercyjnie.\r\n\r\n- Poznaj różne zasady obowiązujące pilotów komercyjnych i hobbystów.\r\n\r\n- Zapoznaj się z różnymi możliwościami zarabiania za pomocą dronów', 300, '62689e295352d.jpg'),
(13, 10, 'Jakub Potok', 'Praktyczne szkolenie w locie dronem', 'Praktyczne szkolenie lotnicze, które uczy operatorów dronów, jak latać bezpiecznie i odpowiedzialnie.\r\n\r\nZdobądź pewność siebie w lataniu i naucz się umiejętności potrzebnych do zaliczenia oceny w locie.', 240, '62689e9d36fd4.jpg'),
(14, 23, 'nauczyciel', 'Krok po kroku, jak zbudować i latać wyścigowym quadcopterem', 'Naucz się budować i latać wyścigowymi dronami od podstaw, korzystając z dostępnych cenowo komponentów i sprzętu.', 199, '62689f80bceee.jpg'),
(31, 23, 'nauczyciel', 'Latanie Dronem 101', 'Jest to kurs dla początkujących entuzjastów dronów, który pozwoli Ci bezpiecznie wystartować z ziemi. \r\n\r\nWszystko, co musisz wiedzieć, aby rozpocząć przygodę z dronami.\r\n\r\nDowiedz się, gdzie możesz legalnie latać swoim dronem. Odbądź swój pierwszy lot.\r\n\r\nDowiedz się, jak robić wspaniałe zdjęcia i filmy z drona.\r\nPoznaj podstawowe manewry w locie i dowiedz się, na jaką pogodę należy uważać.', 99, '626931e461489.jpg'),
(32, 10, 'Jakub Potok', 'Latanie rekreacyjne - Pełny kurs', 'Zrozumienie przepisów, których należy przestrzegać, aby zachować zgodność z prawem i bezpieczeństwo\r\n\r\nPlan działania, aby bezpiecznie przeprowadzić swój pierwszy lot dronem', 79, '62693c143ed8b.jpeg'),
(33, 23, 'nauczyciel', 'Wszystko o DJI Air 2S', 'Omiń nudną instrukcję i zobacz WSZYSTKO, co możesz zrobić z DJI Air 2S.\r\n\r\nPrzejdź od początkującego do profesjonalisty - dowiedz się, jak w pełni wykorzystać możliwości tego drona.\r\n\r\nDowiedz się, które tryby i ustawienia sprawią, że Twoja wideografia z drona będzie błyszczeć.', 50, '62693cbb1cc38.jpeg'),
(34, 23, 'nauczyciel', 'Wszystko o DJI Mavic Mini', 'Omiń nudną instrukcję i zobacz WSZYSTKO, co możesz zrobić z DJI Mavic Mini.\r\n\r\nPrzejdź od początkującego do profesjonalisty - dowiedz się, jak w pełni wykorzystać możliwości tego drona.\r\n\r\nUnikaj kosztownych błędów i lataj z pewnością siebie.', 60, '62693cebce3c9.jpeg'),
(35, 23, 'nauczyciel', 'Wszystko o Mavic Air 3', 'Omiń nudną instrukcję i zobacz WSZYSTKO, co możesz zrobić z DJI Mavic Air 2.\r\n\r\nPrzejdź od początkującego do profesjonalisty - dowiedz się, jak w pełni wykorzystać możliwości tego drona.\r\n\r\nDowiedz się, które tryby i ustawienia sprawią, że Twoja wideografia z drona będzie błyszczeć.', 100, '62693d1e9c894.jpg'),
(51, 10, 'Jakub Potok', 'Lataj Pewnie i Bezpiecznie Dronem od DJI', 'Jeżeli wydałeś spore pieniądze na swojego nowego Towarzysza przygody i obawiasz się, że zniszczysz maszynę, zrobisz komuś krzywdę lub doprowadzisz do wypadku, ten kurs jest właśnie dla Ciebie. \r\n\r\nAutor w sposób przejrzysty wprowadza Cię w tajniki latania, krok po kroku.  Ten kurs zawiera szerokie spektrum wiedzy i doświadczeń dotyczące latania dronami DJI.', 42, '6279b6714c31e.jpg'),
(52, 10, 'Jakub Potok', 'Manewry drona dla początkujących (wyostrz swoje umiejętności)', 'Jeśli dopiero zaczynasz latać dronami lub chcesz się w tym doskonalić, te podstawowe manewry dronem są idealne do doskonalenia umiejętności i pokażą Ci, jak latać dronem. Omówimy podstawowe ruchy, wznoszenie i opadanie, a następnie przejdziemy do podstawowego śledzenia i orbitowania. Omówimy także kilka podstawowych ujęć filmowych z drona wraz z podstawowymi manewrami. \r\n\r\nTe podstawowe manewry dronem są idealne dla początkujących i sprawią, że staniesz się znacznie lepszym pilotem.', 199, '6279b82399327.jpg'),
(53, 10, 'Jakub Potok', 'Fotografia dronem | Wykonuj profesjonalne zdjęcia dowolnym dronem', 'Chcesz robić zapierające dech w piersiach zdjęcia z drona jak zawodowiec?\r\n\r\nTen kurs został zaprojektowany tak, abyś w jak najkrótszym czasie przeszedł drogę od początkującego do profesjonalnego fotografa dronów. Otrzymasz wszystkie najlepsze wskazówki dotyczące fotografowania dronem, których potrzebujesz, aby natychmiast zacząć fotografować i masz dożywotni dostęp do kursu wraz ze wszystkimi przyszłymi aktualizacjami. Kurs jest prowadzony na dronie DJI Mavic Pro, ale można go kontynuować na dowolnym dronie dostępnym na rynku.', 299, '6279b8ac28ede.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `course_events`
--

CREATE TABLE `course_events` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `date` varchar(100) NOT NULL,
  `youtubeLink` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_events`
--

INSERT INTO `course_events` (`id`, `course_id`, `title`, `description`, `date`, `youtubeLink`) VALUES
(10, 14, 'Budujemy Quadcopter! - 2 Zajęcia', 'Podczas tego spotkania będziemy budować twój pierwszy quadcopter', '2022-05-28T22:00:00.000Z', 'https://www.youtube.com/watch?v=PaQOP2eFAkw'),
(15, 14, 'Latanie Quadcopterem - Podstawy', 'Podstawy o lataniu quad-copterem\r\nPrzed zajęciami oglądnij filmik', '2022-05-27T22:00:00.000Z', 'https://www.youtube.com/watch?v=UHczkDV1qEE'),
(16, 14, 'Modyfikujemy Quad 1', 'Modyfikacje Quadcoptera zbudowanego na poprzednich zajęciach', '2022-05-29T22:00:00.000Z', ''),
(17, 14, 'Quadcopter - Teoria', 'Troche wiedzy zawsze się przyda', '2022-05-30T22:00:00.000Z', ''),
(18, 14, 'Modyfikujemy Quad 2', 'Zajęcia odbędą się od razu po skończeniu pierwszych', '2022-05-29T22:00:00.000Z', 'https://www.youtube.com/watch?v=oigQjPJcYps'),
(30, 35, 'DJI Mavic 3 - 1 zajęcia', 'Przed zajęciami oglądnij materiały\r\nZajęcia o godzinie 18', '2022-06-05T22:00:00.000Z', 'https://www.youtube.com/watch?v=6dnqGrSKudM'),
(31, 35, 'DJI Mavic 3 - 2 zajęcia', 'Na 2 zajęciach polatamy wysoko', '2022-06-06T22:00:00.000Z', 'https://www.youtube.com/watch?v=TKtxhWACQm0'),
(32, 35, 'DJI Mavic 3 - 3 zajęcia', 'Godzina 18', '2022-06-07T22:00:00.000Z', ''),
(33, 35, 'DJI Mavic 3 - 4 zajęcia', 'DJI Mavic 3 to najnowsza odsłona ich najpopularniejszej serii składanych dronów,  która jest skierowana do użytkowników bardziej profesjonalnych', '2022-06-08T22:00:00.000Z', 'https://www.youtube.com/watch?v=PSycIf6yf4A'),
(38, 31, 'Latanie 101 - 1 spotkanie', 'Witaj!\r\nTo początek twojej droni z nauką dronów.\r\nPierwsze spotkanie odbędzie się o godzinie 16:00\r\nNie przegap!', '2022-05-19T22:00:00.000Z', 'https://www.youtube.com/watch?v=gZpPlSWyieo'),
(39, 31, 'Latanie 101 - 2 spotkanie - kontrola drona w powietrzu', 'W tym spotkaniu będziemy ćwiczyć opanowywanie drona w powietrzu.\r\nSpotkanie odbędzie się o godzinie 16:00\r\nPrzed spotkaniem oglądnij filmik', '2022-05-26T22:00:00.000Z', 'https://www.youtube.com/watch?v=d9NCR3-slWo'),
(40, 31, 'Latanie 101 - 3 spotkanie - kontrola prędkości', 'Tak jak zawsze spotkanie o godzinie 16:00\r\nPrzed spotkaniem wykonaj quiz: https://www.casa.gov.au/knowyourdrone/quiz', '2022-06-02T22:00:00.000Z', 'https://www.youtube.com/watch?v=MLTs0RiGvGY'),
(41, 31, 'Latanie 101 - 4 spotkanie - kontynuacja kontrolowania prędkości', 'Czwarte spotkanie - kontynuacja kontrolowania prędkości\r\nSpotkanie o godzinie 16:00', '2022-06-09T22:00:00.000Z', ''),
(43, 32, 'Pierwsze spotkanie', 'Witaj!\r\nTo początek twojej droni z nauką dronów.\r\nPierwsze spotkanie odbędzie się o godzinie 16:00\r\nNie przegap!', '2022-05-19T22:00:00.000Z', 'https://www.youtube.com/watch?v=rsP86OkhnPI'),
(44, 32, 'Drugie zajęcia - materiały', 'Materiały do 2 zajęć', '2022-05-20T22:00:00.000Z', 'https://www.youtube.com/watch?v=6AJoXSq0B3w'),
(60, 53, 'Wprowadzenie do fotografii dronem', 'Podczas tego spotkania nauczysz się podstaw dotografii dronem.\r\n\r\nPrzed spotkaniem oglądnij załączony film.', '2022-05-22T22:00:00.000Z', 'https://www.youtube.com/watch?v=Thkbr3xAkCQ'),
(61, 53, 'Ustawianie właściwej ekspozycji', 'Spotkanie odbędzie się o godzinie 16:00\r\n\r\nPrzed spotkaniem oglądnij załącznony filmik i zapoznaj się z materiałami na stronie: https://www.droneexposure.co.uk/#drone-exposure', '2022-05-24T22:00:00.000Z', 'https://www.youtube.com/watch?v=eiiTwW5neSc'),
(62, 53, 'Kompozycja ujęć w fotografii dronowej', 'Spotkanie - godz. 16:00\r\n\r\nFotografia dronem stanowi alternatywną, interesującą i często intrygującą perspektywę dla fotografii oraz daje możliwość tworzenia ekscytujących, fascynujących i wciągających obrazów.', '2022-05-26T22:00:00.000Z', 'https://www.youtube.com/watch?v=yD6STzviD-U'),
(63, 53, 'Profesjonalne wskazówki i triki dotyczące dronów', 'Oglądnij film przed spotkaniem\r\nPodczas spotkanie przeniesiemy teorię w praktykę', '2022-05-30T22:00:00.000Z', 'https://www.youtube.com/watch?v=y08Kg9HyavM'),
(64, 53, 'Night Drone Photography', 'Krok po kroku jak robić wspaniałe zdjęcia nocne za pomocą drona. Znane również jako nocna ekspozycja ', '2022-06-01T22:00:00.000Z', 'https://www.youtube.com/watch?v=AgBozX3r7fA'),
(65, 53, 'Wstęp do kursu', 'Podczas tego spotkania omówimy ogólne zasady spotkań i tematy, którymi będziemy się zajmować.\r\n\r\nDo tematów, które umówiomy należą między innymi:\r\n\r\nJak fotografować jak profesjonalista, wykorzystując zasady kompozycji ujęcia.\r\n\r\nJak zoptymalizować ustawienia kamery drona, aby robić najlepsze zdjęcia.\r\n\r\nJak profesjonalnie edytować zdjęcia z drona w programie Lightroom.', '2022-05-10T01:16:59.114Z', ''),
(66, 51, 'FAZA I - WPROWADZENIE', 'Podczas tego spotkania dowiesz się:\r\nDlaczego Warto Latać Dronem\r\nBudowa Drona i Podstawowe Cechy\r\nZakup - Jakie Czynniki Uwzględnić\r\n', '2022-05-12T22:00:00.000Z', 'https://www.youtube.com/watch?v=ia5o97OY4Rw'),
(67, 51, 'FAZA II - Pierwsze Loty', 'Podczas spotkania:\r\nLoty w Pomieszczeniach\r\nKalibracja Kompasu - Kiedy i Jak Przeprowadzać\r\nPrzygotowania Do Lotu\r\nPierwszy Lot - Ćwiczenia', '2022-05-13T22:00:00.000Z', ''),
(68, 51, 'FAZA III - Eksploatacja', 'Manualne Ustawienia Kamery\r\nUstawienia Kamery - Podstawy\r\nUstawienia Płynności Manewrów - Ćwiczenie Praktyczne\r\nInteligentne Tryby Lotu - Przegląd\r\nTryb Position a Tryb Sport\r\nTryb Fixed Wings', '2022-05-19T22:00:00.000Z', ''),
(69, 51, 'FAZA IV - Doskonalenie Umiejętności ', 'Tryb Sport - Ćwiczenia\r\nReturn To Home - Omówienie\r\nPodstawowe techniki filmowania\r\nKampania Lataj z Głową, czyli 10 Zasad Bezpiecznego Latania', '2022-05-20T22:00:00.000Z', 'https://www.youtube.com/watch?v=QwMFK9J462A'),
(70, 52, 'MANEWRY 1 - Wprowadzenie', 'Jak robić zdjęcia jak profesjonalny pilot drona\r\nDowiedz się, jak latać nisko i tworzyć efektowne ujęcia', '2022-05-15T22:00:00.000Z', 'https://www.youtube.com/watch?v=xc5CjQl7vaM'),
(71, 52, 'MANEWRY 2 - Nauka podstaw', 'Chcemy, abyś opanował prostotę korzystania z ręcznego sterowania, a nie z funkcji punktu zainteresowania, abyś zrozumiał, jak płynne mikroruchy drążkiem uczynią Cię lepszym pilotem i nadadzą wszystkim Twoim ruchom płynniejszy, bardziej filmowy wygląd.', '2022-05-17T22:00:00.000Z', 'https://www.youtube.com/watch?v=q1YCijbHkFQ'),
(72, 52, 'MANEWRY 3 - Profesjonalna kontrola pilota', 'Jeśli chcesz, aby Twoi widzowie byli zachwyceni ujęciami z drona, musisz utrzymać ich uwagę od początku do końca, a w tym celu musisz opowiedzieć pewną historię w całym ujęciu.', '2022-05-19T22:00:00.000Z', ''),
(73, 52, 'MANEWRY 4 - Opanowanie ruchów filmowych', 'Jeśli chcesz, aby Twoi widzowie byli zachwyceni ujęciami z drona, musisz utrzymać ich uwagę od początku do końca, a w tym celu musisz opowiedzieć pewną historię w całym ujęciu.', '2022-05-22T22:00:00.000Z', 'https://www.youtube.com/watch?v=3mLxhGnRwRo'),
(74, 52, 'MANEWRY 5 - Najlepsze ustawienia kamery dla uzyskania kinowego wyglądu', 'Przedstawimy kilka naszych najważniejszych wskazówek dotyczących ustawień aparatu, a także omówimy liczbę klatek na sekundę, rozmiary klatek, formaty plików i profile zdjęć.', '2022-05-24T22:00:00.000Z', ''),
(75, 52, 'MANEWRY 6 - Jak fotografować wspaniałe krajobrazy', 'Przyjrzymy się trzem typom charakterystycznych dla nas ujęć krajobrazów z powietrza. W tej części omówimy, co należy wziąć pod uwagę i zaplanować, aby zapewnić sobie sukces za każdym razem, gdy wykonujesz zdjęcia krajobrazów z powietrza.', '2022-05-26T22:00:00.000Z', ''),
(76, 52, 'MANEWRY 7 - Jak robić wspaniałe ujęcia budynków', 'W tym module chodzi przede wszystkim o znalezienie kreatywnych i ciekawych sposobów na filmowanie architektury za pomocą drona. W części praktycznej tego modułu dotyczącego architektury i budynków pokażemy trzy różne sposoby filmowania jednego budynku.', '2022-05-29T22:00:00.000Z', ''),
(77, 52, 'MANEWRY 8 - Śledzenie poruszających się obiektów', 'W tym module przyjrzymy się najlepszym i najbardziej filmowym sposobom fotografowania ruchomych obiektów, takich jak samochód czy człowiek. Zobaczysz, jak skomplikowane mogą być inteligentne tryby walki i jak z łatwością wykonywać je ręcznie.', '2022-05-31T22:00:00.000Z', ''),
(78, 52, 'MANEWRY 9 - Opanowanie ujęć wschodu słońca', 'W tym module pokażemy, jak zrobić idealne zdjęcie wschodu słońca z powietrza. Dowiesz się, jaki jest dokładny \"właściwy moment\" na zrobienie zdjęcia wschodu słońca i jak się ustawić, aby uzyskać maksymalny efekt.', '2022-06-02T22:00:00.000Z', ''),
(79, 52, 'MANEWRY 10 - Sekrety postprodukcji', 'Prosty poradnik dotyczący podstaw pracy w programie Lightroom na potrzeby fotografii dronowej', '2022-06-05T22:00:00.000Z', 'https://www.youtube.com/watch?v=XzxdwxWJR2Q'),
(80, 52, 'MANEWRY 0 - Zanim zaczniemy', 'Podczas tego spotkania dowiesz się teorii dronów. Od następnych zajęć zaczniemy już ćwiczenia praktyczne.\r\nPrzed zajęciami oglądnij załączony materiał wideo!', '2022-05-09T02:40:40.592Z', 'https://www.youtube.com/watch?v=6KRb3_1309U'),
(88, 11, 'Dron nocą - 1', 'Dowiesz się podstaw zachowywania się nocą z dronem', '2022-05-17T22:00:00.000Z', 'https://www.youtube.com/watch?v=yZM1m9o5Ars'),
(89, 11, 'Dron nocą - 2', 'Lecimy dalej!', '2022-05-19T22:00:00.000Z', ''),
(90, 35, 'DJI Mavic 3 - 0 zajęcia', 'Spotkanie organizacyjne\r\nGodzina: 16:00', '2022-06-04T22:00:00.000Z', 'https://www.youtube.com/watch?v=aOwTUgqUfH8'),
(91, 33, 'DJI AIR 2 - 1 Spotkanie', 'Z 1-calowym sensorem 20MP, potężnymi funkcjami autonomicznymi i kompaktową obudową ważącą mniej niż 600 g, DJI Air 2S jest najlepszym dronem z kamerą typu all-in-one. Zabierz tego lotniczego mocarza ze sobą wszędzie, aby uchwycić i doświadczyć każdego epickiego szczegółu Twojego świata.', '2022-05-19T22:00:00.000Z', 'https://www.youtube.com/watch?v=NJ3Z1hSOoMc'),
(92, 33, 'DJI AIR 2 - 2 Spotkanie', 'Godzina 18', '2022-05-20T22:00:00.000Z', 'https://www.youtube.com/watch?v=hyTJgms-SCc'),
(93, 34, 'DJI Mavic Mini - 1 Spotkanie Organizacyjne', 'Spotkanie Organizacyjne\r\nMax 30 min', '2022-05-10T16:33:25.535Z', 'https://www.youtube.com/watch?v=8745Ozq44sI'),
(94, 34, 'DJI Mavic Mini - 2 Spotkanie Instrukcja', 'Jeszcze nie latamy.\r\nOmówimy funkcje tego drona', '2022-05-10T22:00:00.000Z', 'https://www.youtube.com/watch?v=aOwTUgqUfH8'),
(95, 34, 'DJI Mavic Mini - 3 Spotkanie Latamy!!!', 'Na tym spotkaniu już polacamy', '2022-05-11T22:00:00.000Z', 'https://www.youtube.com/watch?v=hsF8MS2GOa8'),
(96, 34, 'DJI Mavic Mini - 4 Spotkanie Porady i Triki', 'Jest co ćwiczyć', '2022-05-12T22:00:00.000Z', 'https://www.youtube.com/watch?v=K1sykoJYJE8');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_applications`
--

CREATE TABLE `teacher_applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher_applications`
--

INSERT INTO `teacher_applications` (`id`, `user_id`, `username`, `status`) VALUES
(13, 2, 'Jan Nowak', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` tinyint(4) NOT NULL,
  `money` int(11) NOT NULL DEFAULT 100
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `money`) VALUES
(2, 'Jan Nowak', 'test@gmail.com', '$2y$10$1rvJojWdQ06tpPAQIrBgKe8g/GOGIYo6rNEZs0ep0/FjC/DlHZdDi', 0, 159),
(10, 'Jakub Potok', 'jakubpotok@gmail.com', '$2y$10$iy/1yV7vgAXLLoR.R4NGmuafouw2PfkUb189oTAiDFzrAbM4y6LfK', 1, 3162),
(11, 'admin', 'admin@gmail.com', '$2y$10$M9ukqJMkCYwn3LpwIObSt.fQfQJf0HUjHeK6xdMu75/cq6uId4j.i', 2, 9999),
(23, 'nauczyciel', 'nauczyciel@gmail.com', '$2y$10$hEYt3YUvikNLBlfOyKSRbuhPND9WA9COnDCtNihsJjVEY4OIwwste', 1, 3224);

-- --------------------------------------------------------

--
-- Table structure for table `user_courses`
--

CREATE TABLE `user_courses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `expire_date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_courses`
--

INSERT INTO `user_courses` (`id`, `user_id`, `course_id`, `expire_date`) VALUES
(25, 11, 14, '2022-06-05T02:33:32.834Z'),
(36, 28, 31, '2022-06-05T06:21:03.398Z'),
(41, 29, 31, '2022-06-05T08:05:37.493Z'),
(59, 23, 32, '2022-06-07T21:34:19.084Z'),
(60, 11, 31, '2022-06-10T00:19:22.035Z'),
(61, 10, 35, '2022-06-10T02:37:48.609Z'),
(62, 31, 52, '2022-06-10T13:30:44.447Z'),
(63, 31, 53, '2022-06-10T13:31:51.088Z'),
(64, 23, 55, '2022-06-10T13:37:02.950Z'),
(65, 2, 51, '2022-06-10T16:42:42.360Z'),
(74, 34, 52, '2022-05-09T10:04:25.318Z'),
(75, 34, 53, '2022-05-09T10:05:57.834Z');

-- --------------------------------------------------------

--
-- Table structure for table `user_events`
--

CREATE TABLE `user_events` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_events`
--

INSERT INTO `user_events` (`id`, `user_id`, `event_id`, `course_id`) VALUES
(49, 23, 17, 14),
(50, 23, 17, 14),
(51, 23, 25, 14),
(52, 23, 39, 31),
(59, 23, 25, 14),
(62, 23, 15, 14),
(65, 23, 32, 35),
(71, 23, 58, 35),
(72, 10, 80, 52),
(74, 23, 86, 55),
(75, 2, 66, 51),
(76, 2, 67, 51),
(77, 2, 69, 51),
(78, 2, 60, 53),
(79, 2, 62, 53),
(80, 2, 64, 53);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_events`
--
ALTER TABLE `course_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher_applications`
--
ALTER TABLE `teacher_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `user_courses`
--
ALTER TABLE `user_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_events`
--
ALTER TABLE `user_events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `course_events`
--
ALTER TABLE `course_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `teacher_applications`
--
ALTER TABLE `teacher_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user_courses`
--
ALTER TABLE `user_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `user_events`
--
ALTER TABLE `user_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
