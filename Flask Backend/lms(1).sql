-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2024 at 09:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `BookID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Authors` varchar(255) NOT NULL,
  `AverageRating` decimal(3,2) DEFAULT NULL,
  `Isbn` varchar(13) DEFAULT NULL,
  `Isbn13` varchar(17) DEFAULT NULL,
  `LanguageCode` varchar(10) DEFAULT NULL,
  `NumPages` int(11) DEFAULT NULL,
  `RatingsCount` int(11) DEFAULT NULL,
  `TextReviewsCount` int(11) DEFAULT NULL,
  `PublicationDate` date DEFAULT NULL,
  `Publisher` varchar(255) DEFAULT NULL,
  `PublicationYear` year(4) DEFAULT NULL,
  `Qty` int(11) DEFAULT 0,
  `Status` varchar(50) DEFAULT NULL,
  `IsAvailable` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`BookID`, `Title`, `Authors`, `AverageRating`, `Isbn`, `Isbn13`, `LanguageCode`, `NumPages`, `RatingsCount`, `TextReviewsCount`, `PublicationDate`, `Publisher`, `PublicationYear`, `Qty`, `Status`, `IsAvailable`) VALUES
(676, 'Sailing Alone Around the Room: New and Selected Poems', 'Billy Collins', 4.23, '0375755195', '9780375755194', 'eng', 192, 12180, 630, '2002-09-17', 'Random House Trade Paperbacks', '2002', 0, 'unavailable', 0),
(890, 'Of Mice and Men', 'John Steinbeck', 3.87, '0142000671', '9780142000670', 'eng', 103, 1755253, 25554, '2002-01-08', 'Penguin Books', '2002', 0, 'unavailable', 0),
(1226, 'Life of Pi', 'Yann Martel', 3.91, '0156030209', '9780156030205', 'en-US', 401, 4318, 668, '0000-00-00', 'Mariner Books / Harvest Books', '2004', 0, 'unavailable', 0),
(1725, 'The Art of Love and Other Poems', 'Ovid/J.H. Mozley/G.P. Goold', 4.02, '0674992555', '9780674992559', 'eng', 400, 98, 5, '1929-01-01', 'Harvard University Press', '1929', 0, 'unavailable', 0),
(2123, 'The 36-Hour Day: A Family Guide to Caring for Persons with Alzheimer Disease  Related Dementing Illnesses  and Memory Loss in Later Life', 'Nancy L. Mace/Peter V. Rabins', 4.24, '0446618764', '9780446618762', 'eng', 624, 69, 6, '2006-11-01', 'Grand Central Life & Style', '2006', 0, 'unavailable', 0),
(2166, 'The Old Man and the Sea', 'Ernest Hemingway/Donald Sutherland', 3.77, '0743564367', '9780743564366', 'eng', 3, 393, 77, '2006-05-01', 'Simon  Schuster Audio', '2006', 1, 'Available', 1),
(2336, 'Tandia', 'Bryce Courtenay', 4.05, '0140272925', '9780140272925', 'eng', 905, 8461, 369, '1998-08-31', 'Penguin Books Australia Ltd.', '1998', 0, 'unavailable', 0),
(2543, 'Las intermitencias de la muerte', 'José Saramago/Pilar del Río', 4.00, '9587043642', '9789587043648', 'spa', 274, 2862, 306, '2005-12-01', 'Alfaguara', '2005', 1, 'Available', 1),
(2912, 'Escape from Fire Mountain (World of Adventure  #3)', 'Gary Paulsen/Steve Chorney', 3.67, '0440410258', '9780440410256', 'eng', 80, 114, 17, '1995-01-01', 'Yearling', '1995', 1, 'Available', 1),
(3690, 'The Power and the Glory', 'Graham Greene/John Updike', 4.00, '0142437301', '9780142437308', 'eng', 222, 25490, 1585, '2003-02-25', 'Penguin Books', '2003', 1, 'available', 1),
(5552, 'QED: The Strange Theory of Light and Matter', 'Richard P. Feynman', 4.24, '0691024170', '9780691024172', 'eng', 158, 13463, 320, '1988-10-21', 'Princeton University Press', '1988', 0, 'unavailable', 0),
(8197, 'Writings to Young Women from Laura Ingalls Wilder: On Wisdom and Virtues (Writings to Young Women on Laura Ingalls Wilder #1)', 'Laura Ingalls Wilder/Stephen W. Hines', 3.99, '1400307848', '9781400307845', 'eng', 113, 108, 11, '2006-05-10', 'Tommy Nelson', '2006', 1, 'Available', 1),
(8205, 'Writings to Young Women on Laura Ingalls Wilder: As Told By Her Family  Friends  and Neighbors (Writings to Young Women on Laura Ingalls Wilder #3)', 'Laura Ingalls Wilder/Stephen W. Hines', 3.98, '1400307864', '9781400307869', 'eng', 128, 41, 2, '2006-05-08', 'Thomas Nelson', '2006', 1, 'Available', 1),
(8598, 'Eats  Shoots & Leaves: Why  Commas Really Do Make a Difference!', 'Lynne Truss/Bonnie Timmons', 4.15, '0399244913', '9780399244919', 'eng', 32, 1371, 205, '2006-07-25', 'G.P. Putnam\'s Sons Books for Young Readers', '2006', 1, 'Available', 1),
(9742, 'The Audacity of Hope: Thoughts on Reclaiming the American Dream', 'Barack Obama', 3.75, '0307237699', '9780307237699', 'eng', 375, 127324, 4496, '2006-10-17', 'Crown', '2006', 1, 'Available', 1),
(10767, 'Merde!: The Real French You Were Never Taught at School', 'Geneviève/Michael    Heath', 3.96, '0684854279', '9780684854274', 'eng', 112, 155, 13, '1998-12-09', 'Gallery Books', '1998', 1, 'Available', 1),
(10970, 'Outlander', 'Matt Keefe', 3.85, '184416411X', '9781844164110', 'eng', 254, 54, 5, '2006-12-26', 'Games Workshop(uk)', '2006', 2, 'Available', 1),
(14258, 'English Passengers', 'Matthew Kneale', 4.06, '0140285210', '9780140285215', 'en-GB', 462, 537, 65, '2001-04-26', 'Penguin', '2001', 1, 'Available', 1),
(15004, 'First Love: A Gothic Tale', 'Joyce Carol Oates/Barry Moser/Erhan Sunar', 3.19, '088001508X', '9780880015080', 'eng', 86, 579, 83, '1997-08-21', 'Ecco', '1997', 1, 'unavailable', 1),
(15930, 'Wokini: A Lakota Journey to Happiness and Self-Understanding', 'Billy Mills/Nicholas Sparks', 3.57, '1561706604', '9781561706600', 'eng', 175, 253, 21, '2003-06-01', 'Hay House', '2003', 1, 'Available', 1),
(17828, 'The Master and Margarita', 'Mikhail Bulgakov/Michael Karpelson', 4.30, '1411683056', '9781411683051', 'eng', 332, 493, 47, '2006-04-01', 'Lulu Press', '2006', 1, 'Available', 1),
(17946, 'Seven Nights', 'Jorge Luis Borges/Eliot Weinberger', 4.33, '0811209059', '9780811209052', 'eng', 121, 1037, 60, '1985-05-29', 'New Directions Publishing Corporation', '1985', 1, 'Available', 1),
(18745, 'Female Chauvinist Pigs: Women and the Rise of Raunch Culture', 'Ariel Levy', 3.68, '0743284283', '9780743284288', 'en-US', 236, 8511, 765, '2006-10-03', 'Free Press', '2006', 1, 'Available', 1),
(25257, 'Mein Urgroßvater  die Helden und ich', 'James Krüss', 4.30, '3551552711', '9783551552716', 'ger', 250, 16, 1, '2002-12-01', 'Carlsen', '2002', 1, 'Available', 1),
(26827, 'Park Profiles: Grand Canyon Country (Park Profiles)', 'National Geographic Society', 4.10, '0792270320', '9780792270324', 'eng', 200, 10, 1, '2010-01-19', 'National Geographic', '2010', 1, 'Available', 1),
(28869, 'Pégate un tiro para sobrevivir: un viaje personal por la América de los mitos', 'Chuck Klosterman', 3.81, '8439720033', '9788439720034', 'spa', 272, 27, 2, '2006-02-28', 'Literatura Random House', '2006', 1, 'Available', 1),
(29680, 'The Coen Brothers: Interviews', 'William Rodney Allen', 3.82, '1578068894', '9781578068890', 'eng', 208, 73, 3, '2006-08-18', 'University Press of Mississippi', '2006', 1, 'Available', 1),
(29879, 'They Dare to Speak Out: People and Institutions Confront Israel\'s Lobby', 'Paul Findley', 4.07, '155652482X', '9781556524820', 'eng', 416, 106, 5, '2003-05-01', 'Lawrence Hill Books', '2003', 1, 'Available', 1),
(31389, 'Life Management for Busy Woman: Growth and Study Guide', 'Elizabeth George', 4.53, '0736910190', '9780736910194', 'en-GB', 166, 14, 1, '2002-07-01', 'Harvest House Publishers', '2002', 1, 'Available', 1),
(32637, 'Imajica: The Reconciliation', 'Clive Barker', 4.42, '0061094153', '9780061094156', 'eng', 544, 2583, 30, '1995-05-10', 'HarperTorch', '1995', 1, 'Available', 1),
(32816, 'The Canterbury Tales: Fifteen Tales and the General Prologue', 'Geoffrey Chaucer/V.A. Kolve/Glending Olson', 3.95, '0393925870', '9780393925876', 'enm', 600, 1149, 41, '2005-08-01', 'W. W. Norton & Company', '2005', 1, 'Available', 1),
(33308, 'There\'s No Toilet Paper . . . on the Road Less Traveled: The Best of Travel Humor and Misadventure', 'Doug Lansky', 3.38, '1932361278', '9781932361278', 'eng', 216, 413, 53, '2005-11-16', 'Travelers\' Tales', '2005', 1, 'Available', 1),
(33513, 'The White Man\'s Burden: Why the West\'s Efforts to Aid the Rest Have Done So Much Ill and So Little Good', 'William Easterly', 3.83, '0143038826', '9780143038825', 'eng', 436, 4473, 232, '2007-03-01', 'Penguin Books', '2007', 1, 'Available', 1),
(39749, 'Memoranda', 'Jeffrey Ford/Jacques Guiod', 3.90, '2290319708', '9782290319703', 'fre', 253, 206, 13, '2002-12-10', 'J\'ai Lu', '2002', 1, 'Available', 1),
(39763, 'The Mystical Poems of Rumi 1: First Selection  Poems 1-200', 'Rumi/A.J. Arberry', 4.28, '0226731510', '9780226731513', 'eng', 208, 114, 8, '1974-03-15', 'University Of Chicago Press', '1974', 1, 'Available', 1),
(43877, 'The Monk Who Sold His Ferrari: A Fable About Fulfilling Your Dreams and Reaching Your Destiny', 'Robin S. Sharma', 3.83, '0062515675', '9780062515674', 'eng', 208, 71133, 3741, '1999-04-21', 'HarperOne', '1999', 1, 'Available', 1),
(44145, 'The Bar on the Seine', 'Georges Simenon/David Watson', 3.69, '0143038311', '9780143038313', 'en-US', 160, 380, 54, '2006-12-26', 'Penguin Books', '2006', 1, 'Available', 1),
(44183, 'Chemistry and Other Stories', 'Ron Rash', 4.19, '0312425082', '9780312425081', 'eng', 230, 601, 79, '2000-09-05', 'St. Martins Press-3PL', '2000', 1, 'available', 1),
(44229, 'The Silver Pigs (Marcus Didius Falco  #1)', 'Lindsey Davis', 3.94, '0345369076', '9780345369079', 'eng', 241, 144, 26, '1991-02-13', 'Fawcett Books', '1991', 1, 'Available', 1),
(44300, 'Smart Discipline: Fast  Lasting Solutions for Your Child\'s Self-Esteem and Your Peace of Mind', 'Larry J. Koenig', 3.99, '0060936665', '9780060936662', 'en-US', 208, 13, 2, '2004-03-02', 'William Morrow Paperbacks', '2004', 1, 'Available', 1);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `outstanding_debt` decimal(10,2) DEFAULT 0.00,
  `date_of_registration` datetime DEFAULT current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `email`, `contact`, `outstanding_debt`, `date_of_registration`, `status`) VALUES
(7, 'Yash chaubey', 'chaubeyyash333@gmail.com', '9892408276', 441.00, '2024-08-23 00:00:00', 'active'),
(8, 'Frappe', 'frappe@frappe.com', '9291212912', 205.00, '2024-08-23 00:00:00', 'active'),
(12, 'STEVEN MEVEN', 'STEVENMEVEN@GMAIL.COM', '98392382283', 510.00, '2024-08-27 00:00:00', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `issue_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `rent_fee` decimal(10,2) DEFAULT NULL,
  `status` enum('issued','returned','lost') NOT NULL DEFAULT 'issued',
  `fine_amount` decimal(10,2) DEFAULT NULL,
  `actual_return_date` date DEFAULT NULL,
  `outstanding_debt` decimal(10,2) DEFAULT 0.00,
  `current_due_amount` decimal(10,2) DEFAULT 0.00,
  `Payment_of_Outstanding_Amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `book_id`, `member_id`, `issue_date`, `return_date`, `rent_fee`, `status`, `fine_amount`, `actual_return_date`, `outstanding_debt`, `current_due_amount`, `Payment_of_Outstanding_Amount`) VALUES
(10, 1226, 7, '2024-08-21', '2024-08-23', 200.00, 'returned', 100.00, '2024-08-21', 0.00, 0.00, NULL),
(11, 10970, 8, '2024-08-26', '2024-08-27', 400.00, 'returned', 0.00, '2024-08-26', 0.00, 100.00, 100.00),
(14, 2166, 7, '2024-08-24', '2024-08-25', 300.00, 'returned', 100.00, '2024-08-24', 10.00, 200.00, 200.00),
(19, 3690, 7, '2024-08-26', '2024-08-26', 300.00, 'issued', NULL, NULL, 0.00, 0.00, NULL),
(20, 2336, 7, '2024-08-26', '0000-00-00', 300.00, 'issued', NULL, NULL, 0.00, 0.00, NULL),
(21, 44183, 12, '2024-08-27', '2024-08-30', 500.00, 'returned', 0.00, '2024-08-27', 0.00, 100.00, 100.00),
(27, 1725, 8, '2024-08-29', '2024-08-29', 100.00, 'issued', NULL, NULL, 0.00, 0.00, NULL),
(30, 2123, 7, '2024-08-28', '2024-08-29', 1.00, 'issued', NULL, NULL, 440.00, 1.00, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`BookID`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `member_id` (`member_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `BookID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44311;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`BookID`),
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
